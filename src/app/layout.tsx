import type { Metadata } from "next";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContent from "./context/AuthContext";
import ActiveStatus from "./components/ActiveStatus";

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
        <ActiveStatus/>
        {children}
        </AuthContent>
      </body>
    </html>
  );
}
