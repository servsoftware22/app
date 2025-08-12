import "./globals.css";
import "./animations.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "ServicePro - Professional Service Management Platform",
  description:
    "The complete platform for service professionals to grow their business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lexend+Deca:wght@300;400;500;600;700&family=Playfair+Display:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
