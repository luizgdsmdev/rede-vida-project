# Contributing Guide

## Overview

Thank you for your interest in contributing to the Rede Vida Project! This guide provides comprehensive information on how to contribute to our blood donation platform. We welcome contributions of all types, including code, documentation, bug reports, and feature suggestions.

## How to Contribute

### Ways to Contribute

1. **Report Bugs**: Help us identify and fix issues
2. **Suggest Features**: Propose new features and improvements
3. **Submit Pull Requests**: Contribute code and documentation
4. **Improve Documentation**: Help us keep documentation up-to-date
5. **Answer Questions**: Help other contributors in discussions
6. **Review Code**: Provide constructive feedback on pull requests

### Getting Started

1. **Fork the Repository**: Click the "Fork" button on GitHub
2. **Clone Your Fork**: Clone your fork to your local machine
3. **Set Up Development Environment**: Follow the setup instructions
4. **Create a Branch**: Create a feature branch for your changes
5. **Make Changes**: Implement your contribution
6. **Test Your Changes**: Ensure everything works correctly
7. **Submit Pull Request**: Open a pull request for review

## Development Setup

### Prerequisites

- **Java 21+**: For backend development
- **Node.js 18+**: For frontend development
- **Maven 3.6+**: Build tool for backend
- **Docker Desktop**: For containerized development
- **Git**: Version control

### Local Development Setup

```bash
# 1. Clone your fork
git clone https://github.com/your-username/rede-vida-project.git
cd rede-vida-project

# 2. Add upstream repository
git remote add upstream https://github.com/original-owner/rede-vida-project.git

# 3. Start development environment
docker-compose up --build

# 4. Access the application
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
# API Documentation: http://localhost:8080/swagger-ui.html
```

### Environment Variables

```bash
# Database Configuration
POSTGRES_DB=rede_vida
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432

# Spring Boot Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://postgis:5432/rede_vida
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
```

### Development Workflow

```bash
# 1. Create and switch to a new branch
git checkout -b feature/your-feature-name

# 2. Make your changes
# Edit files, add new features, fix bugs, etc.

# 3. Test your changes
cd rede-vida-backEnd && ./mvnw test
cd ../rede-vida-UI && npm test

# 4. Commit your changes
git add .
git commit -m "feat: add new feature description"

# 5. Push to your fork
git push origin feature/your-feature-name

# 6. Create a pull request
# Visit GitHub and create a pull request from your branch
```

## Code Standards

### Backend (Java/Spring Boot)

#### Code Style

We follow Google Java Style Guide with some modifications:

```java
// Package declaration
package com.redeemvida.rv.infrastructure.controller;

// Imports (grouped and sorted)
import com.redeemvida.rv.application.usecase.UserService;
import com.redeemvida.rv.domain.dto.UserCreateDTO;
import com.redeemvida.rv.domain.dto.UserResponseDTO;

// Class documentation
/**
 * Controller for managing user operations.
 * 
 * @author Your Name
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {

    // Constants
    private static final String USER_NOT_FOUND = "User not found";
    
    // Dependencies (injected via constructor)
    private final UserService userService;

    // Constructor injection
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Methods with proper documentation
    /**
     * Creates a new user.
     * 
     * @param userCreateDTO the user creation data
     * @return the created user
     */
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(
            @Valid @RequestBody UserCreateDTO userCreateDTO) {
        UserResponseDTO createdUser = userService.createUser(userCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}
```

#### Naming Conventions

- **Classes**: PascalCase (e.g., `UserController`, `UserService`)
- **Methods**: camelCase (e.g., `createUser`, `findById`)
- **Variables**: camelCase (e.g., `userService`, `userDto`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `USER_NOT_FOUND`)
- **Packages**: lowercase with dots (e.g., `com.redeemvida.rv.controller`)

