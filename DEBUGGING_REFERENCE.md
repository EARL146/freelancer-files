# Hito House — Debugging & Code Reference

Complete reference for troubleshooting and understanding the codebase.

---

## 🔍 Common Backend Issues

### Issue 1: "Whitelabel Error Page" (404 or 500)

**Symptom:** Browser shows error page when accessing API

**Diagnosis:**
1. Check backend is actually running:
   ```bash
   curl http://localhost:8080/api/products
   ```
   Should return `[]` or JSON, not HTML error page.

2. Check terminal for error messages (red text)

3. Verify database is running:
   ```bash
   mysql -u root -p
   use hito_db;
   show tables;
   ```

**Fix:**
- Make sure MySQL is running (XAMPP → Start MySQL)
- Restart backend: `Ctrl+C` then `mvn spring-boot:run`
- Check application.properties for correct database URL/credentials

---

### Issue 2: "JPA Error" or "Table doesn't exist"

**Symptom:** Backend crashes with table-related error

**Diagnosis:**
```bash
# Check what's in the database
mysql -u root -p hito_db
SHOW TABLES;  -- Should show: products, orders, order_item, contact_message
```

**Fix:**
- This usually fixes itself when backend starts (Hibernate creates tables)
- If tables don't exist, restart backend:
  ```bash
  mvn clean spring-boot:run
  ```
- If that doesn't work, drop and recreate the database:
  ```bash
  mysql -u root -p
  DROP DATABASE hito_db;
  CREATE DATABASE hito_db;
  EXIT;
  # Then restart backend
  ```

---

### Issue 3: "Parameter validation failed" (400 Bad Request)

**Symptom:** Frontend shows "Failed to send order" or similar

**Diagnosis:**
- Check what the frontend is sending. Open browser console (F12 → Network tab)
- Look for the failed request
- Click it and check the "Request" and "Response" tabs

**Example Error:**
```json
{
  "message": "Customer name is required"
}
```

**Fix:**
- Make sure frontend is sending all required fields
- Check OrderRequest DTO for @NotBlank, @NotNull annotations
- Values that are empty string `""` or null will fail validation

---

### Issue 4: "Cannot insert NULL into column 'price'"

**Symptom:** Orders fail to save with MySQL error

**Diagnosis:**
- Frontend isn't calculating total correctly
- Check `frontend/js/checkout.js` — is `totalAmount` being set?

**Fix:**
```javascript
// In submitOrder function:
const totalAmount = getCart().reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
);
// Then include in the payload:
const orderData = {
    customerName: /* ... */,
    totalAmount: totalAmount,  // ← Make sure this is included!
    // ... other fields ...
};
```

---

## 🔍 Common Frontend Issues

### Issue 1: "Fetch failed" or "Network error"

**Symptom:** Toast shows "Could not connect to server"

**Diagnosis:**
```javascript
// Open browser console (F12) and check:
console.log('API_BASE =', 'http://localhost:8080/api');

// Try manually:
fetch('http://localhost:8080/api/products')
    .then(r => r.json())
    .then(data => console.log('Success:', data))
    .catch(err => console.error('Error:', err));
```

**Fix:**
- Make sure backend is running (`mvn spring-boot:run`)
- Verify API_BASE URL is correct in `frontend/js/products.js`
- Check if you're using `localhost:3000` in browser (not `127.0.0.1` or IP address)
- Try in an incognito/private window (rules out cache issues)

---

### Issue 2: "Cart is empty" even after adding items

**Symptom:** Click "Add to Cart" but nothing happens

**Diagnosis:**
```javascript
// In browser console (F12):
localStorage.getItem('hito_cart');  // Should show your cart items
```

**Fix:**
- Check if localStorage is disabled:
  - Chrome: Settings → Privacy → Site settings → Cookies → see if localStorage is blocked
  - Firefox: about:config → search "storage.enabled"
  
- If disabled, enable it

- Or, if storage is full, clear it:
  ```javascript
  localStorage.clear();  // ⚠️ This clears everything
  ```

---

### Issue 3: "Product images won't load"

**Symptom:** Products show emoji (🐟) instead of images

**Diagnosis:**
- Check if `imageUrl` is null in the database:
  ```bash
  mysql -u root -p hito_db
  SELECT id, name, imageUrl FROM products;
  ```

