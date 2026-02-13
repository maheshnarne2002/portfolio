# Ancient × Future Portfolio

A highly animated, modern portfolio website that bridges ancient design principles with cutting-edge web technology. Inspired by the aesthetics of toukoum.fr.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Full-screen animated hero** with parallax effects
- **Scroll-based transitions** powered by GSAP ScrollTrigger
- **Custom cursor** with hover effects
- **Smooth scrolling** using Lenis
- **Framer Motion** animations throughout
- **Fully responsive** mobile-first design
- **Dark theme** with clean, minimal aesthetic
- **Production-ready** optimized code

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: 
  - Framer Motion (component animations)
  - GSAP (scroll-triggered animations)
  - @studio-freight/lenis (smooth scrolling)
- **Font**: Inter (Google Fonts)

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.jsx          # Root layout with metadata
│   ├── page.jsx            # Main portfolio page
│   └── globals.css         # Global styles & Tailwind
├── public/                 # Static assets
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── next.config.js          # Next.js configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone or download this project**

2. **Navigate to the project directory**
   ```bash
   cd portfolio
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 🎨 Customization

### Update Content

Edit `app/page.jsx` to customize:

- **Hero section**: Change titles and tagline
- **Projects**: Modify the `projects` array with your own work
- **Skills**: Update the skills grid
- **Social links**: Add your GitHub, LinkedIn, Twitter URLs

### Colors & Theme

Edit `tailwind.config.js` to customize:
- Color palette
- Fonts
- Spacing
- Breakpoints

### Animations

Modify animation parameters in `app/page.jsx`:
- **GSAP**: Adjust `duration`, `ease`, and `stagger` values
- **Framer Motion**: Customize `transition` and `animate` props
- **Parallax**: Change `data-depth` attribute for different parallax speeds

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Custom cursor is automatically disabled on mobile devices.

## ⚡ Performance

- **Optimized animations**: Uses GPU-accelerated transforms
- **Lazy loading**: Components load on scroll
- **Code splitting**: Automatic with Next.js App Router
- **Image optimization**: Use Next.js Image component for production

## 🎯 Key Sections

1. **Hero**: Full-screen animated introduction
2. **About**: Philosophy and approach
3. **Projects**: Portfolio showcase with hover effects
4. **Skills**: Technology stack grid
5. **Contact**: Call-to-action section
6. **Footer**: Social links and copyright

## 📝 Notes

- Custom cursor uses `mix-blend-difference` for visual effect
- All animations respect user's motion preferences
- Smooth scrolling can be disabled via browser settings
- GSAP ScrollTrigger automatically cleans up on component unmount

## 🐛 Troubleshooting

**Animations not working?**
- Make sure all dependencies are installed
- Check browser console for errors
- Ensure GSAP is properly registered

**Custom cursor not visible?**
- Custom cursor only works on desktop (hidden on mobile)
- Check that `cursor: none` is applied to body

**Smooth scrolling issues?**
- Lenis requires a specific DOM structure
- Check that ScrollTrigger is registered with GSAP

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Design inspiration: [toukoum.fr](https://www.toukoum.fr)

Built with ❤️ using modern web technologies.

---

**Ready to create something timeless?** 🚀
