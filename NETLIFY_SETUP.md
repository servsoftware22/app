# Netlify Integration Setup

This document explains how to set up the Netlify integration for automatically creating subdomains when generating new websites.

## Required Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Netlify API Access Token
NETLIFY_ACCESS_TOKEN=your_netlify_access_token_here

# Netlify Site ID (for your main toolpage.site)
NETLIFY_SITE_ID=your_main_site_id_here

# Your app URL (for internal API calls)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## How to Get These Values

### 1. Netlify Access Token

1. Go to [Netlify User Settings](https://app.netlify.com/user/settings/tokens)
2. Click "New access token"
3. Give it a name (e.g., "Site Generator Integration")
4. Copy the generated token

### 2. Netlify Site ID

1. Go to your main site in Netlify (the site for `toolpage.site`)
2. Look at the URL: `https://app.netlify.com/sites/YOUR_SITE_ID`
3. Copy the site ID from the URL
4. This is the site ID you'll use for managing subdomains

## How It Works

### 1. Website Generation

When a user generates a website through the site generator:

- A new website record is created in the database
- The domain is set to `subdomain.toolpage.site`
- Netlify subdomain setup is triggered automatically

### 2. Netlify Subdomain Creation

The new `/api/setup/site-generator/netlify-setup` route:

- Creates a new Netlify site for the subdomain
- Sets up DNS records pointing to Netlify
- Updates the website record with Netlify information
- Triggers the initial deployment

### 3. Domain Structure

- **Main domain**: `toolpage.site`
- **Subdomain format**: `businessname.toolpage.site`
- **Netlify URL**: `businessname.netlify.app` (fallback)

## API Endpoints

### POST `/api/setup/site-generator/netlify-setup`

Creates and configures a Netlify subdomain for an existing website.

**Request Body:**

```json
{
  "websiteId": "uuid",
  "subdomain": "businessname"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Netlify subdomain setup completed successfully",
  "netlify_site": {
    "id": "netlify_site_id",
    "url": "https://businessname.netlify.app",
    "admin_url": "https://app.netlify.com/sites/site_id",
    "custom_domain": "businessname.toolpage.site"
  },
  "website_id": "uuid"
}
```

### GET `/api/setup/site-generator/netlify-setup?websiteId=uuid`

Checks the status of a Netlify deployment for a website.

**Response:**

```json
{
  "status": "active",
  "netlify_site": {
    "id": "netlify_site_id",
    "url": "https://businessname.netlify.app",
    "custom_domain": "businessname.toolpage.site",
    "ssl_url": "https://businessname.toolpage.site",
    "force_ssl": true
  }
}
```

## Error Handling

The integration is designed to be fault-tolerant:

- If Netlify setup fails, the website creation still succeeds
- Failed setups are logged and can be retried
- Database updates track the status of Netlify integration

## Security

- All API calls require user authentication
- Users can only access websites they own
- Netlify tokens are stored securely in environment variables
- No sensitive information is exposed in responses

## Troubleshooting

### Common Issues

1. **"Netlify configuration not available"**

   - Check that all required environment variables are set
   - Verify the values are correct

2. **"Failed to create Netlify site"**

   - Verify your Netlify access token has the correct permissions
   - Check that your account has available site slots

3. **DNS setup failures**
   - DNS setup failures don't break the process
   - Check Netlify logs for DNS-related errors
   - Manual DNS configuration may be required in some cases

### Monitoring

Check the browser console and server logs for:

- Netlify API responses
- DNS setup status
- Deployment triggers
- Error messages and stack traces

## Future Enhancements

Potential improvements to consider:

- Webhook integration for deployment status updates
- Automatic retry mechanisms for failed setups
- Custom domain support beyond subdomains
- Integration with other hosting providers
- Automated SSL certificate management
