# EJS Demo - Full-Stack Deployment Project

![EJS Demo](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

A comprehensive, deployment-ready web application built with **Node.js**, **Express.js**, **EJS templating**, and **MongoDB**. This project demonstrates modern web development practices, security implementations, and production deployment strategies.

## 🚀 Features

- **Complete Authentication System** - User registration, login, session management
- **Blog Management** - Create, read, update, delete posts with rich content
- **Search Functionality** - Full-text search across posts and content
- **Responsive Design** - Mobile-first approach with Bootstrap 5
- **Security Features** - Password hashing, session security, input validation
- **Real-time Interactions** - Like system, view counting, social sharing
- **Production Ready** - Docker containerization, health checks, monitoring
- **SEO Optimized** - Semantic HTML, meta tags, structured data

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TestEJS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Installation

### Development Setup

```bash
# Install Node.js dependencies
npm install

# Install development dependencies
npm install --only=dev

# Create environment file
cp .env.example .env
```

### Production Setup

```bash
# Install only production dependencies
npm ci --only=production

# Set environment variables
export NODE_ENV=production
export MONGODB_URI=your_mongodb_connection_string
export SESSION_SECRET=your_secure_session_secret
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/ejs-demo

# Security
SESSION_SECRET=your-super-secret-session-key-change-in-production

# Optional: MongoDB Atlas (Cloud Database)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Optional: Redis (Session Store)
# REDIS_URL=redis://localhost:6379
```

### MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod --dbpath /path/to/your/data/directory
```

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

## 🛠️ Development

### Project Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (if implemented)
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Edit code in `src/` directory
   - Add tests for new features
   - Update documentation

3. **Test Changes**
   ```bash
   npm run dev
   # Test in browser at http://localhost:3000
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🚀 Deployment

### Docker Deployment (Recommended)

#### Single Container
```bash
# Build image
docker build -t ejs-demo .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI=your_mongodb_uri \
  -e SESSION_SECRET=your_session_secret \
  ejs-demo
```

#### Docker Compose (Full Stack)
```bash
# Start all services (app + MongoDB + Redis + Nginx)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Cloud Platform Deployment

#### Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set SESSION_SECRET=your_secure_secret

# Deploy
git push heroku main
```

#### DigitalOcean App Platform
1. Connect GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

#### AWS EC2
```bash
# SSH to EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js and MongoDB
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb

# Clone and setup application
git clone your-repo
cd ejs-demo
npm ci --production
npm start
```

#### Netlify/Vercel
- These platforms are for static sites only
- Consider using for frontend-only versions
- Backend needs server-capable platform

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `SESSION_SECRET`
- [ ] Configure production MongoDB (Atlas recommended)
- [ ] Set up SSL/TLS certificates
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Optimize for performance (compression, caching)

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/register` | Show registration form |
| POST | `/users/register` | Create new user account |
| GET | `/users/login` | Show login form |
| POST | `/users/login` | Authenticate user |
| POST | `/users/logout` | End user session |
| GET | `/users/profile` | Show user profile (auth required) |

### Post Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List all posts (paginated) |
| GET | `/posts/create` | Show create post form (auth required) |
| POST | `/posts/create` | Create new post (auth required) |
| GET | `/posts/:id` | Show single post |
| GET | `/posts/:id/edit` | Show edit post form (owner only) |
| PUT | `/posts/:id` | Update post (owner only) |
| DELETE | `/posts/:id` | Delete post (owner only) |
| POST | `/posts/:id/like` | Toggle like on post (auth required) |

### General Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Homepage |
| GET | `/about` | About page |
| GET | `/contact` | Contact page |
| GET | `/search` | Search posts |
| GET | `/health` | Health check endpoint |

## 📁 Project Structure

```
ejs-demo/
├── models/              # Database models (Mongoose schemas)
│   ├── User.js         # User model with authentication
│   └── Post.js         # Post model with relations
├── routes/             # Express route handlers
│   ├── index.js        # Main routes (home, about, search)
│   ├── users.js        # Authentication routes
│   └── posts.js        # Blog post routes
├── views/              # EJS templates
│   ├── partials/       # Reusable template parts
│   │   ├── header.ejs  # Site header and navigation
│   │   └── footer.ejs  # Site footer
│   ├── users/          # User-related pages
│   │   ├── login.ejs   # Login form
│   │   ├── register.ejs # Registration form
│   │   └── profile.ejs # User profile
│   ├── posts/          # Post-related pages
│   │   ├── index.ejs   # Post listing
│   │   ├── show.ejs    # Single post view
│   │   ├── create.ejs  # Create post form
│   │   └── edit.ejs    # Edit post form
│   ├── index.ejs       # Homepage
│   ├── about.ejs       # About page
│   ├── contact.ejs     # Contact page
│   ├── search.ejs      # Search results
│   ├── 404.ejs         # Not found page
│   └── error.ejs       # Error page
├── public/             # Static assets
│   ├── css/
│   │   └── style.css   # Custom styles
│   ├── js/
│   │   └── main.js     # Client-side JavaScript
│   └── images/         # Image assets
├── scripts/            # Deployment and utility scripts
├── server.js           # Main application entry point
├── package.json        # Node.js dependencies and scripts
├── Dockerfile          # Docker container configuration
├── docker-compose.yml  # Multi-container Docker setup
├── nginx.conf          # Nginx reverse proxy configuration
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore patterns
├── healthcheck.js      # Docker health check script
└── README.md           # This file
```

## 🔧 Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **EJS** - Embedded JavaScript templating engine

### Frontend
- **Bootstrap 5** - CSS framework for responsive design
- **Font Awesome** - Icon library
- **Vanilla JavaScript** - Client-side interactivity
- **CSS3** - Modern styling with flexbox and grid

### Authentication & Security
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongo** - MongoDB session store
- **helmet** - Security headers
- **cors** - Cross-origin resource sharing

### Development & Deployment
- **nodemon** - Development auto-reload
- **Docker** - Containerization
- **Nginx** - Reverse proxy and static file serving
- **Redis** - Optional caching and session storage

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Use descriptive commit messages

### Code Style

- Use 2 spaces for indentation
- Use camelCase for variables and functions
- Use PascalCase for classes and constructors
- Add comments for complex logic
- Keep functions small and focused

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you need help or have questions:

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Email**: Contact the development team
- **Community**: Join our Discord/Slack community

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- MongoDB team for the robust database solution
- Express.js community for the flexible web framework
- All contributors who helped improve this project

## 🔮 Roadmap

### Upcoming Features
- [ ] User roles and permissions system
- [ ] File upload functionality for post images
- [ ] Comment system for posts
- [ ] Email notifications
- [ ] Advanced search with filters
- [ ] API rate limiting
- [ ] Comprehensive test suite
- [ ] Performance monitoring dashboard
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA) features

### Technical Improvements
- [ ] GraphQL API option
- [ ] Real-time features with WebSockets
- [ ] Microservices architecture
- [ ] Advanced caching strategies
- [ ] CDN integration for static assets
- [ ] Automated backups
- [ ] Load balancing configuration
- [ ] Advanced monitoring and alerting

---

**Built with ❤️ for learning and demonstration purposes**

*This project showcases modern web development practices and deployment strategies. Feel free to use it as a starting point for your own applications!*
