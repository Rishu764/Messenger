import type { Metadata } from "next";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContent from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContent>
        <ToasterContext />
        {children}
        </AuthContent>
      </body>
    </html>
  );
}
