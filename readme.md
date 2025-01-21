# GadgyHub Application

## Overview
The GadgyHub application is a modern e-commerce platform dedicated to selling electronic products. Built with a React frontend and an Express backend, it offers a seamless user experience and robust backend functionality. This project incorporates advanced technologies like Redis for caching and Cloudinary for image uploads to ensure scalability and performance.

---

## Features

### Backend
- **Image Uploads:** Utilizes Cloudinary for seamless image management and storage.
- **Caching:** Implements Redis to cache products and improve performance.
- **Authentication & Authorization:** Includes JWT-based authentication with support for admin and protected routes.
- **Payment Processing:** Integrates Stripe for secure payment handling.
- **Data Management:** Uses MongoDB with Mongoose for database interactions.
- **Middleware:** Includes middleware for logging (Morgan), parsing cookies, and error handling.

### Frontend
- **React Framework:** Provides a dynamic and responsive user interface.
- **State Management:** Utilizes Zustand for efficient state handling.
- **Animations:** Adds smooth transitions and animations with Framer Motion.
- **Routing:** React Router DOM for seamless navigation.
- **Charts:** Visualizes analytics data using Recharts.
- **Notifications:** Real-time toast notifications with React Hot Toast.
- **Styling:** Built with TailwindCSS for modern and consistent design.
- **Celebrations:** React Confetti is used to enhance the user experience with celebratory animations, such as after successful checkout or milestone achievements.

---

## Technologies Used

### Backend
- **Node.js** with **Express**: Core backend framework.
- **MongoDB** with **Mongoose**: Database and ORM.
- **Redis**: High-performance caching.
- **Cloudinary**: Image hosting and transformations.
- **JWT**: Secure token-based authentication.
- **Stripe**: Payment gateway.

### Frontend
- **React**: Component-based UI library.
- **Vite**: Build tool for fast development.
- **TailwindCSS**: Utility-first CSS framework.
- **Framer Motion**: Animation library.
- **Recharts**: Charting library for data visualization.
- **React Confetti**: Adds interactive and engaging celebratory effects.

### API Testing
- **Postman**: Build tool for fast development.

### MongoDB Compass
- **MongoDB Compass**: Database visualization tool.
---

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB server running
- Redis server running
- Cloudinary account credentials
- Stripe account credentials

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=1234
   MONGO_URI=mongodb+srv://testUser:testPass@cluster0.example.mongodb.net/testDB?retryWrites=true&w=majority
   REDIS_URI=rediss://default:testRedisPass@redis.example.upstash.io:12345
   REDIS_PASSCODE=testRedisPasscode
   REDIS_SERVER_PORT=6379
   ACCESS_TOKEN=testAccessToken123
   REFRESH_TOKEN=testRefreshToken456
   CLOUDINARY_CLOUD_NAME=testCloudName
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET_KEY=testSecretKey123
   STRIPE_SECRET_KEY=sk_test_1234567890abcdef12345678
   CLIENT_URL=http://localhost:5173
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variable:
   ```env
   VITE_BACKEND_URL=http://localhost:1234
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

The detailed API documentation is available [here](./backend/readme.md). Below is a quick overview of the major endpoints:

### Authentication
- POST `/login` - Login a user.
- POST `/register` - Register a new user.
- GET `/profile` - Fetch user profile (protected).

### Products
- GET `/products/featured` - Fetch featured products.
- POST `/products` - Add a new product (admin-only).

### Cart
- GET `/cart` - Fetch cart items (protected).
- POST `/cart` - Add to cart (protected).

### Coupons
- POST `/coupons/validate` - Validate a coupon.

### Payments
- POST `/payment/checkout` - Start a checkout session.

---

## Scripts

### Backend Scripts
- `npm run dev` - Start the backend server in development mode.

### Frontend Scripts
- `npm run dev` - Start the frontend development server.
---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

## License
This project is licensed under the ISC License.