#### Testing Standards

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("Should create user successfully")
    void shouldCreateUserSuccessfully() {
        // Given
        UserCreateDTO userCreateDTO = new UserCreateDTO(
            "John Doe", 
            "john.doe@example.com", 
            "O+"
        );
        
        User expectedUser = new User();
        expectedUser.setName("John Doe");
        expectedUser.setEmail("john.doe@example.com");
        expectedUser.setBloodType("O+");
        
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);

        // When
        UserResponseDTO result = userService.createUser(userCreateDTO);

        // Then
        assertThat(result.getName()).isEqualTo("John Doe");
        assertThat(result.getEmail()).isEqualTo("john.doe@example.com");
        verify(userRepository).save(any(User.class));
    }
}
```

### Frontend (React/JavaScript)

#### Code Style

We follow Airbnb JavaScript Style Guide:

```jsx
// Component structure
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Button from '../shared/button/Button';
import Loading from '../shared/loading/Loading';

/**
 * User profile component
 * @param {Object} props - Component props
 * @param {string} props.userId - User ID
 */
function UserProfile({ userId }) {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUserById(userId);
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Loading />;
  if (error) return <div className="error">{t('errors.general')}</div>;
  if (!user) return <div className="not-found">{t('user.notFound')}</div>;

  return (
    <div className="user-profile">
      <h2 className="user-profile__name">{user.name}</h2>
      <p className="user-profile__email">{user.email}</p>
      <Button onClick={() => handleEdit(user.id)}>
        {t('actions.edit')}
      </Button>
    </div>
  );
}

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};

UserProfile.defaultProps = {
  userId: '',
};

export default UserProfile;
```

#### Component Structure

```
components/
├── shared/
│   ├── button/
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   ├── Button.test.jsx
│   │   └── index.js
│   └── loading/
│       ├── Loading.jsx
│       ├── Loading.css
│       ├── Loading.test.jsx
│       └── index.js
└── pages/
    └── profile/
        ├── Profile.jsx
        ├── Profile.css
        ├── Profile.test.jsx
        └── index.js
```

#### Testing Standards

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';

import UserProfile from './UserProfile';

// Test wrapper
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  </BrowserRouter>
);

describe('UserProfile Component', () => {
  const mockUserId = 'test-user-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(
      <TestWrapper>
        <UserProfile userId={mockUserId} />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('renders user data when loaded', async () => {
    const mockUser = {
      id: mockUserId,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);

    render(
      <TestWrapper>
        <UserProfile userId={mockUserId} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
  });
});
```

## Commit Guidelines

### Commit Message Format

We follow Conventional Commits specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples

```bash
feat(users): add user registration endpoint
fix(api): resolve null pointer exception in user service
docs(readme): update installation instructions
style(frontend): fix linting errors in button component
refactor(database): optimize user query performance
test(backend): add unit tests for user service
chore(deps): update spring boot version
```

### Commit Message Guidelines

1. **Use the present tense**: "add feature" not "added feature"
2. **Use the imperative mood**: "move cursor to..." not "moves cursor to..."
3. **Limit the subject line to 50 characters**
4. **Capitalize the subject line**
5. **Do not end the subject line with a period**
6. **Use the body to explain what and why vs. how**
7. **Wrap the body at 72 characters**

## Bug Reports

### Bug Report Template

```markdown
**Bug Description**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear and concise description of what you expected to happen.

**Actual Behavior**
A clear and concise description of what actually happened.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment**
- OS: [e.g. Windows 10, macOS 12.0, Ubuntu 20.04]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]

**Additional Context**
Add any other context about the problem here.
```

### Bug Reporting Guidelines

1. **Search existing issues**: Check if the bug has already been reported
2. **Use the template**: Fill out all sections of the bug report template
3. **Be specific**: Provide detailed information about the issue
4. **Include steps to reproduce**: Make it easy for us to reproduce the issue
5. **Provide environment details**: Include OS, browser, and version information

## Feature Requests

### Feature Request Template

