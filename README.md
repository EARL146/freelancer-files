# 🐟 Hito House — Full-Stack Food Business Website

**Status: READY TO RUN** ✅

A professional, responsive food business website for selling premium catfish (Hito) with a complete shopping cart and order management system.

---

## 📋 Quick Overview

| Component | Tech | Status |
|-----------|------|--------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | ✅ Complete |
| **Backend** | Java + Spring Boot | ✅ Complete |
| **Database** | MySQL | ✅ Complete |
| **API** | REST (Spring Web) | ✅ Complete |
| **Design** | Professional & Responsive | ✅ Complete |

---

## 🚀 Get Started (Quick Start)

### 1️⃣ Prepare Database (1 minute)
```bash
# Open phpMyAdmin → http://localhost/phpmyadmin
# Click New → Database name: hito_db → Create
```

### 2️⃣ Start Backend (2 minutes)
```bash
cd backend
mvn spring-boot:run
# Wait for: "Tomcat started on port(s): 8080"
```

### 3️⃣ Start Frontend (1 minute)
```bash
cd frontend
python -m http.server 3000
# Or: npx http-server -p 3000
```

### 4️⃣ Open Browser
```
http://localhost:3000
```

**That's it!** You can now:
- Browse the menu
- Add items to cart
- Checkout and place orders
- See orders saved to MySQL

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| **QUICK_START.md** | Get running in 10 minutes (fastest way) |
| **PROJECT_STATUS.md** | Detailed project overview + setup guide |
| **IMPROVEMENTS_GUIDE.md** | Add new features (10+ ideas with code) |
| **DEBUGGING_REFERENCE.md** | Troubleshooting + code walkthrough |

---

## 🎯 What's Included

### Frontend Features ✨
- ✅ Responsive homepage with hero section
- ✅ Product menu with filtering
- ✅ Shopping cart (persists across page refreshes)
- ✅ Checkout page with order form
- ✅ Product detail modal
- ✅ Contact form
- ✅ Toast notifications
- ✅ Mobile-friendly design
- ✅ Professional styling (Playfair Display + Inter fonts)

### Backend Features ⚙️
- ✅ REST API for products, orders, and contact messages
- ✅ Spring Data JPA for database operations
- ✅ Input validation with DTOs
- ✅ CORS configuration for frontend communication
- ✅ Automatic database table creation (Hibernate)
- ✅ Error handling and HTTP status codes
- ✅ Proper MVC architecture (Controller → Service → Repository)

### Database 📊
- ✅ Products table (inventory management)
- ✅ Orders table (order tracking)
- ✅ OrderItem table (order line items)
- ✅ ContactMessage table (contact submissions)
- ✅ Cascade deletes and proper relationships

---

## 🗂️ Project Structure

```
hito-business/
├── backend/                    ← Java/Spring Boot
│   ├── src/main/java/.../     (Controllers, Services, Entities, DTOs, Repositories)
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml                 (Maven dependencies)
│
├── frontend/                   ← HTML/CSS/JS
│   ├── index.html              (Homepage)
│   ├── menu.html               (Products page)
│   ├── checkout.html           (Checkout page)
│   ├── css/style.css           (Styling)
│   └── js/
│       ├── main.js             (Navbar, contact form)
│       ├── products.js         (Product fetching & rendering)
│       └── cart.js             (Shopping cart logic)
│
├── PROJECT_STATUS.md           (Detailed setup guide)
├── QUICK_START.md              (10-minute quick start)
├── IMPROVEMENTS_GUIDE.md       (Feature ideas + code)
└── DEBUGGING_REFERENCE.md      (Troubleshooting + code examples)
```

---

## 🔌 REST API Endpoints

All endpoints return JSON. Base URL: `http://localhost:8080/api`

### Products
```
GET    /products              → Get all products
GET    /products?category=X   → Filter by category
GET    /products/{id}         → Get single product
POST   /products              → Create product (admin)
PUT    /products/{id}         → Update product (admin)
DELETE /products/{id}         → Delete product (admin)
```

### Orders
```
POST   /orders                → Place new order
GET    /orders                → Get all orders
GET    /orders/{id}           → Get single order
PUT    /orders/{id}/status    → Update status
```

### Contact
```
POST   /contact               → Submit contact form
```

---

## 🧪 Test the Flow

### Quick Test (Manual)

1. **Browse Products**
   - Go to http://localhost:3000
   - Click "Menu"
   - See product list (from backend or sample data)

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - See notification appear

3. **View Cart**
   - Click cart icon in navbar
   - See items, quantities, total

4. **Checkout**
   - Click "Proceed to Checkout"
   - Fill in: Name, Contact, Address
   - Click "Place Order"

5. **Check Database**
   - Open phpMyAdmin
   - Go to `hito_db` → `orders` table
   - See your order! ✅

### Test with curl (API Testing)

