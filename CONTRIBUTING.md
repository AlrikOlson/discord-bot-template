# Contributing Guidelines

Thank you for considering contributing to this project. Here's how you can help.

## Standards

1. Follow the code style guidelines
2. Write meaningful commit messages
3. Maintain test coverage
4. Update documentation
5. Follow security best practices

## Development Process

1. Fork the repository
2. Create your feature branch
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Develop your changes
4. Test thoroughly
5. Ensure code quality
    ```bash
    npm run lint
    ```
6. Commit with conventional format
    ```bash
    git commit -m "feat: add new feature"
    ```
7. Push to your fork
    ```bash
    git push origin feature/your-feature-name
    ```
8. Submit a Pull Request

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/)
specification.

Format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

-   `feat`: New feature
-   `fix`: Bug fix
-   `docs`: Documentation
-   `style`: Code style changes
-   `refactor`: Code refactoring
-   `perf`: Performance improvements
-   `test`: Adding/fixing tests
-   `chore`: Maintenance tasks

Example:

```
feat(commands): implement user profile command

Add ability to view user profiles with detailed information.

Closes #123
```

## Pull Request Process

1. Update documentation
2. Update version numbers
3. Ensure CI passes
4. Obtain code review
5. Address feedback
6. Await approval
7. Merge upon approval

## Code Style

-   ESLint configuration provided
-   Prettier formatting
-   EditorConfig settings
-   4-space indentation
-   Single quotes
-   Semicolons required

Run:

```bash
npm run lint
```

## Questions?

1. Check existing documentation
2. Review open issues
3. Create a new issue
4. Join our Discord community

## Final Notes

-   Main branch is protected
-   Security is paramount
-   Tests are required
-   Documentation is essential

Thank you for contributing!

