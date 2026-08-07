# 🚀 Quick Start Guide (2 Minutes)

## Installation (60 seconds)

**Prerequisites**: Node.js v16+ installed ([Download](https://nodejs.org/))

```bash
# 1. Navigate to project folder
cd pharmacy-landing

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit: http://localhost:3000
```

✅ **Done!** Your pharmacy landing page is now running.

---

## First Customization (1 minute)

### Change Colors

Edit `tailwind.config.ts` and find the `theme` section:

```typescript
colors: {
  primary: {
    500: "#10b981",  // Change this emerald green
  },
  emerald: {
    500: "#059669",  // Change this green
  },
  // More colors...
}
```

**Save and refresh browser** - colors update automatically!

### Change Company Name

1. Find `components/Navigation.tsx` (line ~30)
2. Change `"PharmaCare"` to your company name
3. Save - done!

### Change Hero Text

1. Open `components/Hero.tsx`
2. Find the headline (line ~60): `"Your Trusted Online Pharmacy..."`
3. Change to your text
4. Save!

---

## Next: Add Your Content

### Update Medicine Products
- File: `components/FeaturedMedicines.tsx`
- Edit the `medicines` array with your products
- Replace image URLs with your product images

### Update Categories
- File: `components/Categories.tsx`
- Edit the `categories` array
- Customize colors and descriptions

### Update Testimonials
- File: `components/Testimonials.tsx`
- Edit the `testimonials` array with real customer reviews

### Update Pharmacists
- File: `components/Pharmacists.tsx`
- Edit the `pharmacists` array with your team
- Add real photos

### Update Contact Info
- File: `components/Footer.tsx`
- Line ~230: Update phone, email, address

---

## Build & Deploy (30 seconds)

### Build for Production
```bash
npm run build      # Creates optimized build
npm start          # Test production build
```

### Deploy on Vercel (Recommended - Free)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Visit** [vercel.com](https://vercel.com)
3. **Click** "Import Project"
4. **Select** your GitHub repository
5. **Click** Deploy

✅ Your site is LIVE! Automatic updates on every push.

---

## Common Tasks

### Change Logo
In `components/Navigation.tsx` (line ~18):
```typescript
<span className="text-xl font-bold">💊</span>  // Change emoji or add your logo
```

### Edit FAQ Questions
In `components/FAQ.tsx`, edit the `faqs` array with your questions and answers.

### Update Newsletter
In `components/Newsletter.tsx`, change email placeholder and success message.

### Add Social Media Links
In `components/Footer.tsx`, find social icons section and add your links.

---

## Troubleshooting

### Port 3000 in use?
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Module not found error?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Code looks broken?
1. Stop server (Ctrl+C)
2. Run `npm run dev` again
3. Hard refresh browser (Ctrl+Shift+R)

---

## File Structure You Need to Know

```
pharmacy-landing/
├── components/          ← Edit these for content changes
│   ├── Navigation.tsx      (company name, links)
│   ├── Hero.tsx           (headline, hero image)
│   ├── FeaturedMedicines.tsx  (products)
│   ├── Categories.tsx      (categories)
│   ├── FAQ.tsx            (questions)
│   ├── Footer.tsx         (contact info, links)
│   └── ... (other sections)
├── app/
│   ├── globals.css        (global styles)
│   ├── page.tsx           (main page - imports all sections)
│   └── layout.tsx         (app metadata)
├── tailwind.config.ts     ← Edit for color changes
├── package.json           ← npm scripts here
└── README.md             (documentation)
```

---

## What This Project Includes

✅ **13 Complete Sections**
- Navigation with dark mode
- Hero section with video
- Featured medicines
- Categories showcase
- Why choose us
- Healthcare services
- Meet pharmacists
- Customer testimonials
- Statistics with animations
- Mobile app promotion
- FAQ accordion
- Newsletter signup
- Footer with links

✅ **Animations & Effects**
- Smooth scroll animations
- Hover effects
- Framer Motion animations
- Dark mode toggle
- Responsive design

✅ **Production Ready**
- TypeScript for safety
- SEO optimized
- Mobile responsive
- Accessibility compliant
- Performance optimized

---

## YouTube-Style Walkthrough

1. **Install** (1 min): `npm install`
2. **Run** (30 sec): `npm run dev`
3. **Customize Colors** (1 min): Edit `tailwind.config.ts`
4. **Add Your Content** (5 min): Edit component files
5. **Test Mobile** (1 min): Inspect Element → Toggle Device
6. **Deploy** (1 min): Push to GitHub & Vercel

**Total time to launch**: ~10 minutes ⏱️

---

## Need More Help?

📖 **Read These Files In Order**:
1. `README.md` - Project overview
2. `INSTALLATION.md` - Detailed setup
3. `PROJECT_SUMMARY.md` - All files explained
4. `DEVELOPER_NOTES.md` - Architecture & patterns

💬 **Questions?**
- Email: support@pharmacare.com
- Phone: +1 800 123 4567

---

## You're All Set! 🎉

Your professional pharmacy landing page is ready to customize and launch!

**Next action**: Open `components/Navigation.tsx` and change the company name to yours. 

Happy coding! 🚀
