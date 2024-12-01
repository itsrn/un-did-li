import "./globals.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["hebrew"] });

export const metadata = {
  title: "חשיפת קישורי דידלי",
  description: "חשפו את הקישור שעומד מאחורי קישור הדידלי שיש לכם",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
