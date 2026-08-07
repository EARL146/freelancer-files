# PharmaCare - Developer Notes & Architecture

## Project Overview

PharmaCare is a premium, modern pharmacy landing page built with cutting-edge web technologies. The project follows best practices in React, Next.js, and modern web design.

## Architecture

### Directory Structure

```
pharmacy-landing/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/              # React components
│   ├── Navigation.tsx       # Navigation bar
│   ├── Hero.tsx            # Hero section with video
│   ├── FeaturedMedicines.tsx # Product showcase
│   ├── Categories.tsx       # Category cards
│   ├── WhyChooseUs.tsx     # Features section
│   ├── HealthcareServices.tsx # Services cards
│   ├── Pharmacists.tsx      # Team section
│   ├── Testimonials.tsx     # Reviews carousel
│   ├── Statistics.tsx       # Animated stats
│   ├── MobileAppPromotion.tsx # App download
│   ├── FAQ.tsx              # Accordion questions
│   ├── Newsletter.tsx       # Email subscription
│   └── Footer.tsx           # Footer with links
├── lib/                     # Utility functions
│   └── utils.ts            # Helper functions
├── public/                  # Static files
│   └── robots.txt          # SEO robots file
├── Configuration files
│   ├── package.json         # Dependencies
│   ├── tsconfig.json        # TypeScript config
│   ├── tailwind.config.ts   # Tailwind CSS config
│   ├── postcss.config.js    # PostCSS config
│   ├── next.config.ts       # Next.js config
│   ├── middleware.ts        # Request middleware
│   └── vercel.json          # Vercel deployment
└── Documentation
    ├── README.md            # Project overview
    ├── INSTALLATION.md      # Setup guide
    └── DEVELOPER_NOTES.md   # This file
```

## Technology Stack

### Frontend Framework
- **Next.js 14**: Server-side rendering and static generation
- **React 18**: Component library
- **TypeScript**: Type safety and better DX

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Custom CSS**: Global styles in `app/globals.css`

### Animations
- **Framer Motion**: Advanced animations and interactions
- **ScrollReveal**: (Optional) Scroll-based animations

### UI Components
- **Lucide React**: Beautiful icon library
- **Custom Components**: Reusable, modular components

### Performance & SEO
- **Next.js Image Optimization**: Automatic image optimization
- **Lazy Loading**: Using Intersection Observer
- **Code Splitting**: Automatic by Next.js
- **Metadata Management**: SEO-friendly metadata

## Component Design Patterns

### 1. Functional Components with Hooks

All components use functional components with React hooks:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const MyComponent = () => {
  const [state, setState] = useState('');
  
  useEffect(() => {
    // Side effects
  }, []);

  return (
    <motion.div>
      {/* JSX */}
    </motion.div>
  );
};
```

### 2. Scroll Animation Pattern

Components use `react-intersection-observer` for scroll animations:

```typescript
import { useInView } from 'react-intersection-observer';

export const Section = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        Content
      </motion.div>
    </section>
  );
};
```

### 3. Framer Motion Animation Pattern

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export const Component = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div variants={itemVariants}>Item 1</motion.div>
    <motion.div variants={itemVariants}>Item 2</motion.div>
  </motion.div>
);
```

## Styling Standards

### Color System

- **Primary Green**: `#10B981` (Emerald-500)
- **Primary Blue**: `#2563EB` (Blue-500)
- **Light Background**: `#FFFFFF`
- **Dark Background**: `#0F172A` (Slate-900)

### Spacing Scale

Using Tailwind's default spacing scale:
- Small: `gap-2`, `gap-4` (8px, 16px)
- Medium: `gap-6`, `gap-8` (24px, 32px)
- Large: `gap-12`, `gap-16` (48px, 64px)

### Responsive Design

```typescript
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### Shadow Hierarchy

- `shadow-premium`: Primary shadow for cards
- `shadow-lg`: Hover state
- `shadow-xl`: Active state
- `shadow-2xl`: Maximum elevation

## Animation Principles

1. **Entrance Animations**: Fade-in, slide-up, zoom-in
2. **Hover Effects**: Scale, color change, shadow
3. **Scroll Animations**: Trigger on scroll using IntersectionObserver
4. **Transitions**: Smooth 300-600ms durations
5. **Performance**: Use GPU-accelerated properties (transform, opacity)

## Performance Optimization

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={300}
  height={300}
  priority // Use for above-fold images
/>
```