**Fix:**
- Update products with real image URLs:
  ```bash
  curl -X PUT http://localhost:8080/api/products/1 \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Classic Fried Hito",
      "price": 150.00,
      "category": "Fried Hito",
      "imageUrl": "https://example.com/hito.jpg",
      "available": true
    }'
  ```

- Or add images directly in MySQL:
  ```sql
  UPDATE products SET imageUrl = 'https://example.com/hito.jpg' WHERE id = 1;
  ```

---

## 📝 Code Walkthrough

### How Products Are Fetched & Displayed

**File:** `frontend/js/products.js`

```javascript
// Step 1: Fetch products from backend
async function loadProducts() {
    const products = await fetch(API_BASE + '/products')
        .then(r => r.json())
        .catch(() => SAMPLE_PRODUCTS);  // If fetch fails, use sample data
    
    // Step 2: Store globally
    allProducts = products;
    
    // Step 3: Render on page
    renderProducts(products);
}

// Step 4: Render each product as a card
function renderProducts(products) {
    const html = products.map(p => `
        <div class="product-card" onclick="showProductDetail(${p.id})">
            <div class="product-img">${p.imageUrl ? `<img src="${p.imageUrl}">` : '🐟'}</div>
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <button onclick="addToCart(p)">Add to Cart</button>
        </div>
    `).join('');
    
    document.getElementById('productsContainer').innerHTML = html;
}

// Step 5: Show product details in a modal
function showProductDetail(id) {
    const product = allProducts.find(p => p.id === id);
    // Show modal with product info...
}
```

**Flow Diagram:**
```
Page loads
    ↓
loadProducts() called
    ↓
fetch('http://localhost:8080/api/products')
    ↓
Backend returns JSON: [{ id: 1, name: "...", price: 150 }, ...]
    ↓
renderProducts(products)
    ↓
Each product becomes a <div class="product-card">
    ↓
User sees products on page
```

---

### How Orders Are Placed

**File:** `frontend/checkout.html` + `frontend/js/checkout.js`

```javascript
async function submitOrder(event) {
    event.preventDefault();
    
    // Step 1: Get form data
    const customerName = document.getElementById('custName').value;
    const contactNumber = document.getElementById('custContact').value;
    const address = document.getElementById('custAddress').value;
    
    // Step 2: Get cart items
    const cart = getCart();  // From cart.js
    
    // Step 3: Build items array for API
    const items = cart.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
    }));
    
    // Step 4: Calculate total
    const totalAmount = cart.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
    );
    
    // Step 5: Create order payload
    const orderData = {
        customerName,
        contactNumber,
        address,
        items,
        totalAmount,
        notes: document.getElementById('custNotes').value || ''
    };
    
    // Step 6: Send to backend
    const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });
    
    // Step 7: Handle response
    if (response.ok) {
        const order = await response.json();
        clearCart();  // Clear from localStorage
        showToast('✅ Order placed!', 'success');
        // Redirect to confirmation page
        window.location.href = `confirmation.html?orderId=${order.id}`;
    } else {
        showToast('❌ Order failed', 'error');
    }
}
```

**Flow Diagram:**
```
User fills checkout form
    ↓
User clicks "Place Order"
    ↓
submitOrder(event) called
    ↓
Reads form data + cart items
    ↓
POST to http://localhost:8080/api/orders
    ↓
Backend validates with OrderRequest DTO
    ↓
Backend creates Order entity
    ↓
Database saves order + order items
    ↓
Backend returns created Order (with ID)
    ↓
Frontend clears cart
    ↓
Frontend redirects to confirmation page
```

---

### How Spring Boot Processes an Order

**File:** `backend/src/main/java/.../controller/OrderController.java`

```java
@PostMapping
public ResponseEntity<Order> createOrder(@Valid @RequestBody OrderRequest request) {
    // Step 1: @Valid annotation triggers validation
    // If validation fails, Spring returns 400 Bad Request automatically
    
    // Step 2: Call service layer
    Order created = orderService.createOrder(request);
    
    // Step 3: Return the created order (Spring converts to JSON)
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}
```

**Service Layer** (`backend/src/main/java/.../service/OrderService.java`):

