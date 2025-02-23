# Security Policy

## Supported Versions

Only the latest version receives security updates.

| Version  | Supported          |
| -------- | ------------------ |
| Latest   | :white_check_mark: |
| < Latest | :x:                |

## Reporting a Security Vulnerability

### Proper Channels

1. Use the Security tab
2. Click "Report a vulnerability"
3. Provide detailed information
4. Await response
5. Maintain confidentiality

### Prohibited Actions

1. Creating public issues
2. Sharing vulnerabilities publicly
3. Exploiting vulnerabilities
4. Publishing proof-of-concept code

### Response Process

-   Initial response within 48 hours
-   Regular updates on progress
-   Immediate action on critical issues
-   Credit given upon request

### Priority Levels

**Critical**

-   Token exposure, RCE
-   Response: Immediate
-   Timeline: < 24 hours

**High**

-   Authentication bypass
-   Response: Urgent
-   Timeline: < 48 hours

**Medium**

-   Rate limiting issues
-   Response: Normal
-   Timeline: < 1 week

**Low**

-   Minor optimizations
-   Response: Best effort
-   Timeline: As available

## Security Best Practices

### Token Security

-   Store securely
-   Never commit
-   Rotate if exposed
-   Use environment variables

### Dependencies

-   Regular updates
-   Security audits
-   Trusted sources
-   Version locking

### Permissions

-   Principle of least privilege
-   Regular audits
-   Careful scoping
-   No default admin

### Environment

-   Separate configurations
-   Secure secrets
-   Regular rotation
-   Environment isolation

### Code Security

-   Input validation
-   Output sanitization
-   No eval() usage
-   Updated dependencies

