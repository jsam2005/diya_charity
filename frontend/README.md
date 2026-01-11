# Diya Charitable Trust - React TypeScript Website

A modern, production-ready React TypeScript website for Diya Charitable Trust built with Vite, featuring a clean, nature-inspired design that's fully responsive for both desktop and mobile devices.

## 🚀 Features

- **React 18** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Hook Form** for form handling and validation
- **Responsive Design** optimized for all devices
- **Accessibility** features and keyboard navigation
- **Performance Optimized** with code splitting
- **SEO Ready** with meta tags and semantic HTML

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Mission.tsx
│   │   ├── Process.tsx
│   │   ├── CommunityFeedback.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── NotificationProvider.tsx
│   ├── data/              # Static data and constants
│   │   └── constants.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── index.ts
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Run linting:**
   ```bash
   npm run lint
   ```

6. **Type checking:**
   ```bash
   npm run type-check
   ```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#2F4F4F` (Dark Slate Gray)
- **Secondary Green**: `#4A6050` (Medium Green)
- **Light Green**: `#A9B7A0` (Border/Accent)
- **Background**: `#FBF8F2` (Cream/Off-white)
- **Text**: `#555` (Dark Gray)

### Typography
- **Headings**: EB Garamond (serif)
- **Body Text**: EB Garamond (serif)

### Components
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Validated inputs with error states
- **Animations**: Smooth transitions and micro-interactions
- **Layout**: Responsive grid system

## 📱 Responsive Breakpoints

- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px`
- **Desktop**: `> 1024px`

## 🔧 Key Technologies

### Core
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Vite 4.5.0** - Build tool

### Styling
- **Tailwind CSS 3.3.5** - Utility-first CSS
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Animation & Interaction
- **Framer Motion 10.16.5** - Animation library
- **React Intersection Observer** - Scroll animations

### Forms
- **React Hook Form 7.48.2** - Form handling
- **Custom validation** - Email, phone, required fields

### Development
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript linting

## 🎯 Features Overview

### Single Page Application
- **No routing** - All content on one page
- **Smooth scrolling** between sections
- **Fixed navigation** with active states

### Sections
1. **Hero** - Full-screen banner with call-to-action
2. **Mission** - Organization mission and values
3. **Process** - Four-step process explanation
4. **Community Feedback** - Testimonials from supporters
5. **Contact** - Contact form with validation
6. **Footer** - Contact information and links

### Interactive Elements
- **Mobile menu** with smooth animations
- **Scroll-to-top** button
- **Form validation** with real-time feedback
- **Notification system** for user feedback
- **Hover effects** and micro-interactions

## 🚀 Performance Optimizations

- **Code splitting** with dynamic imports
- **Lazy loading** for images and components
- **Optimized bundle** with manual chunks
- **Tree shaking** for unused code elimination
- **Minification** and compression

## ♿ Accessibility Features

- **Semantic HTML** structure
- **ARIA labels** and roles
- **Keyboard navigation** support
- **Focus management** for modals and forms
- **Screen reader** friendly
- **High contrast** color scheme
- **Reduced motion** support

## 🔒 Security Features

- **TypeScript** for type safety
- **Input validation** and sanitization
- **XSS protection** with React
- **CSRF protection** ready
- **Secure headers** configuration

## 📈 SEO Optimization

- **Meta tags** for social sharing
- **Open Graph** and Twitter cards
- **Semantic HTML** structure
- **Fast loading** times
- **Mobile-first** responsive design

## 🧪 Development Workflow

1. **Development**: `npm run dev` - Hot reload development server
2. **Linting**: `npm run lint` - Check code quality
3. **Type Checking**: `npm run type-check` - Verify TypeScript
4. **Build**: `npm run build` - Production build
5. **Preview**: `npm run preview` - Test production build

## 📦 Build Output

The build process creates an optimized `dist/` folder with:
- **Minified JavaScript** bundles
- **Optimized CSS** with Tailwind
- **Compressed assets**
- **Source maps** for debugging

## 🌐 Browser Support

- **Chrome** (latest)
- **Firefox** (latest)
- **Safari** (latest)
- **Edge** (latest)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📝 Customization

### Colors
Update `tailwind.config.js` to modify the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Content
Edit `src/data/constants.ts` to update:
- Organization information
- Mission content
- Contact details
- Testimonials

### Styling
Modify `src/index.css` for global styles or individual component files for specific styling.

## 🚀 Deployment

The built application can be deployed to any static hosting service:

- **Vercel** - Recommended for React apps
- **Netlify** - Great for static sites
- **GitHub Pages** - Free hosting option
- **AWS S3** - Scalable cloud hosting

## 📄 License

This project is created for Diya Charitable Trust. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For technical support or customization requests, please contact the development team.
