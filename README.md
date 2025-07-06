# Lynt - Modern Linktree Alternative

> A beautiful, full-stack link-in-bio platform that lets you create stunning profile pages with drag-and-drop link management, themes, and analytics.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.11.1-2D3748?logo=prisma)](https://www.prisma.io/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.2.12-green)](https://www.better-auth.com/)

## ✨ Features

### 🔐 **Authentication & Security**

- Secure user registration and login with [Better Auth](https://www.better-auth.com/)
- Session management and protected routes
- Email/password authentication with form validation

### 🎨 **Beautiful User Interface**

- Modern, responsive design using [shadcn/ui](https://ui.shadcn.com/) components
- Dark/light theme support with system preference detection
- Mobile-first design optimized for all devices
- Smooth animations and transitions with Framer Motion

### 🔗 **Advanced Link Management**

- **Drag & Drop Reordering**: Intuitive link reordering with React DND
- **CRUD Operations**: Add, edit, delete, and toggle link visibility
- **Rich Link Data**: Custom titles, descriptions, icons, and URLs
- **Click Tracking**: Monitor link engagement and performance
- **Bulk Operations**: Manage multiple links efficiently

### 👤 **Profile Customization**

- Personalized profile pages with custom usernames
- Avatar upload and profile information management
- Public profile pages accessible at `/[username]`
- Profile analytics and visitor tracking

### 🎭 **Theme System**

- Built-in dark and light themes
- System preference detection
- Smooth theme transitions
- Customizable color schemes

### 📊 **Analytics & Insights**

- Link click tracking and analytics
- Profile view statistics
- Performance monitoring dashboard
- Diagnostic tools for troubleshooting

### �️ **Developer Experience**

- Comprehensive error handling and validation
- Type-safe API with Zod schemas
- Robust drag-and-drop with conflict resolution
- Debug utilities and diagnostic tools
- Extensive documentation

## 🚀 Tech Stack

**Frontend**

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Drag & Drop**: [React DND](https://react-dnd.github.io/react-dnd/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

**Backend**

- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **API**: Next.js API routes with TypeScript
- **Validation**: Zod schemas for type-safe validation

**Developer Tools**

- **Code Quality**: ESLint, TypeScript strict mode
- **Database Tools**: Prisma Studio, migrations
- **Development**: Hot reload, TypeScript IntelliSense
- **Build Tool**: Next.js with Turbopack

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Git

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/lynt.git
   cd lynt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration:

   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # Authentication
   BETTER_AUTH_SECRET="your-secure-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"

   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NODE_ENV="development"
   ```

4. **Initialize the database**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Alternative Setup Scripts

For Windows users:

```powershell
.\setup-dev.ps1
```

For Unix/Linux/macOS:

```bash
chmod +x setup-dev.sh
./setup-dev.sh
```

## 📁 Project Structure

```
lynt/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication group
│   │   ├── signin/page.tsx      # Sign-in page
│   │   └── signup/page.tsx      # Registration page
│   ├── api/                     # API routes
│   │   ├── auth/[...auth]/      # Better Auth endpoints
│   │   └── links/diagnose/      # Link diagnostic API
│   ├── dashboard/page.tsx       # User dashboard
│   ├── profile/page.tsx         # Profile management
│   ├── [userId]/page.tsx        # Public profile pages
│   ├── demo/page.tsx           # Demo showcase
│   └── typography/page.tsx      # Typography showcase
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── links/                   # Link management components
│   │   ├── LinkList.tsx        # Drag-and-drop link list
│   │   ├── DraggableLink.tsx   # Individual draggable link
│   │   └── LinkDialog.tsx      # Link creation/editing modal
│   ├── form/                    # Authentication forms
│   ├── navigation/              # Navigation components
│   ├── profile/                 # Profile components
│   └── providers/               # Context providers
│
├── lib/                         # Utility libraries
│   ├── actions/                 # Server actions
│   │   ├── link.action.ts      # Link CRUD operations
│   │   ├── auth.action.ts      # Authentication actions
│   │   └── profile.action.ts   # Profile management
│   ├── schemas/                 # Zod validation schemas
│   ├── utils/                   # Diagnostic utilities
│   ├── auth.ts                 # Better Auth configuration
│   └── prisma.ts               # Database client
│
├── prisma/                      # Database
│   ├── schema.prisma           # Database schema
│   ├── migrations/             # Migration files
│   └── dev.db                  # SQLite database
│
├── docs/                        # Documentation
│   ├── LINK_MANAGEMENT.md      # Link system docs
│   ├── LINK_ORDERING.md        # Drag-and-drop docs
│   ├── UNIQUE_CONSTRAINT_FIX.md # Database fixes
│   └── LINK_REORDERING_FIXES.md # Bug fix documentation
│
└── public/                      # Static assets
    ├── logo.svg                # App logo
    └── logo.png                # App icon
```

## 🎯 Key Features Deep Dive

### Drag & Drop Link Management

- **React DND Integration**: Smooth, accessible drag-and-drop reordering
- **Optimistic Updates**: Immediate UI feedback with server confirmation
- **Conflict Resolution**: Handles database unique constraint issues
- **Error Recovery**: Automatic state reversion on failures
- **Debug Tools**: Development logging and diagnostic utilities

### Authentication System

- **Better Auth**: Modern, secure authentication
- **Form Validation**: Client and server-side validation with Zod
- **Session Management**: Persistent, secure user sessions
- **Protected Routes**: Middleware-based route protection

### Database Architecture

- **Prisma ORM**: Type-safe database operations
- **SQLite**: Lightweight, zero-configuration database
- **Migrations**: Version-controlled schema changes
- **Relationships**: Proper foreign key constraints

## 🧪 Testing & Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma migrate dev # Run migrations
```

### Debug Tools

- **Link Ordering Diagnostic**: `/api/links/diagnose` endpoint
- **Console Logging**: Development-mode debug output
- **Test Scripts**: Browser console testing utilities
- **Database Tools**: Prisma Studio for data inspection

## 🚧 Development Status

### ✅ Completed Features

- [x] User authentication (registration/login)
- [x] Secure session management
- [x] Beautiful, responsive UI with dark/light themes
- [x] Drag-and-drop link reordering with conflict resolution
- [x] Complete link CRUD operations
- [x] Public profile pages
- [x] Profile customization
- [x] Click tracking and analytics
- [x] Error handling and validation
- [x] Debug tools and diagnostics
- [x] Comprehensive documentation

### 🔮 Future Enhancements

- [ ] Advanced analytics dashboard
- [ ] Custom themes and branding
- [ ] Image uploads for avatars and link icons
- [ ] Social media integrations
- [ ] QR code generation
- [ ] Custom domains
- [ ] Team collaboration features
- [ ] API for third-party integrations

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/yourusername/lynt.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes** and test thoroughly
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** with a clear description

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas for Contribution

- 🐛 **Bug fixes**: Help improve stability and reliability
- ✨ **New features**: Enhance functionality and user experience
- 📚 **Documentation**: Improve guides, examples, and API docs
- 🎨 **UI/UX**: Design improvements and accessibility enhancements
- 🔧 **Performance**: Optimization and efficiency improvements
- 🧪 **Testing**: Expand test coverage and quality

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to the amazing open-source projects that make Lynt possible:

- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library
- **[Prisma](https://www.prisma.io/)** - Next-generation database toolkit
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React DND](https://react-dnd.github.io/react-dnd/)** - Drag and drop for React
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Lucide](https://lucide.dev/)** - Beautiful & consistent icon toolkit

## 🔗 Links

- **Demo**: [View Live Demo](https://your-demo-url.com)
- **Documentation**: [Full Documentation](./docs/)
- **Issues**: [Report a Bug](https://github.com/yourusername/lynt/issues)
- **Discussions**: [Join the Community](https://github.com/yourusername/lynt/discussions)

---

<div align="center">

**Built with ❤️ using modern web technologies**

[⭐ Star this project](https://github.com/yourusername/lynt) • [🐛 Report Bug](https://github.com/yourusername/lynt/issues) • [💡 Request Feature](https://github.com/yourusername/lynt/issues)

</div>
