# Sociolog - Sociological Survey Website

A web application for conducting sociological surveys with real-time statistics and secure user authentication.

## Features

- User registration and authentication
- Survey creation and management
- Real-time voting statistics
- Secure API endpoints
- Admin panel for survey management
- Live results visualization

## Technical Stack

- Frontend: JavaScript, HTML, CSS
- Backend: Java, Spring Boot
- Database: MySQL
- Security: Spring Security, JWT
- Real-time updates: WebSocket

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Node.js and npm (for frontend development)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sociolog.git
cd sociolog
```

2. Configure the database:
- Create a MySQL database named 'sociolog'
- Update the database credentials in `src/main/resources/application.properties`

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080`

## Security Configuration

The application uses Spring Security with JWT for authentication. Make sure to:

1. Update the JWT secret in `application.properties`
2. Use HTTPS in production
3. Configure proper CORS settings
4. Set up rate limiting

## API Documentation

The API documentation will be available at `http://localhost:8080/swagger-ui.html` when running the application.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 