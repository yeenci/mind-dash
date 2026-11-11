import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mathy - Mental Math practice',
  description: 'Improve your mental calculation speed, accuracy, and confidence through customizable arithmetic exercises.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}