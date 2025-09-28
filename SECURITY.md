# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability within Stegmoji, please follow these steps:

### 1. **DO NOT** create a public GitHub issue

Security vulnerabilities should be reported privately to avoid exposing users to potential risks.

### 2. Report the vulnerability

Please report security vulnerabilities by emailing us at: **chimaysonawane57@gmail.com**

Include the following information in your report:

- **Description**: A clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Suggested Fix**: If you have suggestions for fixing the issue
- **Your Contact Information**: So we can follow up with you

### 3. What to expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Investigation**: We will investigate the issue and determine its severity
- **Response**: We will provide a timeline for fixing the issue
- **Credit**: We will credit you in our security advisories (unless you prefer to remain anonymous)

### 4. Response Timeline

- **Critical vulnerabilities**: 24-48 hours
- **High severity**: 3-7 days  
- **Medium severity**: 1-2 weeks
- **Low severity**: 2-4 weeks

## Security Best Practices

### For Users

- **Keep your browser updated**: Use the latest version of your browser
- **Use strong passphrases**: When using encryption features, use strong, unique passphrases
- **Be aware of platform limitations**: Some platforms may strip invisible characters
- **Test on target platforms**: Verify that hidden data survives copy-paste operations

### For Developers

- **Input validation**: Always validate user input
- **Output encoding**: Properly encode output to prevent XSS
- **Dependency updates**: Keep dependencies updated
- **Security headers**: Use appropriate security headers
- **Content Security Policy**: Implement CSP headers

## Security Features

Stegmoji includes several security features:

### Client-Side Processing
- All encoding/decoding happens in the browser
- No data is sent to external servers
- Complete privacy protection

### Encryption
- AES-GCM encryption with 256-bit keys
- PBKDF2 key derivation (100,000 iterations)
- Built-in message authentication

### Input Sanitization
- All user inputs are validated
- XSS protection through proper encoding
- CSRF protection

## Security Headers

Our application includes the following security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Vulnerability Disclosure

When we fix security vulnerabilities, we will:

1. **Create a security advisory** on GitHub
2. **Update the changelog** with security fixes
3. **Credit researchers** who reported the vulnerability
4. **Provide upgrade instructions** for users

## Security Audit

We regularly audit our codebase for security issues:

- **Automated scanning**: GitHub Dependabot and Snyk
- **Manual review**: Regular code reviews
- **Third-party audits**: Periodic security assessments

## Contact

For security-related questions or concerns:

- **Email**: (chinmaysonawane57@gmail.com)[chinmaysonawane57@gmail.com]
- **GitHub Security**: Use GitHub's private vulnerability reporting feature
- **Response Time**: We aim to respond within 48 hours

## Acknowledgments

We thank the security researchers who help keep Stegmoji secure by responsibly disclosing vulnerabilities.

---

**Note**: This security policy is subject to change. We will notify users of any significant changes through our release notes.