```markdown
**Feature Description**
A clear and concise description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve? What pain points does it address?

**Proposed Solution**
How do you envision this feature working? What would the user experience be?

**Alternatives Considered**
What other approaches have you considered? Why did you choose this one?

**Additional Context**
Add any other context, mockups, or examples about the feature request.
```

### Feature Request Guidelines

1. **Search existing requests**: Check if the feature has already been requested
2. **Use the template**: Fill out all sections of the feature request template
3. **Explain the problem**: Clearly explain what problem this feature solves
4. **Provide context**: Include any relevant background information
5. **Be realistic**: Consider the scope and complexity of the feature

## Pull Request Process

### Pull Request Template

```markdown
**Description**
Brief description of changes made in this pull request.

**Type of Change**
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

**Testing**
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing completed (for frontend changes)

**Checklist**
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules
```

### Pull Request Guidelines

1. **Use descriptive titles**: Make it clear what the PR does
2. **Link to issues**: Reference any related issues
3. **Include tests**: Ensure your changes are properly tested
4. **Update documentation**: Keep documentation up-to-date
5. **Keep PRs focused**: One PR should address one issue or feature
6. **Respond to feedback**: Address reviewer comments promptly

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and checks
2. **Code Review**: Maintainers review the code for quality and correctness
3. **Approval**: At least one maintainer must approve the PR
4. **Merge**: PR is merged after approval and all checks pass

## Testing Guidelines

### Backend Testing

#### Unit Tests

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=UserServiceTest

# Run tests with coverage
./mvnw jacoco:report

# Run integration tests
./mvnw test -Pintegration-test
```

#### Test Coverage

- **Minimum coverage**: 80% for new code
- **Critical paths**: 100% coverage required
- **Business logic**: High coverage priority
- **Utility classes**: High coverage priority

### Frontend Testing

#### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- UserProfile.test.jsx
```

#### Test Types

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test user workflows (planned)

### Testing Best Practices

1. **Write tests before code** (TDD when possible)
2. **Test edge cases and error conditions**
3. **Keep tests simple and focused**
4. **Use descriptive test names**
5. **Mock external dependencies**
6. **Maintain test independence**

## Documentation Guidelines

### Code Documentation

#### Java Documentation

```java
/**
 * Service for managing user operations.
 * 
 * <p>This service provides methods for creating, updating, and retrieving users.
 * It follows the business rules defined in the domain layer.</p>
 * 
 * @author Your Name
 * @version 1.0.0
 * @since 1.0.0
 */
@Service
public class UserService {
    
    /**
     * Creates a new user.
     * 
     * @param userCreateDTO the user creation data
     * @return the created user
     * @throws BusinessException if user with email already exists
     */
    public UserResponseDTO createUser(UserCreateDTO userCreateDTO) {
        // Implementation
    }
}
```

#### JavaScript Documentation

```jsx
/**
 * User profile component
 * 
 * Displays user information and provides options to edit profile.
 * Automatically fetches user data when component mounts.
 * 
 * @param {Object} props - Component props
 * @param {string} props.userId - The ID of the user to display
 * @param {Function} props.onEdit - Callback function when edit button is clicked
 * @returns {JSX.Element} The user profile component
 */
function UserProfile({ userId, onEdit }) {
  // Implementation
}
```

### README Documentation

- **Keep it up-to-date**: Update documentation when code changes
- **Be comprehensive**: Include all necessary information
- **Use examples**: Provide code examples where helpful
- **Include screenshots**: Add visual documentation for UI components
- **Link to resources**: Reference other documentation as needed

## Internationalization

### Adding New Translations

1. **Add translation keys** to all language files:

```json
// locales/en/common.json
{
  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete"
  }
}

// locales/pt/common.json
{
  "buttons": {
    "save": "Salvar",
    "cancel": "Cancelar",
    "delete": "Excluir"
  }
}

// locales/es/common.json
{
  "buttons": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar"
  }
}
```

