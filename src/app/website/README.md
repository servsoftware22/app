# Website Generation System

This folder contains the dynamic website generation system for ToolPage users. It allows users to have their own websites generated based on their Supabase data and selected templates.

## How It Works

### 1. Dynamic Route Structure

- `[domain]/page.js` - Handles individual user websites based on their subdomain
- `components/` - Contains the website generation components
- `utils/` - Contains utility functions for website generation
- Template folders (`Urban/`, `Luxury/`, `Industrial/`) - Contain the actual website templates

### 2. Website Generation Flow

1. User visits their domain (e.g., `fieldsite.toolpage.site`)
2. The dynamic route `[domain]/page.js` captures the domain
3. Website data is fetched from Supabase based on the domain
4. The appropriate template is selected based on user preference or business type
5. The website is rendered using the selected template and user data

### 3. Key Components

#### WebsiteGenerator.js

- Main component that orchestrates website generation
- Handles template selection and rendering
- Manages website data and state

#### TemplateSelector.js

- Allows switching between templates during development
- Only visible in development mode or for admins

#### LoadingSpinner.js

- Shows loading state while website data is being fetched

### 4. Utility Functions

#### websiteGenerator.js

- `fetchWebsiteData(domain)` - Fetches website data from Supabase
- `determineTemplate(websiteData)` - Selects appropriate template
- `generateWebsiteMetadata(websiteData)` - Generates SEO metadata
- `generateWebsiteConfig(websiteData)` - Creates website configuration
- `validateWebsiteData(websiteData)` - Validates required fields
- `getWebsiteUrl(websiteData)` - Gets full domain URL

### 5. Template System

- **Urban Template**: Modern, clean design for urban businesses
- **Luxury Template**: Premium, sophisticated design for luxury services
- **Industrial Template**: Robust, professional design for industrial services

### 6. Website Data Structure

The system expects website data from Supabase with the following structure:

```json
{
  "business_name": "Fieldsite",
  "business_type": "Cleaning Service",
  "template": "Urban",
  "domains": {
    "subdomain": "fieldsite",
    "full_domain": "fieldsite.toolpage.site",
    "seo": { ... },
    "status": { ... },
    "settings": { ... }
  }
}
```

### 7. Usage Examples

#### Accessing a User Website

```
https://fieldsite.toolpage.site
```

#### Development Template Switching

In development mode, a template selector appears in the top-right corner allowing you to switch between templates for testing.

### 8. Customization

- Templates can be customized by modifying the template files in their respective folders
- Website data is passed to templates as props
- CSS and JavaScript can be customized per website using the custom_css and custom_js fields

### 9. Performance Features

- CDN support for static assets
- Image optimization
- Minification support
- Browser caching
- Gzip compression

### 10. SEO Features

- Dynamic meta titles and descriptions
- Open Graph support
- Twitter Card support
- Structured data
- Robots.txt generation
- Sitemap support

## Adding New Templates

1. Create a new template folder in the website directory
2. Add the template to the `templates` array in `TemplateSelector.js`
3. Import the template in `WebsiteGenerator.js`
4. Add the template case in the `renderTemplate()` function

## Troubleshooting

- Ensure the domain exists in the Supabase websites table
- Check that the domain status is "active"
- Verify that the template files exist and are properly exported
- Check browser console for any JavaScript errors
