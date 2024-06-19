import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { SupabaseProvider } from "@/providers/SupabaseProvider";
import { UserProvider } from "@/providers/UserProvider";
import { ModalProvider } from "@/providers/ModalProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muverse",
  description: "Listen your favorite music everywhere!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Children:", children); // 添加日志输出

  return (
    <html lang="en">
      <body className={font.className}>
        {/* 在 Next.js 中，children 通常代表当前页面的内容。这是因为 Next.js 使用了文件系统路由，
      每个页面文件会自动成为一个路由，并且这些页面内容会作为 children 传递给布局组件。 */}
        {/* children 的来源
      根目录的 page.tsx 文件：当你访问根目录（例如 /）时，pages/index.tsx 文件的内容会作为 children 传递给 RootLayout，
      然后再传递给 Sidebar。
      其他页面文件：当你访问其他路由（例如 /about），pages/about.tsx 文件的内容会作为 children 传递给 RootLayout，然后再传递给 Sidebar。 */}
        <SupabaseProvider>
          {/* <UserProvider> */}
            <ModalProvider />
            <Sidebar>
              {/* page.tsx will pass in as children */}
              {children}
            </Sidebar>
          {/* </UserProvider> */}
        </SupabaseProvider>
      </body>
    </html>
  );
}
