# Hito House — Improvements & Enhancements Guide

This document covers potential improvements and fixes to make the project production-ready.

---

## 1. Add Data Initialization (Sample Products on Startup)

**Problem:** Database starts empty. Users see sample data or must manually add products via API.

**Solution:** Auto-load sample products when the app starts.

**File to Create:** `backend/src/main/java/com/example/hito/config/DataInitializer.java`

```java
package com.example.hito.config;

import com.example.hito.entity.Product;
import com.example.hito.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * DataInitializer runs once when the app starts.
 * It seeds the database with sample products if they don't exist.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if no products exist
        if (productRepository.count() == 0) {
            productRepository.save(new Product(
                    "Classic Fried Hito",
                    "Crispy whole catfish deep-fried to golden perfection. Served with sawsawan and steamed rice.",
                    new BigDecimal("150.00"),
                    "Fried Hito",
                    null,
                    true
            ));

            productRepository.save(new Product(
                    "Grilled Hito Special",
                    "Juicy catfish marinated in our secret blend of spices and grilled over charcoal.",
                    new BigDecimal("175.00"),
                    "Grilled Hito",
                    null,
                    true
            ));

            productRepository.save(new Product(
                    "Fresh Hito (Whole)",
                    "Fresh pond-raised catfish, cleaned and ready to cook. Sold per kilo.",
                    new BigDecimal("120.00"),
                    "Fresh Hito",
                    null,
                    true
            ));

            productRepository.save(new Product(
                    "Hito Sinabawang Set",
                    "Tender catfish in a rich savory broth with vegetables. A complete comfort meal.",
                    new BigDecimal("195.00"),
                    "Hito Meals",
                    null,
                    true
            ));

            productRepository.save(new Product(
                    "Spicy Hito Sisig",
                    "Our famous sizzling Hito sisig — spicy, crispy, and absolutely addictive.",
                    new BigDecimal("220.00"),
                    "Hito Specials",
                    null,
                    true
            ));

            System.out.println("✅ Sample products initialized!");
        }
    }
}
```

**Why:** Users won't see an empty menu on first run. The data persists in the database.

---

## 2. Add Proper Error Handling in Frontend

**Problem:** Network errors aren't always handled gracefully.

**Enhancement:** Add a global error handler for all API calls.

**File to Update:** `frontend/js/products.js` (add at the top after `const API_BASE`)

```javascript
/**
 * Global API error handler
 * Provides consistent error messages across the app
 */
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(API_BASE + endpoint, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || `API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        // Return null so calling code knows there was an error
        return null;
    }
}

// Update all fetch calls to use this helper
// Example:
// OLD: const products = await fetch(API_BASE + '/products').then(r => r.json());
// NEW: const products = await apiCall('/products') || SAMPLE_PRODUCTS;
```

---

## 3. Add Input Validation in Checkout Form

**Problem:** Frontend doesn't validate email format or phone numbers.

**Enhancement:** Add client-side validation before sending to backend.

**File to Update:** `frontend/checkout.html` (in the form section)

Add this JavaScript at the end of checkout.html:

```javascript
<script>
/**
 * Validate checkout form before submission
 */
function validateCheckout() {
    const custName = document.getElementById('custName').value.trim();
    const custContact = document.getElementById('custContact').value.trim();
    const custAddress = document.getElementById('custAddress').value.trim();

    // Basic validation
    if (!custName || custName.length < 3) {
        showToast('❌ Please enter a valid name (at least 3 characters)', 'error');
        return false;
    }

    if (!custContact || custContact.length < 10) {
        showToast('❌ Please enter a valid contact number', 'error');
        return false;
    }

    if (!custAddress || custAddress.length < 10) {
        showToast('❌ Please enter a complete address', 'error');
        return false;
    }

    return true;
}

// Update the form's onsubmit to call this
// onsubmit="return validateCheckout() && submitOrder(event)"
</script>
```

---

## 4. Add Order Confirmation Page

**Problem:** After placing an order, users aren't shown a confirmation with their order ID.

**Solution:** Create a confirmation page.

**File to Create:** `frontend/confirmation.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation — Hito House</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<nav class="navbar scrolled" id="navbar">
    <div class="container">
        <a href="index.html" class="navbar-brand">
            <div class="brand-logo">🐟</div>
            <div class="brand-text">
                <span class="brand-name">Hito House</span>
                <span class="brand-tagline">Premium Catfish</span>
            </div>
        </a>
    </div>
