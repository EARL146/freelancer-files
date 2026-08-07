# Installation & Setup Guide

## Quick Start (5 minutes)

### Step 1: Prerequisites
Make sure you have the following installed:
- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **npm**: v7 or higher (comes with Node.js) or **yarn**
- **Git** (optional, for version control)

### Step 2: Installation

Navigate to the project directory:
```bash
cd pharmacy-landing
```

Install dependencies using npm:
```bash
npm install
```

Or with yarn:
```bash
yarn install
```

### Step 3: Run Development Server

Start the development server:
```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will be available at: **http://localhost:3000**

### Step 4: Open in Browser

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the PharmaCare landing page!

---

## Development Workflow

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Run linter
npm run lint
```

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your configuration (optional)

---

## Customization Guide

### 1. Changing Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: { /* your colors */ },
  emerald: { /* your colors */ },
}
```

### 2. Changing Fonts

Edit `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';

const yourFont = YourFont({
  subsets: ["latin"],
  variable: "--font-custom"
});
```

### 3. Replacing Images

Search and replace image URLs in components:
- **Hero video**: Hero.tsx (line ~50)
- **Medicine images**: FeaturedMedicines.tsx
- **Pharmacist images**: Pharmacists.tsx

### 4. Editing Content

Each section component contains sample content. Edit directly in component files:
- `components/FeaturedMedicines.tsx` - Medicine products
- `components/Categories.tsx` - Product categories
- `components/Testimonials.tsx` - Customer reviews
- `components/FAQ.tsx` - Frequently asked questions

---

## Building for Production

### Step 1: Build the Application

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

### Step 2: Test Production Build Locally

```bash
npm start
```

The app will run at http://localhost:3000 using the production build.

### Step 3: Deploy

#### Option A: Vercel (Recommended - Free)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy
5. Your site will be live in minutes!

#### Option B: Netlify

1.  Build the project:
```bash
npm run build && npm run export
```

2. Push to Netlify

3. Deploy!

#### Option C: Traditional Hosting

1. Build: `npm run build`
2. Upload the `.next` folder and `public` folder to your server
3. Set environment variables on your server
4. Run `npm start` (requires Node.js on server)

---

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, specify a different port:

```bash
npm run dev -- -p 3001
```

### Dependencies Issues

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Check for TypeScript errors:

```bash
npm run lint
```

### Video Autoplay Issues

If the hero video doesn't autoplay:
- Ensure `muted` attribute is present
- Check browser autoplay permissions
- Use a smaller video file for faster loading

---

## Performance Optimization

### Image Optimization
- Use Next.js Image component for all images
- Optimize images before uploading
- Use WebP format where possible

### Code Splitting
- Components are automatically code-split by Next.js
- Use dynamic imports for heavy components

### Bundle Analysis

Install and run bundle analyzer:

```bash
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

---

## SEO Setup

### Metadata

Update `app/layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  title: "Your Title",
  description: "Your description",
  keywords: "your, keywords",
};
```

### Open Graph

Edit OG tags in layout.tsx:

```typescript
openGraph: {
  images: [
    {
      url: "your-image-url",
      width: 1200,
      height: 630,
    },
  ],
}
```

### Sitemap

Update the live URL in your deployment to generate sitemap automatically.

---

## Security Best Practices

### Environment Variables

Never commit sensitive data:
- Keep `.env.local` out of version control (in `.gitignore`)
- Use server-side environment variables for sensitive data

### Headers

The middleware in `middleware.ts` adds security headers:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Strict-Transport-Security

### HTTPS

- Always use HTTPS in production
- Enable HSTS headers
- Use security headers middleware

---

## Accessibility Testing

Check accessibility:

```bash
# Install axe DevTools browser extension
# Run accessibility audits in Chrome DevTools
# Keyboard navigation: Tab through all elements
# Screen reader: Test with NVDA or JAWS
```

---

## Performance Metrics

Check Core Web Vitals using:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- Chrome DevTools Lighthouse
- [WebPageTest](https://www.webpagetest.org/)

### Optimization Tips

1. **Lazy Loading**: Implemented with `useInView`
2. **Image Optimization**: Use Next.js Image component
3. **CSS Minification**: Automatic with Tailwind CSS
4. **Code Splitting**: Automatic with Next.js
5. **Caching**: Configure in deployment platform

---

## Version Control

Initialize Git (if not already done):

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

---

## Getting Help

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Support

- Email: support@pharmacare.com
- Phone: +1 800 123 4567
- Website: https://pharmacare.com

---

## FAQ

**Q: Can I use this for commercial purposes?**
A: Yes! This template is free for both personal and commercial use.

**Q: How do I add payment gateway integration?**
A: Install a payment library (Stripe, PayPal, etc.) and integrate in the checkout component.

**Q: Can I change the color scheme?**
A: Yes! Edit `tailwind.config.ts` to customize colors.

**Q: How do I add a blog section?**
A: Create new components in the `components` folder and add to `page.tsx`.

**Q: Is this mobile-responsive?**
A: Yes! Fully responsive for all screen sizes.

---

## Next Steps

1. ✅ Installation complete
2. 📝 Customize content and images
3. 🎨 Update colors to match your brand
4. 🧪 Test on different devices
5. 🚀 Deploy to production
6. 📊 Monitor analytics
7. 🔄 Collect feedback and iterate

---

Happy coding! 🎉
