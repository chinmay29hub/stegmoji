# Contributing to Stegmoji

Thank you for your interest in contributing to Stegmoji! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/stegmoji.git
   cd stegmoji
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug fixes** - Fix issues and improve stability
- **New features** - Add new functionality
- **Documentation** - Improve docs, README, comments
- **Tests** - Add or improve test coverage
- **Performance** - Optimize code and improve speed
- **UI/UX** - Improve user interface and experience
- **Accessibility** - Make the app more accessible
- **Security** - Fix security vulnerabilities

### Contribution Workflow

1. **Create an issue** (if one doesn't exist)
   - Check existing issues first
   - Use appropriate issue templates
   - Provide clear description and steps to reproduce

2. **Fork and branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review of your code
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No merge conflicts
- [ ] Commit messages follow conventional format

### PR Guidelines

- **Title**: Use conventional commit format (e.g., `feat: add dark mode toggle`)
- **Description**: Explain what changes you made and why
- **Link issues**: Reference related issues using `Fixes #123`
- **Screenshots**: Include screenshots for UI changes
- **Testing**: Describe how you tested your changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## Coding Standards

### JavaScript/React

- Use functional components with hooks
- Follow ESLint configuration
- Use TypeScript for new files (optional but encouraged)
- Prefer `const` and `let` over `var`
- Use meaningful variable and function names

### CSS/Styling

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use CSS custom properties for theming
- Keep styles organized and maintainable

### File Organization

```
src/
├── components/     # Reusable UI components
├── lib/           # Utility functions and logic
├── app/           # Next.js app router pages
├── styles/        # Global styles
└── tests/         # Test files
```

### Naming Conventions

- **Files**: kebab-case (`user-profile.jsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions**: camelCase (`getUserData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test steganography.test.js
```

### Writing Tests

- Write tests for new functionality
- Aim for good test coverage
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies

### Test Structure

```javascript
describe('Component/Function Name', () => {
  describe('specific behavior', () => {
    test('should do something specific', () => {
      // Arrange
      const input = 'test input'
      
      // Act
      const result = functionToTest(input)
      
      // Assert
      expect(result).toBe('expected output')
    })
  })
})
```

## Documentation

### Code Documentation

- Add JSDoc comments for functions
- Explain complex logic with comments
- Keep README.md updated
- Document API changes

### JSDoc Example

```javascript
/**
 * Encodes a message using Unicode steganography
 * @param {string} message - The message to encode
 * @param {string} coverText - The cover text to hide the message in
 * @param {Object} options - Encoding options
 * @param {string} options.mode - Embedding mode ('tail', 'interleaved', 'zwj-aware')
 * @param {boolean} options.compress - Whether to compress the message
 * @param {boolean} options.encrypt - Whether to encrypt the message
 * @param {string} options.passphrase - Encryption passphrase
 * @returns {Promise<string>} The encoded text
 */
export async function encode(message, coverText, options = {}) {
  // Implementation
}
```

## Issue Guidelines

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, Node.js version
- **Screenshots**: If applicable

### Feature Requests

When requesting features, please include:

- **Description**: Clear description of the feature
- **Use Case**: Why this feature would be useful
- **Proposed Solution**: How you think it should work
- **Alternatives**: Other solutions you've considered

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

## Getting Help

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Create an issue for bugs or feature requests
- **Documentation**: Check the README and code comments
- **Code Review**: Ask for help in PR comments

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers the project.

---

Thank you for contributing to Stegmoji! 🎉
