import "./globals.css";
import { Secular_One } from "next/font/google";

const secone = Secular_One({ subsets: ["hebrew"], weight: "400" });

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
    <html lang="en">
      <body className={secone.className}>{children}</body>
    </html>
  );
}
