import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/website/Header";
import ConditionalFooter from "@/components/website/ConditionalFooter";
import StoreProvider from "@/redex/StoreProvider"; 
import { getProfile } from "@/utils/apiServer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nestro",
  description: "Luxury Furniture Store",
};

export default async function RootLayout({ children }) {
  const getMe=await getProfile();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col overflow-x-hidden bg-[#F8F5F1]">
        <StoreProvider>
          <Header user={getMe.data}/>
          <main className="flex-1">{children}</main> 
          <ConditionalFooter />
        </StoreProvider>



      </body>
    </html>
  );
}