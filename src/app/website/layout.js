export default function WebsiteLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Base meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Default favicon */}
        <link rel="icon" href="/logos/ToolpageFavicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
