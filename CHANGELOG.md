# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive contribution guidelines
- Code of conduct for community
- Issue and pull request templates
- CI/CD automation with GitHub Actions
- Security vulnerability reporting process
- Lighthouse CI for performance monitoring

### Changed
- Improved project structure for open source collaboration
- Enhanced documentation for contributors

## [1.0.0] - 2025-01-01

### Added
- Unicode steganography encoding and decoding
- Three embedding modes: Tail, Interleaved, and ZWJ-aware
- DEFLATE compression for efficient data storage
- AES-GCM encryption with PBKDF2 key derivation
- Real-time text analysis and Unicode visualization
- Dark/light theme support
- Responsive design for mobile and desktop
- Comprehensive test suite
- SEO optimization with Open Graph and Twitter Cards
- Google Analytics integration
- Security headers and performance optimizations

### Features
- **Encoding**: Hide secret messages in plain text using invisible Unicode characters
- **Decoding**: Extract hidden messages with automatic mode detection
- **Analysis**: Comprehensive Unicode text analysis and visualization
- **Security**: Client-side processing with no data transmission
- **Privacy**: All operations happen locally in the browser
- **Performance**: Optimized for speed and efficiency

### Technical Details
- Built with Next.js 14 and React 18
- Styled with Tailwind CSS and shadcn/ui components
- Uses Web Crypto API for encryption
- Implements DEFLATE compression with pako library
- Supports modern browsers with Web Crypto API

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## [0.9.0] - 2024-12-15

### Added
- Initial development version
- Basic steganography functionality
- Core encoding and decoding features

### Changed
- Project structure and organization
- Development workflow improvements

## [0.8.0] - 2024-12-01

### Added
- Project initialization
- Basic Next.js setup
- Initial UI components

---

## Types of Changes

- **Added** for new features
- **Changed** for changes in existing functionality
- **Deprecated** for soon-to-be removed features
- **Removed** for now removed features
- **Fixed** for any bug fixes
- **Security** for vulnerability fixes

## Version Numbering

We use [Semantic Versioning](https://semver.org/) for version numbers:

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

## Release Process

1. Update version numbers in `package.json`
2. Update this changelog with the new version
3. Create a git tag for the version
4. Push the tag to trigger the release workflow
5. GitHub Actions will automatically create a release

## Contributing to Changelog

When contributing to this project, please update this changelog as part of your pull request:

1. Add your changes under the `[Unreleased]` section
2. Use the appropriate change type (Added, Changed, Fixed, etc.)
3. Be descriptive but concise
4. Include issue numbers when relevant (e.g., `Fixed #123`)

## Links

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
