# Hito House — Quick Start Guide

**Get the project running in 10 minutes!**

---

## Prerequisites Checklist

- [ ] Java 17+ installed (`java -version`)
- [ ] Maven installed (`mvn -version`)
- [ ] MySQL running (XAMPP → MySQL module started)
- [ ] Terminal/Command Prompt open

---

## Step 1: Create Database (2 minutes)

1. Open **phpMyAdmin**: http://localhost/phpmyadmin
2. Click **"New"** (left sidebar)
3. Database name: `hito_db`
4. Click **"Create"**
5. ✅ Done — tables will auto-create when backend starts

---

## Step 2: Start the Backend (3 minutes)

1. Open terminal in the **backend** folder:
   ```bash
   cd hito-business/backend
   ```

2. Run:
   ```bash
   mvn spring-boot:run
   ```

3. Wait for this message:
   ```
   Tomcat started on port(s): 8080 with context path ''
   ```

4. ✅ Backend is live at `http://localhost:8080`

---

## Step 3: Start the Frontend (2 minutes)

1. Open a **new terminal** in the **frontend** folder:
   ```bash
   cd hito-business/frontend
   ```

2. Run a local web server:

   **Python 3:**
   ```bash
   python -m http.server 3000
   ```

   **Or Node.js:**
   ```bash
   npx http-server -p 3000
   ```

3. ✅ Frontend is live at `http://localhost:3000`

---

## Step 4: Test It!

1. **Open your browser** to `http://localhost:3000`
2. You should see the **Hito House homepage**
3. Click **"Menu"** → you'll see sample products
4. Click **"Add to Cart"** on any product
5. Click **Cart icon** → see your items
6. Click **"Proceed to Checkout"** button
7. Fill in delivery details:
   - Full Name
   - Contact Number
   - Address
8. Click **"Place Order"** ✅

If you see a success message, **you're done!**

---

## ✅ All Working?

**Congratulations!** Your Hito House website is running with:
- ✅ Full-stack functionality
- ✅ Database persistence (MySQL)
- ✅ Shopping cart
- ✅ Order placement
- ✅ Professional design

---

## If Something Breaks

### "Backend won't start" or "Connection refused"

**Check MySQL:**
```bash
# Windows
netstat -ano | findstr :3306

# Mac/Linux
lsof -i :3306
```

If nothing shows, MySQL isn't running. Start it in XAMPP.

### "Frontend shows nothing" or "Blank page"

1. Check browser console (F12 → Console)
2. Look for red error messages
3. Make sure Python/Node server is running (terminal should show `Serving on...` or `Hit CTRL-C to stop`)

### "Orders aren't saving"

1. Check **phpMyAdmin** → `hito_db` → Tables
   - Do the `orders`, `products`, etc. tables exist?
2. Check **backend terminal** for errors (red text)
3. Check **browser console** (F12) for errors

### "Cart shows sample products only"

**This is normal!** The frontend uses sample data when:
- Backend is offline, or
- API returns empty response

Once you add products via the POST endpoint or directly in MySQL, they'll show.

---

## Add Sample Products (Optional)

**Via Terminal:**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Classic Fried Hito",
    "description": "Crispy whole catfish",
    "price": 150.00,
    "category": "Fried Hito",
    "available": true
  }'
```

**Or use Postman** (easier if you have it):
- Method: `POST`
- URL: `http://localhost:8080/api/products`
- Body (JSON):
```json
{
  "name": "Grilled Hito",
  "description": "Juicy catfish marinated and grilled",
  "price": 175.00,
  "category": "Grilled Hito",
  "available": true
}
```

---

## File Structure Quick Reference

```
hito-business/
├── backend/           ← Java / Spring Boot (port 8080)
│   ├── src/main/java/com/example/hito/  (Java code)
│   └── pom.xml                           (dependencies)
│
└── frontend/          ← HTML / CSS / JS (port 3000)
    ├── index.html     (homepage)
    ├── menu.html      (products)
    ├── checkout.html  (orders)
    └── js/            (logic)
```

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `backend/src/main/resources/application.properties` | Database & server config |
| `backend/src/main/java/.../HitoApplication.java` | Backend entry point |
| `frontend/js/products.js` | Fetches products from API |
| `frontend/js/cart.js` | Shopping cart logic (localStorage) |
| `frontend/js/main.js` | Contact form, navbar behavior |

---

## Quick Troubleshooting Script

Run this to check everything:

```bash
# Check Java
java -version

# Check Maven
mvn -version

# Check if MySQL is running on port 3306
# Windows:
netstat -ano | findstr :3306

# Mac/Linux:
lsof -i :3306

# Check if backend is running on port 8080
# Windows:
netstat -ano | findstr :8080

# Mac/Linux:
lsof -i :8080

# Test backend API
curl http://localhost:8080/api/products

# Should return: [] or a JSON array of products
```

---

## Example: Full Test Flow

```bash
# Terminal 1: Backend
cd backend
mvn spring-boot:run
# Wait for: Tomcat started...

# Terminal 2: Frontend
cd frontend
python -m http.server 3000

# Terminal 3: Test API (optional)
curl http://localhost:8080/api/products
curl http://localhost:8080/api/contact

# Browser: Go to http://localhost:3000
# Test: Menu → Add to Cart → Checkout → Place Order
```

---

**You're all set! 🎉**

Any issues? Check **PROJECT_STATUS.md** for more detailed troubleshooting.
