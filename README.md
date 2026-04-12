# Madinaty.AI - The Digital Aurora Interface

A cutting-edge AI-powered platform serving the Madinaty community in Cairo, Egypt. This website showcases the future of community living through intelligent services and modern web design.

## 🌟 Features

### Core Functionality
- **AI-Powered Services**: Smart living automation, community safety, and local service recommendations
- **Interactive Community Map**: Detailed map of Madinaty with AI-powered location intelligence
- **AI Chatbot Assistant**: Intelligent assistant for community information and services
- **Kids AI Education Program**: Free AI discovery sessions for children aged 8-12

### Design Highlights
- **Glassmorphic Design**: Modern frosted glass effects with backdrop blur
- **Dark Theme**: Sophisticated dark mode with cyan accent colors
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Engaging micro-interactions using Framer Motion
- **Typography**: Space Grotesk for headlines, Inter for body text

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel/Netlify

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd madinaty-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
madinaty-ai/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and design system
│   │   ├── layout.tsx           # Root layout component
│   │   └── page.tsx             # Main landing page
│   └── components/
│       ├── AIChatbot.tsx        # Interactive AI chatbot component
│       └── InteractiveMap.tsx   # Madinaty community map
├── public/                      # Static assets
├── tailwind.config.ts          # Tailwind configuration with custom colors
└── README.md
```

## 🎨 Design System

### Color Palette
- **Background**: `#0a0e14` (The Void)
- **Primary**: `#81ecff` (Cyan Glow)
- **Primary Container**: `#00e3fd` (Electric Burst)
- **Secondary**: `#ac89ff` (Soft Violet)
- **Tertiary**: `#aaffdc` (Aquamarine Mint)

### Typography
- **Display/Headlines**: Space Grotesk
- **Body/Labels**: Inter
- **Modular Type Scale**: Fluid sizing for headings, fixed scales for UI

### Key Design Principles
- **No-Line Rule**: Boundaries defined through tonal transitions, not borders
- **Glass & Gradient Rule**: Glassmorphism with linear gradients for CTAs
- **Tonal Layering**: Stack sheets of frosted obsidian for depth

## 🔧 Customization

### Adding New Services
1. Update the services array in `src/app/page.tsx`
2. Add corresponding icons from Lucide React
3. Update the AI chatbot responses in `src/components/AIChatbot.tsx`

### Modifying Colors
1. Edit the color palette in `tailwind.config.ts`
2. Update CSS custom properties in `src/app/globals.css`

### Adding Map Locations
1. Update the `mockLocations` array in `src/components/InteractiveMap.tsx`
2. Add new categories as needed
3. Implement real map integration (Google Maps, Mapbox, etc.)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push to main branch

### Netlify
1. Run `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📧 Contact

- **Project**: Madinaty.AI Community Platform
- **Location**: Madinaty, Cairo, Egypt
- **Focus**: AI-powered community services and education

## 🄯 License

This project is proprietary to the Madinaty.AI community initiative.

---

## 🎯 Future Enhancements

- [ ] Real-time AI integration with backend APIs
- [ ] User authentication and personalization
- [ ] Real map integration with geolocation services
- [ ] Multi-language support (Arabic, English)
- [ ] Mobile app development
- [ ] Community forum integration
- [ ] Event calendar and booking system
- [ ] Service booking and scheduling
