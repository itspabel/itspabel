# Tasfiqul Alam Pabel - Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring an AI-powered chatbot and beautiful animations.

## Features

- 🎨 Modern, responsive design
- 🤖 AI Chatbot powered by DeepSeek R1
- 📱 Mobile-first approach
- 🌙 Dark/Light theme support
- ✨ Smooth animations with Framer Motion
- 📧 Contact form with multiple email providers
- 🔍 SEO optimized
- 📊 Performance optimized

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **AI Integration**: OpenRouter API (DeepSeek R1)
- **Email**: SendGrid / Mailgun / Nodemailer
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter API key (for chatbot functionality)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Edit `.env.local` and add your API keys:
\`\`\`env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required for Chatbot
- `OPENROUTER_API_KEY`: Your OpenRouter API key for the AI chatbot
- `NEXT_PUBLIC_SITE_URL`: Your site URL (for OpenRouter referrer)

### Optional for Email Features
- `EMAIL_USER`: Gmail address for contact form
- `EMAIL_PASS`: Gmail app password
- `SENDGRID_API_KEY`: SendGrid API key (alternative)
- `SENDGRID_FROM_EMAIL`: Verified sender email for SendGrid
- `MAILGUN_API_KEY`: Mailgun API key (alternative)
- `MAILGUN_DOMAIN`: Mailgun domain

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── projects/          # Project pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...               # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add these environment variables in your deployment platform:

- `OPENROUTER_API_KEY`
- `NEXT_PUBLIC_SITE_URL`
- Any email service variables you're using

## Features

### AI Chatbot
- Powered by DeepSeek R1 model via OpenRouter
- Real-time conversations
- Message history
- Copy functionality
- Responsive design

### Contact Form
- Multiple email service integrations
- Form validation
- Success/error handling
- Responsive design

### Portfolio Sections
- Hero section with animations
- About section
- Projects showcase
- Photography gallery
- Client testimonials
- Contact information

## Customization

### Styling
- Edit `app/globals.css` for global styles
- Modify `tailwind.config.ts` for theme customization
- Update color scheme in CSS variables

### Content
- Update personal information in components
- Replace project data in `components/projects.tsx`
- Update social links in `components/contact.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- **Email**: tapabel2021@gmail.com
- **GitHub**: [@itspabel](https://github.com/itspabel)
- **Website**: [tasfiqulalampabel.com](https://tasfiqulalampabel.com)
\`\`\`

Now let's update the API route to use environment variables more securely:
