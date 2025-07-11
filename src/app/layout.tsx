import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Billionaires List",
  description: "세계 억만장자들의 리스트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>세계 억만장자들</h1>
            <p className={styles.subtitle}>The World&apos;s Billionaires</p>
          </div>
        </header>
        <main className="container mx-auto p-6 px-16">{children}</main>
      </body>
    </html>
  );
}
