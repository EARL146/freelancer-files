# PharmaCare - Premium Pharmacy Landing Page

A modern, ultra-realistic pharmacy landing page built with React, Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🎯 Features

### ✨ Design Features
- **100% Realistic UI Design** - Apple-inspired premium design
- **Responsive Design** - Works seamlessly on Desktop, Tablet, and Mobile
- **Glassmorphism Effects** - Modern glass card design with soft shadows
- **Smooth Animations** - Framer Motion powered animations and micro-interactions
- **Dark Mode Support** - Toggle between light and dark themes
- **Professional Typography** - Using Inter and Poppins fonts

### 📱 Sections Included

1. **Navigation Bar**
   - Transparent navbar that becomes solid on scroll
   - Dark mode toggle
   - Search functionality
   - Cart icon with badge
   - Login/Register buttons

2. **Hero Section**
   - Full-screen hero with live looping video background
   - Dark overlay for readability
   - Floating animation particles
   - Floating medicine cards with 3D glass effects
   - CTA buttons (Shop Now, Consult Pharmacist)

3. **Featured Medicines**
   - Beautiful product cards
   - Product images, ratings, and prices
   - Add to cart functionality
   - Hover animations and effects

4. **Categories**
   - 8 medicine categories
   - Modern icon design
   - Glass morphism cards
   - Hover animations

5. **Why Choose Us**
   - 6 feature highlights with icons
   - Statistics section
   - Animated icons on hover

6. **Healthcare Services**
   - 5 service cards with icons
   - Video consultation
   - Prescription upload
   - Home delivery tracking
   - Health checkup booking
   - Medicine reminders

7. **Meet Our Pharmacists**
   - Professional pharmacist cards
   - Circular images with hover effects
   - Experience and certification details
   - Consultation buttons

8. **Customer Testimonials**
   - Animated carousel
   - Star ratings
   - Navigation controls
   - Real customer profiles

9. **Statistics Section**
   - Animated counter animations
   - Live stats updating
   - Beautiful gradient background

10. **Mobile App Promotion**
    - Phone mockup display
    - App store badges
    - Feature list
    - Download buttons

11. **FAQ**
    - Animated accordion
    - Smooth expand/collapse
    - 6 common questions answered

12. **Newsletter**
    - Email subscription form
    - Success confirmation
    - Trust badges

13. **Footer**
    - Company information
    - Multiple link sections
    - Contact information
    - Social media icons
    - Scroll to top button

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Intersection Observer**: React Intersection Observer (for scroll animations)

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Steps

1. Clone or download the project:
```bash
cd pharmacy-landing
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
pharmacy-landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── FeaturedMedicines.tsx
│   ├── Categories.tsx
│   ├── WhyChooseUs.tsx
│   ├── HealthcareServices.tsx
│   ├── Pharmacists.tsx
│   ├── Testimonials.tsx
│   ├── Statistics.tsx
│   ├── MobileAppPromotion.tsx
│   ├── FAQ.tsx
│   ├── Newsletter.tsx
│   └── Footer.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.ts
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
- Primary Emerald Green: `#10B981`
- Primary Blue: `#2563EB`
- White: `#FFFFFF`

### Fonts
The project uses:
- **System Font**: Inter (body)
- **Heading Font**: Poppins (headings)

Modify in `app/layout.tsx` to use different fonts.

### Images & Videos
Replace image URLs in components with your own:
- Hero video background
- Medicine product images
- Pharmacist images
- Testimonial images

## 🔧 Environment Variables

Create a `.env.local` file (optional):
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## ⚡ Performance Optimization

- Image optimization with Next.js Image component ready
- Code splitting and dynamic imports
- Minification and compression enabled
- CSS purging for smaller bundle size

## ♿ Accessibility

- WCAG 2.1 compliant
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support
- High contrast support

## 🌙 Dark Mode

Dark mode is automatically enabled based on system preferences. Users can toggle it manually, and the preference is saved to localStorage.

## 📱 Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px and above

## 🎯 Future Enhancements

- Shopping cart functionality
- User authentication
- Product filtering and search
- Order tracking
- Payment gateway integration
- Blog/News section
- Multi-language support

## 📄 License

This project is free to use for both personal and commercial purposes.

## 🙋 Support

For questions or issues:
- Email: support@pharmacare.com
- Phone: +1 800 123 4567
- Website: https://pharmacare.com

## 🎉 Credits

Built with modern web technologies and best practices in UI/UX design.

---

**Happy Coding! 🚀**