```bash
# Get all products
curl http://localhost:8080/api/products

# Create an order
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName":"Juan Dela Cruz",
    "contactNumber":"09123456789",
    "address":"123 Street",
    "totalAmount":150.00,
    "items":[{
      "productId":1,
      "productName":"Fried Hito",
      "quantity":1,
      "price":150.00
    }]
  }'

# Get that order
curl http://localhost:8080/api/orders/1
```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "Connection refused" | Backend not running. Run `mvn spring-boot:run` |
| "Table doesn't exist" | Database not created. Create `hito_db` in phpMyAdmin |
| "Cart won't save" | localStorage disabled in browser. Check privacy settings |
| "Orders won't submit" | Missing required fields. Check browser console for validation errors |
| "Products won't load" | Backend offline (OK — uses sample data). Or check `http://localhost:8080/api/products` |

**See DEBUGGING_REFERENCE.md for more solutions.**

---

## 📈 Next Steps

### Immediate (if you want to enhance)
1. Add sample products to database
2. Test the full checkout flow
3. Verify orders appear in phpMyAdmin

### Soon (recommended)
1. Read **IMPROVEMENTS_GUIDE.md**
2. Add order confirmation page (with sample code provided)
3. Add data initialization (auto-load sample products on startup)
4. Add search functionality

### Later (when ready)
1. Set up admin dashboard
2. Add payment integration (GCash, PayMaya, Credit Card)
3. Add email notifications
4. Deploy to production server

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** — Semantic markup
- **CSS3** — Flexbox, Grid, animations, responsive design
- **Vanilla JavaScript** — No frameworks (lightweight, fast)
- **Google Fonts** — Playfair Display + Inter

### Backend
- **Java 17** — Modern language features
- **Spring Boot 3.2** — Framework for REST APIs
- **Spring Data JPA** — Database abstraction layer
- **Hibernate** — ORM (Object-Relational Mapping)
- **Maven** — Build tool and dependency manager

### Database
- **MySQL 5.7+** — Relational database
- **phpMyAdmin** — GUI for database management

### Architecture
```
Frontend (HTML/CSS/JS)
    ↓
REST API (Spring Web)
    ↓
Service Layer (Business Logic)
    ↓
Data Access (Spring Data JPA)
    ↓
MySQL Database
```

---

## 💡 Key Design Decisions

1. **No Framework Frontend** → Faster loading, easier to understand
2. **Spring Boot Backend** → Production-ready, scalable
3. **REST API** → Industry standard, easy to test
4. **localStorage for Cart** → No backend session needed (yet)
5. **Auto-create Tables** → Easy to set up, great for development
6. **Sample Data Fallback** → Frontend works even if backend is offline

---

## 🔒 Security Considerations

**Current:**
- ✅ Input validation (DTOs with @NotBlank, @Positive, etc.)
- ✅ CORS configured
- ✅ Credentials not hardcoded (use application.properties)

**For Production, Add:**
- [ ] HTTPS/SSL certificate
- [ ] Database password (not empty)
- [ ] Rate limiting
- [ ] Authentication/Authorization
- [ ] SQL Injection prevention (JPA already does this)
- [ ] CSRF protection
- [ ] Admin endpoints protection

---

## 📞 Support

**Having issues?**

1. Check **QUICK_START.md** (fastest troubleshooting)
2. Check **DEBUGGING_REFERENCE.md** (detailed solutions)
3. Check **PROJECT_STATUS.md** (setup details)
4. Open browser console (F12) and backend terminal for error messages

**Common Checklist:**
- [ ] MySQL running?
- [ ] Database `hito_db` created?
- [ ] Backend running on port 8080?
- [ ] Frontend running on port 3000?
- [ ] Browser showing http://localhost:3000 (not 127.0.0.1)?
- [ ] Using http (not https)?

---

## 📚 Learning Resources

Understand how the project works:

1. **Frontend Flow** → `frontend/js/products.js` (read the comments)
2. **Backend Flow** → `backend/src/main/java/.../OrderService.java`
3. **Database Schema** → Check DEBUGGING_REFERENCE.md
4. **REST Concepts** → https://spring.io/guides/tutorials/rest/
5. **Spring Boot** → https://spring.io/projects/spring-boot

---

## 🎉 You're Ready!

Everything you need is in this project. The code is:
- ✅ Well-organized
- ✅ Properly documented
- ✅ Following best practices
- ✅ Ready to run
- ✅ Easy to understand and modify

**Start with QUICK_START.md to get running in minutes!**

---

**Built with ❤️ for learning full-stack development** 🐟

---

## Quick Links

- 📖 **Setup Guide** → PROJECT_STATUS.md
- ⚡ **Quick Start** → QUICK_START.md
- 🚀 **Enhancements** → IMPROVEMENTS_GUIDE.md
- 🔍 **Debugging** → DEBUGGING_REFERENCE.md

**Let's build Hito House! 🏠🐟**