### Code Splitting

Components are automatically code-split by Next.js. For large libraries:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

### CSS Optimization

- Tailwind automatically purges unused CSS
- Custom CSS is minimized in production
- Critical CSS is inlined automatically

## Accessibility (a11y)

### WCAG 2.1 Compliance

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Color contrast ratios (4.5:1 for text)
- ✅ Reduced motion support

### Implementation

```typescript
// Use semantic elements
<nav> {/* Navigation */} </nav>
<main> {/* Main content */} </main>
<footer> {/* Footer */} </footer>

// Add ARIA labels
<button aria-label="Open shopping cart">
  <ShoppingCart />
</button>

// Respect reduced motion preference
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

## SEO Best Practices

### Metadata

```typescript
export const metadata: Metadata = {
  title: 'PharmaCare - Online Pharmacy',
  description: 'Order medicines online',
  keywords: 'pharmacy, medicines, healthcare',
  openGraph: {
    title: 'PharmaCare',
    description: 'Order medicines online',
    type: 'website',
    images: [{ url: 'og-image.jpg', width: 1200, height: 630 }],
  },
};
```

### Structured Data

Add JSON-LD structured data for:
- Organization
- Product schema
- Local business
- FAQ schema

### Robots and Sitemap

- `robots.txt`: Controls crawler access
- Sitemap: Auto-generated by Next.js
- Meta robots: In metadata

## State Management

Currently using React hooks for local state. For larger apps, consider:

- **Context API**: For global theme, user auth
- **Redux Toolkit**: For complex state
- **Zustand**: For lightweight state management
- **TanStack Query**: For server state

## Best Practices

### Component Structure

```typescript
'use client'; // Client component marker

// Imports
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Constants
const ANIMATION_DURATION = 0.6;

// Component
export const ComponentName = () => {
  // Hooks
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [state, setState] = useState(false);

  // Handlers
  const handleClick = () => {
    setState(!state);
  };

  // Render
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      {/* JSX */}
    </motion.div>
  );
};
```

### Naming Conventions

- **Components**: PascalCase (e.g., `FeaturedMedicines`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`)
- **CSS Classes**: kebab-case (Tailwind default)

### File Organization

- One component per file
- Co-locate related files
- Keep components small and focused
- Extract reusable logic to utils

## Testing

### Unit Testing Setup

```bash
npm install --save-dev jest @testing-library/react
```

### Example Test

```typescript
import { render, screen } from '@testing-library/react';
import { Navigation } from '@/components/Navigation';

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Auto-deploys on push
4. Environmental variables in Vercel dashboard

### Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://pharmacare.com
```

## Common Tasks

### Add New Section

1. Create component in `components/`
2. Add styling with Tailwind
3. Add animations with Framer Motion
4. Import in `app/page.tsx`

### Add New Medicine

1. Edit `components/FeaturedMedicines.tsx`
2. Add to medicines array
3. Update image URL
4. Re-run dev server

### Customize Colors

1. Edit `tailwind.config.ts`
2. Update color values
3. Colors update across app
4. Test dark mode

### Add Analytics

1. Add Google Analytics ID to `.env.local`
2. Install `@react-google-analytics/core`
3. Wrap providers in layout

## Debugging

### Console Logging

```typescript
console.log('Debug:', variable);
console.error('Error:', error);
console.warn('Warning:', message);
```

### React DevTools

- Install React DevTools browser extension
- Inspect component tree
- Track prop changes

### Chrome DevTools

- Performance tab: Check animations
- Lighthouse: Run audits
- Network: Check bundle size
- Accessibility: Run audits

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Web Accessibility](https://www.w3.org/WAI/)

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes following above standards
3. Commit: `git commit -m "feature: description"`
4. Push: `git push origin feature/name`
5. Create pull request

## Version History

- **v1.0.0** (Current): Initial release with all features

---

**Last Updated**: August 2024
**Maintained By**: PharmaCare Development Team
