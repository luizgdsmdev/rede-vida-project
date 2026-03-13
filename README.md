# Rede Vida Project

A comprehensive blood donation platform developed as a final project for an AWS course in partnership with official partner EDN (cloud school). This platform connects blood donors with recipients and blood banks, facilitating life-saving donations through modern web technologies.

## 🏗️ Architecture Overview

This project follows Clean Architecture principles with clear separation of concerns and dependency inversion.

### Backend (Spring Boot + Java 21)

**Technology Stack:**
- **Framework:** Spring Boot 4.0.3
- **Language:** Java 21
- **Database:** H2 (Development), MySQL/PostgreSQL (Production)
- **ORM:** Spring Data JPA with Hibernate
- **Build Tool:** Maven
- **Architecture:** Clean Architecture

**Project Structure:**
```
rede-vida-backEnd/
├── src/main/java/com/redeemvida/rv/
│   ├── RvApplication.java              # Main application entry point
│   ├── domain/                         # Domain Layer (Business Rules)
│   │   ├── entity/                     # Domain entities (pure business objects)
│   │   ├── repository/                 # Repository interfaces (contracts)
│   │   └── service/                    # Domain services (business logic)
│   ├── application/                    # Application Layer (Use Cases)
│   │   ├── dto/                        # Data Transfer Objects
│   │   ├── usecase/                    # Use cases / Interactors
│   │   └── service/                    # Application services
│   └── infrastructure/                 # Infrastructure Layer (External)
│       ├── controller/                 # REST Controllers
│       ├── repository/                 # Repository implementations (JPA)
│       ├── config/                     # Spring configurations
│       └── exception/                  # Exception handlers
└── src/main/resources/
    └── application.properties          # Application configuration
```

**Architecture Principles:**
- **Domain Independence:** Business rules are isolated from external concerns
- **Dependency Inversion:** Dependencies point inward toward the domain
- **Testability:** Each layer can be tested independently
- **Flexibility:** Easy to swap implementations (databases, frameworks, etc.)

### Frontend (React + Vite)

**Technology Stack:**
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.3.1
- **Styling:** TailwindCSS 3.4.19
- **Routing:** React Router DOM 7.13.1
- **Internationalization:** i18next 25.8.17
- **Language:** JavaScript (ES6+)

**Project Structure:**
```
rede-vida-UI/
├── src/
│   ├── components/
│   │   ├── pages/                      # Page components
│   │   │   ├── home/                   # Home page
│   │   │   ├── login/                  # Authentication
│   │   │   ├── donateNow/              # Donation flow
│   │   │   ├── about/                  # About page
│   │   │   ├── contact/                # Contact page
│   │   │   ├── location/               # Find donation centers
│   │   │   ├── requirements/          # Donation requirements
│   │   │   └── pageNotFund/            # 404 page
│   │   └── shared/                     # Reusable components
│   │       ├── header/                 # Navigation header
│   │       ├── footer/                 # Page footer
│   │       ├── loading/                # Loading components
│   │       ├── themeToggle/            # Theme switcher
│   │       └── ScrollAnimation/        # Animation utilities
│   ├── locales/                        # Internationalization
│   │   ├── en/                         # English translations
│   │   ├── pt/                         # Portuguese translations
│   │   └── es/                         # Spanish translations
│   ├── assets/                         # Static assets
│   ├── App.jsx                         # Main application component
│   ├── main.jsx                        # Application entry point
│   ├── App.css                         # Global styles
│   └── index.css                       # Base styles
├── public/                             # Public assets
├── package.json                        # Dependencies and scripts
└── vite.config.js                      # Vite configuration
```

**Frontend Features:**
- **Component-Based Architecture:** Modular and reusable components
- **Internationalization:** Multi-language support (EN, PT, ES)
- **Responsive Design:** Mobile-first approach with TailwindCSS
- **Modern Tooling:** Fast development with Vite
- **Routing:** Client-side navigation with React Router

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Maven 3.6+
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd rede-vida-backEnd
mvn clean install
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080`
H2 Console: `http://localhost:8080/h2-console`

### Frontend Setup
```bash
cd rede-vida-UI
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📋 Features

- **Donor Registration:** Easy sign-up process for blood donors
- **Blood Bank Locator:** Find nearby donation centers
- **Appointment Scheduling:** Book donation appointments
- **Emergency Requests:** Urgent blood donation notifications
- **Multi-language Support:** English, Portuguese, and Spanish
- **Mobile Responsive:** Works seamlessly on all devices
- **Real-time Notifications:** Stay updated on donation opportunities

## 🛠️ Development

### Backend Development
- Follow Clean Architecture principles
- Use domain-driven design patterns
- Implement comprehensive unit tests
- Document API endpoints with Swagger/OpenAPI

### Frontend Development
- Component-driven development
- Storybook for component documentation
- ESLint for code quality
- Prettier for code formatting

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Partners

Developed in partnership with EDN (cloud school) as part of an AWS certification course.

---