</nav>

<div class="checkout-page">
    <div class="container" style="text-align: center; padding: 4rem 2rem;">

        <div style="background: white; border-radius: 20px; padding: 3rem; border: 2px solid var(--color-success); max-width: 500px; margin: 0 auto;">

            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>

            <h2 style="color: var(--color-primary); margin-bottom: 1rem;">Order Confirmed!</h2>

            <p style="color: var(--color-text-muted); margin-bottom: 2rem;">
                Thank you for your order. We'll prepare your Hito dishes and contact you for delivery.
            </p>

            <div style="background: #f5f5f5; padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; text-align: left;">
                <p><strong>Order ID:</strong> <span id="orderId" style="font-family: monospace;">-</span></p>
                <p><strong>Customer Name:</strong> <span id="orderName">-</span></p>
                <p><strong>Contact:</strong> <span id="orderContact">-</span></p>
                <p><strong>Address:</strong> <span id="orderAddress">-</span></p>
                <p><strong>Total Amount:</strong> <span id="orderTotal" style="font-size: 1.2rem; color: var(--color-primary);">-</span></p>
                <p><strong>Status:</strong> <span style="background: #ffc107; color: #000; padding: 0.25rem 0.75rem; border-radius: 5px;">PENDING</span></p>
            </div>

            <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 2rem;">
                We will contact you at the number provided to confirm delivery details.
            </p>

            <a href="index.html" class="btn btn-primary" style="display: inline-block;">Back to Home</a>

        </div>

    </div>
</div>

<script>
// Get order ID from URL query parameter
const params = new URLSearchParams(window.location.search);
const orderId = params.get('orderId');

// Fetch and display the order details
if (orderId) {
    fetch(`http://localhost:8080/api/orders/${orderId}`)
        .then(r => r.json())
        .then(order => {
            document.getElementById('orderId').textContent = order.id;
            document.getElementById('orderName').textContent = order.customerName;
            document.getElementById('orderContact').textContent = order.contactNumber;
            document.getElementById('orderAddress').textContent = order.address;
            document.getElementById('orderTotal').textContent = `₱${order.totalAmount.toFixed(2)}`;
        })
        .catch(err => console.error('Failed to load order:', err));
} else {
    // No order ID — redirect to menu
    window.location.href = 'menu.html';
}
</script>

