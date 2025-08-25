import "./globals.css";
import "./animations.css";
import { AuthProvider } from "@/contexts/AuthContext";

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
    <html lang="en">
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

        {/* Font preloading for marketing pages only */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Fustat:wght@400;500;600;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fustat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />

        {/* Fallback font loading */}
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Fustat:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
