# SaaS App

A modern SaaS application built with Next.js, Supabase, and Tailwind CSS.

## Features

- 🔐 **Authentication** - Secure user authentication with Supabase
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🎨 **Dark Mode** - Built-in dark mode support
- ⚡ **Fast Performance** - Built with Next.js 14 App Router
- 🔒 **Route Protection** - Middleware-based authentication
- 📊 **Dashboard** - Comprehensive analytics dashboard
- 💳 **Pricing Plans** - Subscription-based pricing model

## Tech Stack

- **Frontend**: Next.js 14, React, JavaScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **Deployment**: Netlify
- **Version Control**: GitHub

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- GitHub account
- Netlify account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase**
   
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Update your `.env.local` file with these values

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Landing page
├── components/            # React components
│   ├── auth/              # Authentication components
│   └── layout/            # Layout components
├── lib/                   # Utility functions
│   ├── supabase.js        # Supabase client
│   └── utils.js           # Utility functions
└── middleware.js          # Authentication middleware
```

## Deployment

### Deploy to Netlify

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

3. **Configure environment variables**
   - In Netlify dashboard, go to Site settings > Environment variables
   - Add your Supabase environment variables

### Environment Variables

Make sure to set these environment variables in your Netlify dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)

## Authentication Flow

1. **Sign Up**: Users can create accounts with email/password
2. **Email Verification**: Users receive confirmation emails
3. **Sign In**: Users can sign in with their credentials
4. **Protected Routes**: Dashboard and other pages require authentication
5. **Sign Out**: Users can sign out from the navbar

## Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind classes in components
- Customize colors in `tailwind.config.js`

### Features
- Add new pages in `src/app/`
- Create new components in `src/components/`
- Extend Supabase functionality in `src/lib/`

### Database
- Set up additional tables in Supabase dashboard
- Create Row Level Security (RLS) policies
- Add real-time subscriptions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@your-saas-app.com or create an issue in the GitHub repository. 