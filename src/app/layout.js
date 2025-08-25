import "./globals.css";
import "./animations.css";
import { AuthProvider } from "@/contexts/AuthContext";
import localFont from "next/font/local";

// Load Fustat font locally for better performance
const fustat = localFont({
  src: [
    {
      path: "../fonts/Fustat-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Fustat-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Fustat-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Fustat-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-fustat",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const metadata = {
  title: "ToolPage - Professional Service Management Platform",
  description:
    "The complete platform for service professionals to grow their business.",
  icons: {
    icon: [
      { url: "/logos/ToolpageFavicon.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/ToolpageFavicon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logos/ToolpageFavicon.png",
    apple: "/logos/ToolpageFavicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fustat.variable}>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logos/ToolpageFavicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logos/ToolpageFavicon.png"
        />
        <link rel="shortcut icon" href="/logos/ToolpageFavicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logos/ToolpageFavicon.png"
        />

        {/* Google Fonts fallback for better reliability */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fustat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