2. **Use translations in components**:

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <button>{t('buttons.save')}</button>
  );
}
```

### Translation Guidelines

1. **Use descriptive keys**: Use meaningful key names
2. **Group related translations**: Organize keys by feature
3. **Provide context**: Include comments for complex translations
4. **Test all languages**: Ensure UI works correctly in all supported languages
5. **Consider text length**: Account for text expansion in different languages

## Security Guidelines

### Secure Coding Practices

1. **Input validation**: Validate all user inputs
2. **SQL injection prevention**: Use parameterized queries
3. **XSS prevention**: Sanitize user-generated content
4. **Authentication**: Implement proper authentication mechanisms
5. **Authorization**: Check user permissions for sensitive operations
6. **Data encryption**: Encrypt sensitive data at rest and in transit

### Security Checklist

- [ ] No hardcoded secrets or credentials
- [ ] Proper input validation implemented
- [ ] SQL injection vulnerabilities addressed
- [ ] XSS vulnerabilities addressed
- [ ] Authentication and authorization implemented
- [ ] Sensitive data encrypted
- [ ] Dependencies are up-to-date
- [ ] Security headers configured

## Release Process

### Versioning

We follow Semantic Versioning (SemVer):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

1. **Code Review**: All changes reviewed and approved
2. **Tests**: All tests passing
3. **Documentation**: Documentation updated
4. **Security**: Security review completed
5. **Performance**: Performance testing completed
6. **Changelog**: Update CHANGELOG.md
7. **Version bump**: Update version numbers
8. **Tag**: Create release tag
9. **Deploy**: Deploy to production

## Getting Help

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and discussions
- **Email**: For private or sensitive matters

### Resources

- **Project Documentation**: [docs/](./)
- **API Documentation**: [API.md](./API.md)
- **Backend Documentation**: [BACKEND.md](./BACKEND.md)
- **Frontend Documentation**: [FRONTEND.md](./FRONTEND.md)
- **Database Documentation**: [DATABASE.md](./DATABASE.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

## Recognition

### Contributor Recognition

We value all contributions and recognize contributors in various ways:

1. **Contributors List**: All contributors are listed in our README
2. **Release Notes**: Contributors are mentioned in release notes
3. **Hall of Fame**: Significant contributors are highlighted in our documentation
4. **Community Recognition**: Outstanding contributors may receive special recognition

### Types of Contributions

All contributions are valuable, including:

- **Code contributions**: New features, bug fixes, performance improvements
- **Documentation**: Improving documentation, writing guides
- **Testing**: Writing tests, improving test coverage
- **Design**: UI/UX improvements, graphics, icons
- **Community**: Answering questions, reviewing pull requests
- **Translation**: Adding or improving translations

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for everyone, regardless of:

- **Experience level**: From beginners to experts
- **Background**: Personal, professional, or cultural
- **Identity**: Gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality

### Expected Behavior

- **Be respectful**: Treat others with respect and consideration
- **Be inclusive**: Welcome and include all participants
- **Be constructive**: Provide helpful and constructive feedback
- **Be collaborative**: Work together to achieve common goals
- **Be professional**: Maintain professional conduct at all times

### Unacceptable Behavior

- **Harassment**: Any form of harassment is unacceptable
- **Discrimination**: No discrimination of any kind
- **Personal attacks**: No personal attacks or insults
- **Spam**: No spam or irrelevant content
- **Disruption**: No disruptive behavior

### Reporting Issues

If you experience or witness unacceptable behavior, please:

1. **Report privately**: Send a private message to project maintainers
2. **Provide details**: Include specific details about the incident
3. **Be prompt**: Report issues as soon as possible

### Enforcement

Project maintainers reserve the right to:

- **Remove comments**: Remove inappropriate comments
- **Issue warnings**: Issue warnings for inappropriate behavior
- **Temporarily ban**: Temporarily ban repeat offenders
- **Permanently ban**: Permanently ban serious or repeat offenders

---
