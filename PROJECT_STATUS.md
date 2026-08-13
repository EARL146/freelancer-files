# Hito House — Project Status & Setup Guide

**Last Updated:** August 13, 2026

---

## 🎯 Project Overview

**Hito House** is a professional full-stack web application for a premium catfish food business.

- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript (no frameworks)
- **Backend:** Java + Spring Boot + Spring Data JPA
- **Database:** MySQL
- **Architecture:** REST API-based

---

## ✅ What's Complete

### Backend (Java / Spring Boot)
- ✅ Project structure fully set up with Maven
- ✅ Database configuration (application.properties)
- ✅ All entities created:
  - `Product` — menu items with pricing, images, availability
  - `Order` — customer orders with items list
  - `OrderItem` — individual items in an order
  - `ContactMessage` — contact form submissions
- ✅ All repositories (Spring Data JPA interfaces)
- ✅ All services with business logic
- ✅ All controllers with REST endpoints:
  - `ProductController` — GET/POST/PUT/DELETE products
  - `OrderController` — place and track orders
  - `ContactController` — handle contact form submissions
- ✅ DTOs (Data Transfer Objects):
  - `OrderRequest` — validated order data from frontend
  - `ContactRequest` — contact form data
- ✅ CORS configuration for frontend-backend communication
- ✅ Proper validation annotations on DTOs

### Frontend (HTML / CSS / JavaScript)
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Navigation bar with cart icon & mobile hamburger menu
- ✅ Home page (index.html):
  - Hero section with call-to-action
  - Featured products carousel
  - "Why Choose Us" section
  - Customer testimonials
  - Contact section with form
- ✅ Menu page (menu.html):
  - Product listing with categories
  - Product cards with images, price, description
  - Filter by category
  - Product detail modal
  - "Add to Cart" functionality
- ✅ Checkout page (checkout.html):
  - Order summary
  - Delivery details form
  - Total calculation
  - Order submission to backend
- ✅ Shopping cart (localStorage-based):
  - Add/remove items
  - Adjust quantities
  - Persistent across page refreshes
  - Cart sidebar with totals
- ✅ Premium design:
  - Modern color scheme (deep greens, warm accents)
  - Professional typography (Playfair Display + Inter)
  - Smooth animations and transitions
  - Good spacing and visual hierarchy
- ✅ Toast notifications for user feedback
- ✅ Error handling with fallback sample data

---

## ⚙️ How to Set Up & Run

### Prerequisites
- **Java 17+** installed
- **MySQL 5.7+** running (e.g., via XAMPP)
- **VS Code** with Java Extension Pack & Spring Boot Extension Pack (optional but recommended)

### Step 1: Prepare the Database

1. Open **phpMyAdmin** (http://localhost/phpmyadmin if using XAMPP)
2. Create a new database:
   ```sql
   CREATE DATABASE hito_db;
   ```
3. No need to manually create tables — Spring Boot / Hibernate will do it automatically.

### Step 2: Start the Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Clean and build:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   
   **Or** run directly from VS Code using the Spring Boot Dashboard.

4. When you see this, the backend is running:
   ```
   Tomcat started on port(s): 8080
   ```

5. Test the API:
   ```bash
   curl http://localhost:8080/api/products
   ```
   Should return `[]` (empty array) or existing products in JSON format.

### Step 3: Add Sample Products (Optional but Recommended)

Create sample products so the menu isn't empty. You can do this via:

**Option A: Direct HTTP request**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Classic Fried Hito",
    "description": "Crispy whole catfish deep-fried to golden perfection",
    "price": 150.00,
    "category": "Fried Hito",
    "imageUrl": null,
    "available": true
  }'
