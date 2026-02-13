# 🚀 Quick Start Guide

Get your portfolio running in 3 minutes!

## Installation

```bash
# Navigate to project
cd portfolio

# Install dependencies (choose one)
npm install
# or
yarn install
# or
pnpm install
```

## Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Important Notes

### Lenis Smooth Scrolling

The project includes TWO versions of the main page:

1. **`app/page.jsx`** - Current version (basic smooth scrolling)
2. **`app/page-with-lenis.jsx`** - Enhanced version with Lenis

To use the Lenis version:

```bash
# Backup current version
mv app/page.jsx app/page-basic.jsx

# Use Lenis version
mv app/page-with-lenis.jsx app/page.jsx
```

### Custom Cursor

- Works on **desktop only**
- Automatically hidden on mobile/tablet
- Uses `mix-blend-difference` for visual effect

### Mobile Responsiveness

All text sizes, spacing, and layouts are fully responsive:
- Mobile: Smaller text, tighter spacing
- Tablet: Medium sizes
- Desktop: Full animations and effects

## Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm run start
```

## Customization Checklist

- [ ] Update project titles in `projects` array
- [ ] Add your social media links in footer
- [ ] Customize hero text
- [ ] Add your own color scheme in `tailwind.config.js`
- [ ] Replace placeholder content with your info

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Animations laggy?**
- Reduce `stagger` values in GSAP animations
- Lower `duration` in Framer Motion transitions

**Custom cursor not working?**
- Only works on desktop browsers
- Check browser console for errors

## Next Steps

1. Customize content in `app/page.jsx`
2. Add your projects and images
3. Update social links
4. Deploy to Vercel/Netlify

Happy coding! ✨
