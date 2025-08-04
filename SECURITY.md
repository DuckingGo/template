# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions of this Next.js template:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| 0.1.x   | :white_check_mark: | Current development version |
| < 0.1   | :x:                | Not supported |

## Framework and Dependencies Security

This template is built on the following stack with their security considerations:

| Component | Version | Security Status |
| --------- | ------- | --------------- |
| Next.js   | 15.x    | :white_check_mark: Latest stable |
| React     | 19.x    | :white_check_mark: Latest stable |
| TypeScript| 5.x     | :white_check_mark: Latest stable |
| Node.js   | 18.x+   | :white_check_mark: LTS versions |

## Security Features

This template includes built-in security features:

- ✅ **Environment Variable Validation** - Runtime validation of environment variables
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Content Security Policy** - Configurable CSP headers
- ✅ **HTTPS Enforcement** - Production HTTPS redirect
- ✅ **Dependency Scanning** - Regular dependency audits
- ✅ **Input Validation** - Zod schema validation
- ✅ **API Rate Limiting** - Configurable rate limits
- ✅ **Secure Headers** - Security headers via Next.js config

## Reporting a Vulnerability

### Where to Report

Please report security vulnerabilities through one of the following channels:

1. **GitHub Security Advisories** (Preferred)
   - Go to the repository's Security tab
   - Click "Report a vulnerability"
   - Fill out the advisory form

2. **Email** (For sensitive issues)
   - Send details to: [kuliah.informatika01@gmail.com]
   - Use GPG key: [Your GPG Key ID] for encrypted communication

3. **Private Issue**
   - Create a private issue in the repository
   - Tag with `security` label

### What to Include

When reporting a vulnerability, please include:

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Potential impact** assessment
- **Suggested fix** (if known)
- **Environment details** (OS, Node.js version, etc.)

### Response Timeline

| Timeline | Action |
| -------- | ------ |
| 24 hours | Initial acknowledgment |
| 72 hours | Preliminary assessment |
| 7 days   | Detailed analysis and response plan |
| 30 days  | Resolution or mitigation |

### What to Expect

**If the vulnerability is accepted:**
- We will work on a fix immediately
- You will be credited in the security advisory (unless you prefer anonymity)
- We will coordinate disclosure timeline with you
- A security patch will be released as soon as possible

**If the vulnerability is declined:**
- We will provide a detailed explanation
- We may suggest alternative solutions or mitigations
- The issue will be closed with reasoning

## Security Best Practices

When using this template, follow these security best practices:

### Environment Variables
```bash
# Use strong, unique values for sensitive data
DATABASE_URL="postgresql://user:password@localhost/db"
NEXTAUTH_SECRET="your-super-secret-key-here"
API_KEY="your-api-key"

# Never commit .env.local or .env.production to version control
```

### API Security
```typescript
// Always validate input data
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function POST(request: Request) {
  const body = await request.json()
  const validatedData = userSchema.parse(body) // Throws if invalid
  // ... rest of your code
}
```

### Content Security Policy
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  }
]
```

## Dependencies

### Automatic Security Updates

This template uses:
- **Dependabot** for automated dependency updates
- **npm audit** for vulnerability scanning
- **Snyk** for continuous monitoring (optional)

### Manual Security Checks

Run these commands regularly:

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

## Security Headers

The following security headers are configured by default:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Authentication & Authorization

If implementing authentication:

- Use established libraries (NextAuth.js, Auth0, etc.)
- Implement proper session management
- Use HTTPS in production
- Implement rate limiting
- Validate all user inputs
- Use secure password hashing (bcrypt, argon2)

## Deployment Security

### Vercel (Recommended)
- Automatic HTTPS
- Environment variable encryption
- DDoS protection
- Edge runtime security

### Self-Hosted
```dockerfile
# Use non-root user in Docker
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
```

## Security Checklist

Before deploying to production:

- [ ] All environment variables are properly set
- [ ] No sensitive data in client-side code
- [ ] HTTPS is enforced
- [ ] Security headers are configured
- [ ] Dependencies are up to date
- [ ] Input validation is implemented
- [ ] Error messages don't leak sensitive information
- [ ] Logging doesn't include sensitive data
- [ ] Rate limiting is configured
- [ ] CORS is properly configured

## Contact

For security-related questions or concerns:
- Security Team: [kuliah.informatika01@gmail.com]
- General Questions: [Create an issue](../../issues/new)
- Documentation: [Wiki](../../wiki)

## Acknowledgments

We thank the following for their security contributions:
- [Security researcher name] - [Vulnerability description]
- [Community member] - [Security improvement]

---

**Note**: This security policy is specific to the template code. When building your application, ensure you implement additional security measures appropriate for your use case.