```

**Option B: Use the sample data fallback**
The frontend is designed to use sample data when the backend is offline. So you can still test the UI without products in the database.

### Step 4: Run the Frontend

1. Open a new terminal

2. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

3. Start a local web server:
   ```bash
   # Using Python 3
   python -m http.server 3000

   # Or using Node.js (if installed)
   npx http-server -p 3000
   ```

4. Open your browser to:
   ```
   http://localhost:3000
   ```

5. You should see the Hito House homepage!

---

## 🧪 Testing the Full Flow

1. **Browse Menu:** Click "Menu" → see products (from backend or sample data)
2. **Add to Cart:** Click "Add to Cart" on a product
3. **View Cart:** Click the cart icon to see your items
4. **Checkout:** Go to checkout.html or click "Proceed to Checkout"
5. **Place Order:** Fill in your details and click "Place Order"
6. **Confirmation:** You should see a success message and the order should be saved to MySQL

---

## 📁 Project Structure

```
hito-business/
├── backend/
│   ├── src/main/java/com/example/hito/
│   │   ├── HitoApplication.java          (entry point)
│   │   ├── controller/
│   │   │   ├── ProductController.java
│   │   │   ├── OrderController.java
│   │   │   └── ContactController.java
│   │   ├── service/
│   │   │   ├── ProductService.java
│   │   │   ├── OrderService.java
│   │   │   └── ContactService.java
│   │   ├── repository/
│   │   │   ├── ProductRepository.java
│   │   │   ├── OrderRepository.java
│   │   │   └── ContactMessageRepository.java
│   │   ├── entity/
│   │   │   ├── Product.java
│   │   │   ├── Order.java
│   │   │   ├── OrderItem.java
│   │   │   └── ContactMessage.java
│   │   ├── dto/
│   │   │   ├── OrderRequest.java
│   │   │   └── ContactRequest.java
│   │   └── config/
│   │       └── CorsConfig.java
│   ├── src/main/resources/
│   │   └── application.properties        (database config)
│   └── pom.xml                           (Maven dependencies)
│
├── frontend/
│   ├── index.html
│   ├── menu.html
│   ├── checkout.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── main.js
│       ├── products.js
│       └── cart.js
```

---

## 🔗 REST API Endpoints

### Products
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | Get all products (or filter by ?category=...) |
| GET | `/api/products/{id}` | Get a single product |
| POST | `/api/products` | Create a new product (admin) |
| PUT | `/api/products/{id}` | Update a product (admin) |
| DELETE | `/api/products/{id}` | Delete a product (admin) |

### Orders
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/{id}` | Get a single order |
| PUT | `/api/orders/{id}/status` | Update order status |

### Contact
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/contact` | Submit a contact form |

---

## 🐛 Common Issues & Solutions

### Issue: "Connection refused" or backend not responding
**Solution:** 
- Make sure MySQL is running (`XAMPP → Start MySQL`)
- Make sure the backend is running (`mvn spring-boot:run`)
- Check that you're using the correct URL (http://localhost:8080)

### Issue: "Database not found" error
**Solution:**
- Create the `hito_db` database in phpMyAdmin
- Spring Boot will auto-create the tables when it starts

### Issue: CORS errors in browser console
**Solution:**
- CORS is already configured in `CorsConfig.java`
- Make sure the frontend is calling `http://localhost:8080/api/...` (not HTTPS or a different port)

### Issue: Cart doesn't persist after refresh
**Solution:**
- Check browser's localStorage settings (not disabled)
- Make sure JavaScript isn't blocked in your browser

### Issue: Products not showing on menu page
**Solution:**
- The frontend will use sample data if the backend is offline — this is intentional for development
- To use real products, add them via the POST endpoint or wait for them to sync from the database

---

## 📝 Important Notes for Development

### Database Credentials
- **URL:** `jdbc:mysql://localhost:3306/hito_db`
- **Username:** `root` (XAMPP default)
- **Password:** (empty by default in XAMPP)

These are in `application.properties`. **Do NOT hardcode credentials in Java classes.**

### Hibernate Auto-Update
- The `spring.jpa.hibernate.ddl-auto=update` setting automatically creates/updates tables based on Entity classes
- Change to `validate` or `none` in production

### Frontend API Base URL
- All fetch calls use `http://localhost:8080/api`
- Change in `js/products.js` if your backend runs on a different port/host

---

## 🚀 Next Steps / Enhancements

Potential features to add:

1. **Admin Dashboard**
   - Add/edit/delete products
   - View and manage orders
   - Track sales metrics

2. **Payment Integration**
   - GCash, PayMaya, or Credit Card gateway
   - Order payment status tracking

3. **User Accounts**
   - Customer registration & login
   - Order history
   - Saved addresses

4. **Email Notifications**
   - Order confirmation emails
   - Delivery status updates

5. **Delivery Management**
   - Delivery partner integration
   - Real-time order tracking

6. **Analytics**
   - Sales reports
   - Popular products
   - Customer behavior insights

---

## 📞 Support

If you encounter any issues:

1. **Check the browser console** (F12 → Console tab) for JavaScript errors
2. **Check the backend logs** (terminal running `mvn spring-boot:run`) for Java errors
3. **Check MySQL** (phpMyAdmin) to see if data is actually being saved
4. **Test the API directly** using curl or Postman to isolate frontend vs backend issues

---

**Good luck building Hito House! 🐟**
