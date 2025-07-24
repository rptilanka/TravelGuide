# TravelGuide - Local Guide Booking Platform

A modern web application that connects travelers with verified local guides for authentic travel experiences. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Guide Discovery**: Browse and search for local guides by location, language, and specializations
- **Advanced Filtering**: Filter guides by price range, ratings, availability, and more
- **Guide Profiles**: Detailed profiles with photos, reviews, experience, and specializations
- **Responsive Design**: Mobile-first responsive design for all devices
- **Modern UI**: Beautiful, intuitive interface with smooth animations
- **Verified Guides**: All guides are verified for quality and authenticity

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Components**: Modular, reusable React components

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**: Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── guides/         # Guides listing page
│   ├── layout.tsx      # Root layout with header/footer
│   └── page.tsx        # Homepage
├── components/         # Reusable React components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Hero.tsx        # Homepage hero section
│   ├── SearchSection.tsx # Guide search interface
│   ├── FeaturedGuides.tsx # Featured guides display
│   ├── GuideCard.tsx   # Individual guide card
│   ├── HowItWorks.tsx  # Process explanation
│   └── Testimonials.tsx # Customer reviews
├── data/
│   └── sampleData.ts   # Sample guide and review data
└── types/
    └── index.ts        # TypeScript type definitions
```

## Key Features Implemented

### Homepage
- Hero section with search functionality
- Advanced search filters
- Featured guides showcase
- How it works explanation
- Customer testimonials

### Guide Discovery
- Comprehensive guide listing
- Real-time filtering by multiple criteria
- Sorting options
- Loading states and empty states
- Responsive grid layout

### Guide Profiles
- Detailed guide information
- Ratings and reviews
- Languages and specializations
- Pricing and availability
- Professional photos (placeholder)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Component-based architecture
- Mobile-first responsive design

## Future Enhancements

- User authentication and profiles
- Real-time messaging between travelers and guides
- Booking system with payment integration
- Review and rating system
- Guide dashboard for managing bookings
- Multi-language support
- Map integration for location-based search
- Photo gallery for guides and tours
- Advanced search with more filters
- Email notifications

## Deployment

This project can be deployed on Vercel, Netlify, or any platform that supports Next.js:

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for demonstration purposes. Feel free to use and modify as needed.

---

Built with ❤️ for connecting travelers with amazing local guides.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
