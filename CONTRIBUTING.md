# Contributing

So you want to contribute? Fine. Here's how to not mess it up.

## Ground Rules

1. Don't be a jerk
2. Write decent commit messages
3. Follow the style guide (or ESLint will yell at you)
4. Test your stuff
5. Document your stuff (future you will thank you)

## Development Process

1. Fork the repo
2. Create a branch
    ```bash
    git checkout -b feature/something-awesome
    ```
3. Write your code
4. Make sure it works
5. Make sure ESLint is happy
    ```bash
    npm run lint
    ```
6. Commit your changes

    ```bash
    git commit -m "feat: added something awesome"
    ```

    Yes, we use conventional commits. Deal with it.

7. Push to your fork
    ```bash
    git push origin feature/something-awesome
    ```
8. Create a Pull Request

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/). Why?
Because:

-   It makes the changelog readable
-   It makes version bumps automatic
-   It makes you look professional

Format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

-   `feat`: New feature
-   `fix`: Bug fix
-   `docs`: Documentation only
-   `style`: Code style changes
-   `refactor`: Code changes that neither fix bugs nor add features
-   `perf`: Performance improvements
-   `test`: Adding or fixing tests
-   `chore`: Maintenance stuff

Example:

```
feat(commands): add ability to pat the bot

Because everyone needs headpats.

Closes #42
```

## Pull Request Process

1. Update the README.md if needed
2. Update the version number if needed
3. Make sure CI passes
4. Get someone to review your code
5. Wait
6. Wait some more
7. Maybe ping someone
8. Get merged (hopefully)

## Code Style

-   We use ESLint
-   We use Prettier
-   We use EditorConfig
-   We use 4 spaces (fight me)
-   We use single quotes
-   We use semicolons

Just run:

```bash
npm run lint
```

And fix what it complains about.

## Questions?

1. Check the README
2. Check the docs
3. Check the issues
4. Ask in Discord
5. Figure it out yourself

## Final Notes

-   Don't commit directly to main
-   Don't commit sensitive data
-   Don't commit node_modules
-   Don't be that person who breaks the build

Thanks for contributing! Or at least thinking about it.

