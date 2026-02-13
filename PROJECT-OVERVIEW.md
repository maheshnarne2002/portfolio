# Ancient × Future Portfolio - Complete Project

## 🎨 Concept

This portfolio bridges **ancient design principles** (sacred geometry, balanced proportions, timeless aesthetics) with **futuristic web technology** (GSAP, Framer Motion, smooth scrolling). It's a meditation on how the past informs the future.

## 📦 What's Included

### File Structure
```
portfolio/
├── app/
│   ├── layout.jsx              # Root layout with Inter font
│   ├── page.jsx                # Main portfolio (basic version)
│   ├── page-with-lenis.jsx     # Enhanced with Lenis scrolling
│   └── globals.css             # Global styles + Tailwind
├── package.json                # All dependencies
├── tailwind.config.js          # Custom theme configuration
├── postcss.config.js           # PostCSS setup
├── next.config.js              # Next.js configuration
├── .eslintrc.json              # ESLint rules
├── .gitignore                  # Git ignore rules
├── README.md                   # Full documentation
└── QUICKSTART.md               # 3-minute setup guide
```

## 🛠 Tech Stack

- **Next.js 14** (App Router) - React framework
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Declarative animations
- **GSAP + ScrollTrigger** - Advanced scroll animations
- **Lenis** - Buttery smooth scrolling (optional)
- **Inter Font** - Clean, modern typography

## ✨ Features Implemented

### 1. Full-Screen Animated Hero
- Staggered text reveal
- Animated background grid
- Parallax scroll indicator
- Gradient text effects

### 2. Scroll-Based Transitions
- GSAP ScrollTrigger animations
- Parallax sections with depth control
- Fade-in project cards on scroll
- Opacity/scale transitions on hero

### 3. Custom Cursor
- Follows mouse movement
- Scales on hover
- Mix-blend-difference effect
- Hidden on mobile (responsive)

### 4. Animated Project Cards
- Hover lift effect
- Gradient overlay on hover
- Rotating arrow icon
- Staggered entrance animation

### 5. Smooth Scrolling
- Basic: CSS smooth-scroll
- Enhanced: Lenis library (separate file)
- Integrated with GSAP ScrollTrigger

### 6. Fully Responsive
- Mobile-first design
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-optimized on mobile
- Custom cursor disabled on mobile

### 7. Dark Theme
- Pure black background (#000)
- Zinc gray accents
- White highlights
- Gradient effects

## 🚀 Quick Start

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000

## 📝 Customization Guide

### Update Your Content

**Hero Section** (`app/page.jsx`, lines 107-133)
```jsx
<h1>YOUR NAME</h1>
<h1>YOUR TAGLINE</h1>
<p>Your description</p>
```

**Projects** (`app/page.jsx`, lines 78-99)
```jsx
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    tech: ['Tech1', 'Tech2'],
    year: '2026'
  }
]
```

**Social Links** (`app/page.jsx`, lines 252-263)
```jsx
{['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
  <a href="YOUR_URL">
```

### Change Colors

Edit `tailwind.config.js`:
```js
colors: {
  primary: '#your-color',
  // add custom colors
}
```

### Adjust Animations

**Speed**: Change `duration` values
**Timing**: Modify `ease` functions
**Parallax**: Adjust `data-depth` attribute (0.1 - 0.9)

## 🎯 Animation Details

### GSAP Animations
- **Hero text**: Staggered fade-in from bottom
- **Project cards**: Fade + slide up on scroll
- **Parallax sections**: Vertical movement based on scroll

### Framer Motion
- **Custom cursor**: Spring physics for smooth following
- **Hover effects**: Scale and lift animations
- **Hero opacity/scale**: Scroll-based transforms

### ScrollTrigger
- **Trigger**: When element enters viewport
- **Start**: "top 80%" (animation starts)
- **Toggle actions**: Play on enter, reverse on leave

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Single column, smaller text, no custom cursor
- **Tablet** (768px - 1024px): 2-column grid, medium text
- **Desktop** (> 1024px): Full animations, custom cursor, large text

## ⚡ Performance Tips

1. **Images**: Use Next.js `<Image>` component
2. **Fonts**: Already optimized with `next/font`
3. **Animations**: GPU-accelerated (transform, opacity)
4. **Code splitting**: Automatic with Next.js

## 🐛 Common Issues

**Q: Animations not smooth?**
A: Enable hardware acceleration in browser settings

**Q: Custom cursor not visible?**
A: Only works on desktop, check CSS `cursor: none`

**Q: GSAP errors?**
A: Make sure ScrollTrigger is registered before use

**Q: Lenis not working?**
A: Use `page-with-lenis.jsx` version instead

## 🌟 Two Versions Included

### Basic Version (`app/page.jsx`)
- CSS smooth-scroll
- Lighter weight
- Great for most use cases

### Enhanced Version (`app/page-with-lenis.jsx`)
- Lenis smooth scrolling
- More sophisticated feel
- Better scroll physics

To switch: Rename files or copy contents

## 📦 Dependencies Explained

```json
{
  "next": "React framework",
  "react": "UI library",
  "framer-motion": "Component animations",
  "gsap": "Scroll & timeline animations",
  "lenis": "Smooth scrolling (optional)",
  "tailwindcss": "Utility CSS"
}
```

## 🎨 Design Philosophy

**Ancient Principles:**
- Sacred geometry (grid system)
- Golden ratio proportions
- Minimal, timeless aesthetic
- Purposeful negative space

**Futuristic Elements:**
- GPU-accelerated animations
- Smooth scroll physics
- Interactive cursor
- Parallax depth

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag /out folder to Netlify
```

### Other Platforms
Build output is in `.next/` folder

## 📄 License

MIT - Use freely for your portfolio!

## 🙏 Credits

- Design inspiration: toukoum.fr
- Built with modern web standards
- Optimized for performance

---

**Need help?** Check README.md for detailed docs or QUICKSTART.md for instant setup.

**Ready to build something timeless?** 🚀
