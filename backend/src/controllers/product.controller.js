import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
import { sendBadRequest, sendConflict, sendCreated, sendNotFound, sendServerError, sendSuccess } from "../utils/response.js"
import RoomModel from "../models/room.model.js";

const get = async (req, res) => {
    try {
        const query = req.query;

        const filter = {};
        const sortBy = {};
        const limit = query.limit ? parseInt(query.limit) : 20;
        const skip = query.skip ? parseInt(query.skip) : 0;
        
        if (query.status) filter.status = query.status === "true";
        if (query.stock) filter.stock = query.stock === "true";
        if (query.bestSeller) filter.bestSeller = query.bestSeller === "true";
        if (query.newArrival) filter.newArrival = query.newArrival === "true";
        if (query.featured) filter.featured = query.featured === "true";

        if (query.rooms) {
            const roomSlugs = query.rooms.split(",");
            const rooms = await RoomModel.find({
                slug: { $in: roomSlugs }
            }).select("_id");
            const roomIds = rooms.map((room) => room._id);
            filter.roomId = { $in: roomIds };
        }

        if (query.category) {
            const categorySlugs = query.category.split(",");
            const categories = await CategoryModel.find({
                slug: { $in: categorySlugs }
            }).select("_id");
            const categoryIds = categories.map((cat) => cat._id);
            filter.categoryId = { $in: categoryIds };
        }
        if (query.min && query.max) {
            const min = parseInt(query.min);
            const max = parseInt(query.max);
            filter.salePrice = {
                $gte: min,
                $lte: max
            };
        }

        if (query.sort) {
            if (query.sort === "asc") {
                sortBy.salePrice = 1;   // Low → High
            } else if (query.sort === "desc") {
                sortBy.salePrice = -1;  // High → Low
            } else if (query.sort === "createAt") {
                sortBy.createAt = -1;   // Newest First
            }
        }

        const products = await ProductModel
            .find(filter)
            .limit(limit)
            .sort(sortBy)
            .skip(skip)
            .populate([
                { path: "roomId", select: "_id name slug" },
                { path: "categoryId", select: "_id name slug" }
            ]);

        const total = await ProductModel.countDocuments(filter);

        return res.status(200).json({
            success: true,
            message: "Data found",
            products,
            meta: {
                limit,
                product: products.length,
                total,
                skip,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.log(error);
        sendServerError(res, "Internal Server Error");
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id)
        return res.status(200).json({
            success: true,
            message: "Data find",
            product
        })

    } catch (error) {
        sendServerError(res, "Internal Server Error")
    }

}



const create = async (req, res) => {
    try {

       const {
    roomId, categoryId, name, slug,
    originalPrice, salePrice, discount,
    shortDescription, description, material,
    width, height, depth, weight, color,
    seoTitle, seoDescription,
    newArrival
} = req.body;
        const thumbnail = req.file?.path || "";
        const product = await ProductModel.findOne({
            $or: [
                { slug },
                { name }
            ]
        });

        if (product) {
            return sendConflict(
                res,
                "Product already exists"
            );
        }
        await ProductModel.create({
    roomId, categoryId, name, slug,
    originalPrice, salePrice, discount,
    shortDescription, description, material,
    dimensions: {
        width: Number(width) || 0,
        height: Number(height) || 0,
        depth: Number(depth) || 0
    },
    weight,
    color,
    seoTitle,
    seoDescription,
    thumbnail,
    newArrival: newArrival === "true"
});
        sendCreated(
            res,
            "Product created successfully"
        );
    }
    catch (error) {
        console.log(error);
        sendServerError(
            res,
            "Internal Server Error"
        );
    }
};
const update = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            roomId,
            categoryId,
            name,
            slug,
            originalPrice,
            salePrice,
            discount,
            shortDescription,
            description,
            material,
            color,
            width,
            height,
            depth,
            weight,
            seoTitle,
            seoDescription
        } = req.body;

        const product = await ProductModel.findById(id);

        if (!product) {
            return sendNotFound(res, "Product not found");
        }

        // Check duplicate name/slug
        const existingProduct = await ProductModel.findOne({
            $or: [
                { name, _id: { $ne: id } },
                { slug, _id: { $ne: id } }
            ]
        });

        if (existingProduct) {
            return sendConflict(res, "Product name or slug already exists");
        }

        const updateData = {
            roomId,
            categoryId,
            name,
            slug,
            originalPrice: Number(originalPrice),
            salePrice: Number(salePrice),
            discount: Number(discount),
            shortDescription,
            description,
            material,
            color,
            dimensions: {
                width: Number(width) || 0,
                height: Number(height) || 0,
                depth: Number(depth) || 0
            },
            weight: Number(weight) || 0,
            seoTitle,
            seoDescription
        };

        // Only update thumbnail when new image is selected
        if (req.file) {
            updateData.thumbnail = req.file.path;
        }

        await ProductModel.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        return sendSuccess(
            res,
            "Product updated successfully"
        );

    } catch (error) {
        console.log("PRODUCT UPDATE ERROR:", error);

        return sendServerError(
            res,
            "Internal Server Error"
        );
    }
};


const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById({ _id: id });
        if (!product) return sendNotFound(res);
        await ProductModel.findByIdAndDelete(id)

        sendSuccess(res, "Delete Sucessfully")

    } catch (error) {
        sendServerError(res, "Internal Server Error")
    }

}

const StatusUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById({ _id: id });
        if (!product) return sendNotFound(res);
        await ProductModel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    status: !product.status
                }
            }

        )

        sendSuccess(res, "Data Update Sucessfully")

    } catch (error) {
        sendServerError(res, "Internal Server Error")
    }

}


const StatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const { flag } = req.body;
        const product = await ProductModel.findById({ _id: id });
        if (!product) return sendNotFound(res);


        await ProductModel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    [flag]: !product[flag]
                }
            }
        )

        sendSuccess(res, "Status Update Sucessfully")

    } catch (error) {
        console.log(error)
        sendServerError(res, "Internal Server Error")
    }

}

// Add multiple images to product

const addImages = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById({ _id: id });
        if (!product) return sendNotFound(res);

        if (!req.files || req.files.length === 0) {
            return sendBadRequest(res, "No images uploaded");
        }

       const images = req.files.map(file => file.path);

        product.images.push(...images);
        await product.save();

        return sendSuccess(res, "Images added successfully")

    } catch (error) {
        console.log(error)
        sendServerError(res, "Internal Server Error")
    }

}

export {
    get,
    create,
    StatusUpdate,
    deleteById,
    getById,
    update,
    StatusById,
    addImages
}