```java
public Order createOrder(OrderRequest request) {
    // Step 1: Create empty Order entity
    Order order = new Order();
    
    // Step 2: Copy fields from DTO
    order.setCustomerName(request.getCustomerName());
    order.setContactNumber(request.getContactNumber());
    order.setAddress(request.getAddress());
    order.setNotes(request.getNotes());
    order.setTotalAmount(request.getTotalAmount());
    order.setStatus("PENDING");
    
    // Step 3: Convert items (OrderItemRequest → OrderItem)
    List<OrderItem> items = request.getItems().stream()
        .map(itemReq -> new OrderItem(
            itemReq.getProductId(),
            itemReq.getProductName(),
            itemReq.getQuantity(),
            itemReq.getPrice()
        ))
        .toList();
    
    order.setItems(items);
    
    // Step 4: Save to database (cascade saves items too)
    return orderRepository.save(order);  // INSERT into orders + order_item
}
```

**Database** (what actually happens):

```sql
-- Spring/Hibernate executes these SQL statements:
INSERT INTO orders (customer_name, contact_number, address, total_amount, notes, status, created_at)
VALUES ('Juan Dela Cruz', '09123456789', '123 Brgy...', 300.00, 'Extra sauce', 'PENDING', NOW());

-- Get the order ID that was just created (e.g., ID = 5)
-- Then insert each item:
INSERT INTO order_item (order_id, product_id, product_name, quantity, price)
VALUES (5, 1, 'Fried Hito', 2, 150.00);
INSERT INTO order_item (order_id, product_id, product_name, quantity, price)
VALUES (5, 2, 'Grilled Hito', 1, 175.00);

-- Return the complete Order object (which Spring converts to JSON)
```

---

## 📋 Database Schema Reference

### products table
```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    available BOOLEAN DEFAULT true
);
```

### orders table
```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### order_item table
```sql
CREATE TABLE order_item (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT,
    product_name VARCHAR(255),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

### contact_message table
```sql
CREATE TABLE contact_message (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 Useful Backend Commands

```bash
# Build without running
mvn clean compile

# Run tests
mvn test

# Build JAR file
mvn clean package

# Run the JAR
java -jar backend/target/hito-0.0.1-SNAPSHOT.jar

# Check dependencies
mvn dependency:tree

# Format code (if using Spotless plugin)
mvn spotless:apply

# View all Spring beans loaded
# Add this to application.properties:
logging.level.org.springframework=DEBUG
```

---

## 🔧 Useful Frontend Commands

```javascript
// In browser console (F12):

// Check API connectivity
fetch('http://localhost:8080/api/products').then(r => r.json()).then(console.log);

// Check cart contents
JSON.parse(localStorage.getItem('hito_cart'));

// Clear cart
localStorage.removeItem('hito_cart');

// Check all localStorage
console.table(localStorage);

// Simulate adding a product to cart
addToCart({ id: 1, name: 'Test', price: 100, category: 'Test', imageUrl: null });

// View all products in memory
console.log(allProducts);
```

---

## 🚨 Error Messages & Solutions

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `Connection refused` | Backend not running | Start backend: `mvn spring-boot:run` |
| `Table 'hito_db.products' doesn't exist` | Database not created | Create: `CREATE DATABASE hito_db;` |
| `Parameter is required` | Missing field in form | Fill all required fields (marked with *) |
| `Positive` validation failed | Price or quantity is negative | Use positive numbers only |
| `NotBlank` validation failed | Empty field | Don't leave name/address/contact empty |
| `CORS error` | Frontend calling wrong domain | Use `http://localhost:8080/api` exactly |
| `XMLHttpRequest failed` | Network issue | Check MySQL + backend are running |
| `Cart is empty` | localStorage cleared or disabled | Check browser privacy settings |

---

## 📊 Quick API Test with curl

```bash
# Get all products
curl http://localhost:8080/api/products | jq

# Get one product
curl http://localhost:8080/api/products/1 | jq

# Create a product
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 100.00,
    "category": "Test",
    "available": true
  }' | jq

# Create an order
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Juan Dela Cruz",
    "contactNumber": "09123456789",
    "address": "123 Street, City",
    "totalAmount": 150.00,
    "items": [
      {
        "productId": 1,
        "productName": "Fried Hito",
        "quantity": 1,
        "price": 150.00
      }
    ]
  }' | jq

# Get all orders
curl http://localhost:8080/api/orders | jq

# Update order status
curl -X PUT http://localhost:8080/api/orders/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "CONFIRMED"}' | jq
```

---

**Debugging Tips:**
1. **Read error messages carefully** — they usually tell you exactly what's wrong
2. **Check browser console** (F12) and **backend terminal** together
3. **Use curl or Postman** to test API separately from frontend
4. **Restart everything** (backend, frontend, browser) if stuck
5. **Check logs** — they're your best friend

**Good luck! 🍀**
