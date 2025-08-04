# 🚀 Template - Robust Environment Setup

A comprehensive, production-ready template for modern web applications with strong type safety, scalable configuration, and best practices.

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-setup)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Contributing](#-contributing)

## ✨ Features

### 🔒 Type Safety & Developer Experience
- **TypeScript** with strict configuration
- **Zod** for runtime environment validation
- **ESLint** with comprehensive rules
- **Prettier** for consistent formatting
- **Husky** for git hooks

### 🏗️ Architecture & Scalability
- **Modular configuration** for different environments
- **Path aliases** for clean imports
- **Feature flags** system
- **Error boundaries** and proper error handling

### 🧪 Testing
- **Jest** for unit testing
- **React Testing Library** for component testing
- **Playwright** for E2E testing
- **Coverage reporting** with thresholds

### 🚀 Deployment & DevOps
- **Docker** support with multi-stage builds
- **GitHub Actions** CI/CD pipeline
- **Environment-specific** configurations
- **Security scanning** and vulnerability checks

### 🔧 Development Tools
- **Hot reload** in development
- **Bundle analyzer** for optimization
- **Pre-commit hooks** for code quality
- **Comprehensive logging**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+ (recommended) or npm 8+
- Git

### Installation

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd template
   pnpm install
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Validate environment**
   ```bash
   pnpm run env:validate
   ```

4. **Start development**
   ```bash
   pnpm run dev
   ```

## 🔧 Environment Setup

### Environment Files

| File | Purpose | When to use |
|------|---------|-------------|
| `.env.example` | Template with all variables | Reference for required variables |
| `.env.local` | Local development | Development on your machine |
| `.env.development` | Development environment | Shared development settings |
| `.env.production` | Production environment | Production deployment |
| `.env.test` | Testing environment | Running tests |

### Environment Variables

#### Required Variables
```bash
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

#### Optional Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

# Analytics
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Feature Flags
FEATURE_FLAG_NEW_UI=false
FEATURE_FLAG_BETA_FEATURES=false
```

### Environment Validation

The project includes runtime environment validation using Zod:

```bash
# Validate current environment
pnpm run env:validate

# Environment will be validated automatically on:
# - Application start
# - Build process
# - CI/CD pipeline
```

## 💻 Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run start` | Start production server |
| `pnpm run lint` | Run ESLint |
| `pnpm run lint:fix` | Fix ESLint issues |
| `pnpm run format` | Format code with Prettier |
| `pnpm run type-check` | Run TypeScript type checking |
| `pnmp run test` | Run unit tests |
| `pnpm run test:watch` | Run tests in watch mode |
| `pnpm run test:coverage` | Run tests with coverage |
| `pnpm run test:e2e` | Run E2E tests |

### Code Quality

The project enforces code quality through:

- **Pre-commit hooks** that run linting and formatting
- **Pre-push hooks** that run tests
- **CI pipeline** that validates everything

### Path Aliases

Use clean imports with configured path aliases:

```typescript
// Instead of: import { Button } from '../../../components/ui/Button'
import { Button } from '@/components/ui/Button'
import { config } from '@/config'
import { User } from '@/types'
```

Available aliases:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/utils/*` → `./src/utils/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/types/*` → `./types/*`
- `@/config/*` → `./config/*`

## 🧪 Testing

### Unit Testing

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run with coverage
pnpm run test:coverage
```

### E2E Testing

```bash
# Run E2E tests
pnpm run test:e2e

# Run E2E tests with UI
pnpm run test:e2e:ui

# Install Playwright browsers (first time)
pnpm exec playwright install
```

### Test Structure

```
tests/
├── setup.ts           # Test configuration
├── utils/             # Test utilities
└── e2e/              # E2E tests
src/
├── __tests__/        # Unit tests
└── components/
    └── __tests__/    # Component tests
```

## 🚀 Deployment

### Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t template .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 template
   ```

3. **Using Docker Compose**
   ```bash
   # Production
   docker-compose up -d
   
   # Development
   docker-compose -f docker-compose.dev.yml up -d
   ```

### Environment-Specific Builds

```bash
# Development build
NODE_ENV=development pnpm run build

# Production build
NODE_ENV=production pnpm run build

# Test build
NODE_ENV=test pnpm run build
```

### CI/CD Pipeline

The GitHub Actions workflow automatically:

1. **Validates** environment and code quality
2. **Tests** unit and E2E tests
3. **Builds** the application
4. **Scans** for security vulnerabilities
5. **Deploys** to staging/production

## 📁 Project Structure

```
project-root/
├── .github/              # GitHub workflows and templates
│   └── workflows/        # CI/CD pipelines
├── .husky/              # Git hooks
├── config/              # Environment configurations
│   ├── development/     # Development config
│   ├── production/      # Production config
│   ├── testing/         # Test config
│   ├── env.ts          # Environment validation
│   └── index.ts        # Main config
├── scripts/             # Build and utility scripts
├── src/                 # Source code
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── lib/           # Utility libraries
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Helper functions
├── tests/              # Test files
│   ├── utils/         # Test utilities
│   └── e2e/          # E2E tests
├── types/             # Global type definitions
├── .env.example       # Environment template
├── .eslintrc.js      # ESLint configuration
├── .prettierrc       # Prettier configuration
├── jest.config.ts    # Jest configuration
├── playwright.config.ts # Playwright configuration
├── tsconfig.json     # TypeScript configuration
├── Dockerfile        # Production Docker image
├── Dockerfile.dev    # Development Docker image
├── docker-compose.yml # Production compose
└── docker-compose.dev.yml # Development compose
```

## ⚙️ Configuration

### TypeScript Configuration

The project uses strict TypeScript settings:

- **Strict mode** enabled
- **No implicit any** 
- **Unused locals/parameters** detection
- **Exact optional properties** 
- **No unchecked indexed access**

### ESLint Rules

Comprehensive linting with:

- TypeScript-specific rules
- React hooks rules
- Import ordering
- Accessibility checks
- Code complexity limits

### Environment-Specific Configs

Each environment has its own configuration:

- **Development**: Debug mode, hot reload, verbose logging
- **Production**: Optimized, analytics enabled, security headers
- **Testing**: Mock data, no analytics, fast timeouts

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
4. **Run tests and linting**
   ```bash
   pnpm run test:ci
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Testing Library Docs](https://testing-library.com/docs)
- [Playwright Documentation](https://playwright.dev)
- [Docker Best Practices](https://docs.docker.com/develop/best-practices)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ for robust, scalable, and maintainable applications.