</body>
</html>
```

Then update `frontend/checkout.html` to redirect after successful order:

```javascript
// In the submitOrder function, after a successful POST:
if (response.ok) {
    const order = await response.json();
    // Redirect to confirmation page with order ID
    window.location.href = `confirmation.html?orderId=${order.id}`;
}
```

---

## 5. Add Logging to Backend

**Problem:** Hard to debug issues without detailed logs.

**Solution:** Add SLF4J logging (already included with Spring Boot).

**File to Update:** `backend/src/main/java/com/example/hito/service/OrderService.java`

Add at the top:
```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);
    
    public Order createOrder(OrderRequest request) {
        logger.info("Creating order for customer: {}", request.getCustomerName());
        Order order = new Order();
        // ... rest of code ...
        logger.info("Order created with ID: {}", order.getId());
        return order;
    }
}
```

---

## 6. Add Exception Handler for Better Error Responses

**Problem:** Bad requests return generic Spring error messages.

**Solution:** Create a global exception handler.

**File to Create:** `backend/src/main/java/com/example/hito/exception/GlobalExceptionHandler.java`

```java
package com.example.hito.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("message", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```

---

## 7. Add Database Backup Script

**Problem:** No easy way to backup order data.

**Solution:** Add a simple backup script.

**File to Create:** `backup.sh` (Mac/Linux) or `backup.bat` (Windows)

**Mac/Linux (backup.sh):**
```bash
#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
mysqldump -u root hito_db > hito_db_backup_$TIMESTAMP.sql
echo "✅ Database backed up to hito_db_backup_$TIMESTAMP.sql"
```

**Windows (backup.bat):**
```batch
@echo off
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
mysqldump -u root hito_db > hito_db_backup_%mydate%_%mytime%.sql
echo ✅ Database backed up!
```

---

## 8. Add Search Functionality

**Problem:** Users can't search for products by name.

**Enhancement:** Add a search bar to the menu page.

**File to Update:** `backend/src/main/java/com/example/hito/repository/ProductRepository.java`

Add this method:
```java
List<Product> findByNameContainingIgnoreCase(String name);
```

**File to Update:** `backend/src/main/java/com/example/hito/controller/ProductController.java`

Add this endpoint:
```java
@GetMapping("/search")
public ResponseEntity<List<Product>> searchProducts(@RequestParam String q) {
    if (q == null || q.isBlank()) {
        return ResponseEntity.badRequest().build();
    }
    List<Product> products = productService.searchProducts(q);
    return ResponseEntity.ok(products);
}
```

**File to Update:** `backend/src/main/java/com/example/hito/service/ProductService.java`

Add this method:
```java
public List<Product> searchProducts(String query) {
    return productRepository.findByNameContainingIgnoreCase(query);
}
```

**File to Update:** `frontend/menu.html` (add a search input)

```html
<div class="search-bar" style="margin-bottom: 2rem;">
    <input type="text" id="searchInput" placeholder="Search products..." 
           onkeyup="searchProducts(this.value)" 
           style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
</div>
```

**Add to `frontend/js/products.js`:**

```javascript
async function searchProducts(query) {
    if (!query.trim()) {
        loadProducts(); // Show all if empty
        return;
    }
    
    try {
        const products = await fetch(
            `http://localhost:8080/api/products/search?q=${encodeURIComponent(query)}`
        ).then(r => r.json());
        
        renderProducts(products);
    } catch (err) {
        console.error('Search error:', err);
    }
}
```

---

## 9. Add Order Status Tracking

**Enhancement:** Let customers track their order status.

**File to Create:** `frontend/track-order.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Track Order — Hito House</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<nav class="navbar scrolled">
    <!-- ... navbar ... -->
</nav>

<div class="container" style="padding: 3rem 0;">
    <h2>Track Your Order</h2>
    <input type="text" id="orderIdInput" placeholder="Enter Order ID" 
           style="padding: 10px; margin-right: 10px;">
    <button onclick="trackOrder()" class="btn btn-primary">Track</button>

    <div id="orderStatus" style="margin-top: 2rem; display: none;">
        <!-- Order details will render here -->
    </div>
</div>

<script>
async function trackOrder() {
    const orderId = document.getElementById('orderIdInput').value.trim();
    if (!orderId) {
        showToast('❌ Please enter an Order ID', 'error');
        return;
    }

    try {
        const order = await fetch(`http://localhost:8080/api/orders/${orderId}`)
            .then(r => {
                if (!r.ok) throw new Error('Order not found');
                return r.json();
            });

        const statusDisplay = document.getElementById('orderStatus');
        statusDisplay.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 10px;">
                <h3>${order.customerName}'s Order</h3>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Total:</strong> ₱${order.totalAmount}</p>
                <p><strong>Address:</strong> ${order.address}</p>
                <p><strong>Contact:</strong> ${order.contactNumber}</p>
            </div>
        `;
        statusDisplay.style.display = 'block';
    } catch (err) {
        showToast('❌ Order not found', 'error');
    }
}
</script>

</body>
</html>
```

---

## 10. Production Deployment Checklist

When ready to deploy to production:

- [ ] Change `spring.jpa.hibernate.ddl-auto=validate` (not `update`)
- [ ] Set `spring.jpa.show-sql=false` (don't log all SQL)
- [ ] Use a strong database password
- [ ] Enable HTTPS (SSL certificate)
- [ ] Move API to a real domain (not localhost:8080)
- [ ] Add rate limiting to prevent abuse
- [ ] Set up regular database backups
- [ ] Add monitoring/alerting for errors
- [ ] Test all endpoints with invalid data (security)
- [ ] Enable production logging (not DEBUG level)

---

**Pick whichever improvements fit your needs!** 🚀
