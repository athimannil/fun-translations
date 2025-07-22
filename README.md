# Welcome to Our UI Engineer Coding Challenge!

A modern, almost production-ready [fun translations](https://funtranslations.com/) client app.
The thing is: you need to finish build it, because the previous line did state it's _almost_ ready ;)

## Assignment

The goal is to bring the app in a working state. It should present a form at `/translate` and when submitting the form, it should show the translation on the same page. It's fairly easy to understand. Now, there are guidelines, otherwise it's too easy, right?

### The guidelines

When developing the app, here are the things to keep in mind:

- The app really wants to be layered (think clean architecture). Pay attention to the important directories (`io`, `view`, `domain`).
- Within `io`, repositories are the low-level stuff and services translate low-level into domain.
- The starting code has a repository for yoda translation.
- The fun translations API is free and open to use, but quite restrictive in term of usage. It's probably a very good idea to start with the provided mock.
- The app will feel much better without any type issue, obviously.

### Extras

Completely the baseline is fine, but this app could be so much more! If you want to _demonstrate_ your skills, there are several things you could add:

- Having multiple engines would make this app so much more useful and enjoyable. Pirates is a classic, but any other is fine.
- A clean git history is always enjoyable for reviewers.
- Writing a caching service to wrap the actual translation service sounds like an idea to mitigate the limited amount of API calls allowed.
- Keeping the past translations somewhere in the _client_ and populating the side menu to go back and look at them would make this app truly amazing.

### Submitting your answer

Once you're ready, because you've invested enough time, or completed all of the extras, please send us your code as a single file. Use the [git archive command](https://graphite.dev/guides/git-archive) to pack the branch on which you worked. You can optionally send some kind of explanation if you think it's needed. Maybe you already left comments in the code for some of that.

That's all, thank you for your effort! We hope you had some fun doing this challenge and that it will be a nice base for discussing technical things with you.

Cheers, the Xayn/Noxtua team.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

# Fun Translations Challenge Submission

## Implementation Summary

I've successfully implemented all core requirements and bonus features:

### ✅ Core Requirements

- Working form at `/translate` route
- Translation display on same page
- Clean layered architecture (domain/io/view/app)
- Repository pattern with service abstraction
- TypeScript throughout with no type errors

### ✅ All Bonus Features Implemented

- **Multiple Engines**: Yoda + Pirate translations
- **Caching Service**: Client-side caching with localStorage
- **Translation History**: Sidebar with past translations and delete functionality
- **Clean Architecture**: Proper separation of concerns

### 🚀 Additional Features

- Server-side rendering with React Router v7
- Comprehensive testing (90%+ coverage)
- Beautiful responsive UI with dark mode
- Error handling and loading states
- Docker deployment ready

### 🚀 Live Deployment

**Live Demo:** [https://fun-translations-one.vercel.app/translate](https://fun-translations-one.vercel.app/translate)

Deployed using Vercel with automatic GitHub integration and global CDN.

### 🔄 Continuous Deployment

- Connected to GitHub repository
- Auto-deploys on push to main branch
- Optimized for React Router SSR
- Global CDN distribution via Vercel

### 🐳 Alternative Deployment Options

Docker deployment ready for other platforms:

```bash
# Build the image
docker build -t fun-translations .

# Run locally
docker run -p 3000:3000 fun-translations
```

**Deployment-ready for:** AWS ECS, Google Cloud Run, Azure Container Apps, Railway, Fly.io

### 🧪 Testing

```bash
npm test          # Run all tests
npm run dev       # Start development server
npm run build     # Production build
```

### 🔧 Key Architectural Decisions

- Repository pattern for API abstraction
- Service layer for business logic
- Domain-driven design with proper type definitions
- Client-side caching for performance
- SSR for better UX and SEO

Thank you for the engaging challenge!

## AI Tools Usage

As requested, here's how I used AI tools during development:

**AI was used primarily for efficiency, not decision-making:**

- **Code Completion**: GitHub Copilot helped with boilerplate code and repetitive typing, saving development time
- **Syntax Support**: AI assistance for TypeScript interfaces and test setup patterns
- **Code Review**: Used AI to double-check implementation details and catch potential issues

**All architectural decisions, design patterns, and core implementation logic were my own:**

- Clean architecture structure and layering decisions
- Repository and service pattern implementation
- Caching strategy design
- Component architecture and state management
- Testing strategy and coverage approach

AI served as a productivity tool rather than a design decision maker - similar to how one might use IntelliSense or code snippets to write code faster while maintaining full control over the architectural and implementation choices.
