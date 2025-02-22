# Security Policy

## Supported Versions

Look, we're trying our best here. Generally, only the latest version gets
security updates.

| Version  | Supported          |
| -------- | ------------------ |
| Latest   | :white_check_mark: |
| < Latest | :x:                |

## Reporting a Vulnerability

Found a security issue? Great (well, not great, but you know what I mean).

### Do:

1. Go to the Security tab
2. Click "Report a vulnerability"
3. Give us details about what's broken
4. Wait patiently
5. Don't tell the bad guys

### Don't:

1. Create a public issue
2. Post about it on Twitter
3. Try to hack our users
4. Demand a bounty (we're broke)

### What to Expect

-   We'll try to respond within 48 hours
-   We'll probably panic a bit
-   We'll try to fix it ASAP
-   We'll credit you (unless you don't want us to)

### Priority Levels

-   **Critical**: Bot token leaked, RCE, etc.
    -   Response: Drop everything and fix it
    -   Timeline: ASAP
-   **High**: Auth bypass, data exposure
    -   Response: Pretty urgent
    -   Timeline: 24-48 hours
-   **Medium**: Rate limiting issues, spam potential
    -   Response: Important but not urgent
    -   Timeline: Within a week
-   **Low**: Aesthetic issues, minor optimizations
    -   Response: When we get to it
    -   Timeline: Eventually™

## Security Best Practices

If you're using this template:

1. **Bot Token**

    - Keep it secret
    - Keep it safe
    - Rotate it if leaked
    - Don't commit it (yes, people still do this)

2. **Dependencies**

    - Keep them updated
    - Check for vulnerabilities (`npm audit`)
    - Don't install sketchy packages
    - Yes, even if they have cool icons

3. **Permissions**

    - Use the minimum required
    - Don't ask for admin
    - Seriously, don't ask for admin
    - Did we mention not to ask for admin?

4. **Environment Variables**

    - Use .env files
    - Don't commit them
    - Keep production secrets separate
    - Rotate them regularly

5. **Code**
    - Validate input
    - Sanitize output
    - Don't eval() user input
    - Don't use deprecated features

## Known Issues

-   Your bot might become self-aware
-   It might develop feelings
-   It might judge your code
-   It might be right

## Acknowledgments

Thanks to:

-   People who report issues
-   People who fix issues
-   People who create issues (unintentionally)
-   Coffee

Remember: Security is like a joke - if you have to explain it, it's probably
bad.

