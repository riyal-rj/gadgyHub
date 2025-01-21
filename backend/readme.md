# Backend API Documentation

This document provides detailed explanations of the API routes implemented in the backend using Express.js. The routes are grouped by their functionalities, such as analytics, authentication, cart management, coupon management, payment processing, and product management.

---

## 1. Analytics API

**File:** `analytics.router.js`

### Routes:

- **GET `/`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Description:** Fetches analytics data and daily sales data for the past 7 days.
  - **Implementation Details:**
    - Calls `getAnalytics()` to retrieve general analytics data.
    - Calculates the date range (last 7 days) and calls `getDailySalesData(startDate, endDate)`.
    - Returns the data as a JSON response with `analyticsData` and `dailySalesData`.
  - **Error Handling:** Logs errors and responds with a 500 status code if an exception occurs.

---

## 2. Authentication API

**File:** `auth.router.js`

### Routes:

- **POST `/login`**
  - **Controller:** `loginUser`
  - **Description:** Authenticates the user and generates a JWT token.

- **POST `/register`**
  - **Controller:** `registerUser`
  - **Description:** Registers a new user in the system.

- **POST `/logout`**
  - **Controller:** `logoutUser`
  - **Description:** Logs out the user by invalidating the session or token.

- **POST `/refresh`**
  - **Controller:** `refreshToken`
  - **Description:** Refreshes the JWT token for an authenticated user.

- **GET `/profile`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `getUserProfile`
  - **Description:** Fetches the profile details of the authenticated user.

---

## 3. Cart Management API

**File:** `cart.router.js`

### Routes:

- **GET `/`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `getAllProdsFromCart`
  - **Description:** Retrieves all products in the user's cart.

- **POST `/`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `addToCart`
  - **Description:** Adds a product to the user's cart.

- **DELETE `/`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `removeAllFromCart`
  - **Description:** Removes all items from the user's cart.

- **PUT `/:id`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `updateQuantity`
  - **Description:** Updates the quantity of a specific product in the cart using its ID.

- **PATCH `/clear-cartItems`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `clearCartItems`
  - **Description:** Clears all cart items for the user.

---

## 4. Coupon Management API

**File:** `coupon.router.js`

### Routes:

- **GET `/`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `getCoupons`
  - **Description:** Fetches active coupons for the user.

- **POST `/validate`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `validateCoupon`
  - **Description:** Validates a coupon for a user.

### Admin-Only Routes:

- **POST `/create`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Controller:** `createCoupon`
  - **Description:** Creates a new coupon.

- **DELETE `/del/:id`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Controller:** `deleteCoupon`
  - **Description:** Deletes a specific coupon using its ID.

- **GET `/all`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Controller:** `fetchAllCoupons`
  - **Description:** Fetches all coupons in the system (active/inactive).

- **PATCH `/:id`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Controller:** `toggleCouponStatus`
  - **Description:** Toggles the active status of a specific coupon using its ID.

---

## 5. Payment API

**File:** `payment.router.js`

### Routes:

- **POST `/checkout`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `checkoutSession`
  - **Description:** Initiates a payment checkout session.

- **POST `/checkout-success`**
  - **Middleware:** `protectedRoute`
  - **Controller:** `checkoutSuccess`
  - **Description:** Confirms the successful completion of a payment.

---

## 6. Product Management API

**File:** `product.router.js`

### Routes:

- **GET `/featured`**
  - **Controller:** `getAllFeaturedProducts`
  - **Description:** Fetches all featured products.

- **GET `/recommended`**
  - **Controller:** `getAllRecommendedProducts`
  - **Description:** Fetches all recommended products.

- **GET `/category/:category`**
  - **Controller:** `getProductsByCategory`
  - **Description:** Fetches products based on a specific category.

### Admin-Only Routes:

- **GET `/`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Controller:** `getAllProducts`
  - **Description:** Fetches all products in the system.

- **POST `/`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Controller:** `addProduct`
  - **Description:** Adds a new product to the catalog.

- **PATCH `/:id`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Controller:** `toggleFeaturedProduct`
  - **Description:** Toggles the featured status of a product by its ID.

- **DELETE `/:id`**
  - **Middleware:** `protectedRoute`, `adminRoute`
  - **Controller:** `deleteProduct`
  - **Description:** Deletes a product by its ID.

---

## Middleware

### Protected Route:
- Ensures that the user is authenticated before accessing the route.

### Admin Route:
- Ensures that the authenticated user has administrative privileges to access certain routes.

---

This documentation provides a comprehensive view of the backend routes and their functionalities to help developers and stakeholders understand and utilize the API effectively.

