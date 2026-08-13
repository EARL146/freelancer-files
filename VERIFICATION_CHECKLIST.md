# Hito House — Verification Checklist

Use this checklist to verify your setup is complete and working.

---

## ✅ Pre-Setup Checklist

Before you start, verify you have:

- [ ] Java 17+ installed
  ```bash
  java -version
  # Should show: version "17.x.x"
  ```

- [ ] Maven installed
  ```bash
  mvn -version
  # Should show: Apache Maven 3.x.x
  ```

- [ ] MySQL running
  ```bash
  # Windows: Check XAMPP Control Panel
  # Mac/Linux: brew services list
  # Should show: MySQL is running
  ```

- [ ] phpMyAdmin accessible
  ```
  http://localhost/phpmyadmin
  # Should load without errors
  ```

- [ ] Terminal/Command Prompt ready
  ```bash
  pwd  # or 'cd' on Windows
  # You can navigate directories
  ```

---

## ✅ Database Setup Checklist

- [ ] Database `hito_db` created in phpMyAdmin
  ```sql
  SELECT DATABASE();  -- Should show: hito_db
  SHOW TABLES;        -- May be empty at first
  ```

- [ ] No MySQL errors in MySQL logs
  ```bash
  # Windows: Check XAMPP → MySQL → Stop/Start
  # Mac/Linux: tail -f /usr/local/var/log/mysql/error.log
  ```

---

## ✅ Backend Setup Checklist

### Project Structure
- [ ] `backend/pom.xml` exists
  ```bash
  ls -la backend/pom.xml  # Should exist
  ```

- [ ] All Java source files present
  ```bash
  find backend/src -name "*.java" | wc -l
  # Should show at least 17 files
  ```

- [ ] `application.properties` configured
  ```bash
  cat backend/src/main/resources/application.properties
  # Should have: spring.datasource.url and MySQL config
  ```

### Backend Compilation
- [ ] Backend compiles without errors
  ```bash
  cd backend
  mvn clean compile
  # Should end with: BUILD SUCCESS
  ```

- [ ] All dependencies downloaded
  ```bash
  mvn dependency:tree
  # Should list Spring Boot, MySQL driver, validation, etc.
  ```

### Backend Runtime
- [ ] Backend starts successfully
  ```bash
  mvn spring-boot:run
  # Should end with: "Tomcat started on port(s): 8080"
  ```

- [ ] Backend responds to requests
  ```bash
  curl http://localhost:8080/api/products
  # Should return: [] (empty array) or JSON
  # NOT an error page
  ```

- [ ] CORS is working
  ```bash
  curl -i http://localhost:8080/api/products | grep Access-Control
  # Should show CORS headers
  ```

### Database After Backend Starts
- [ ] Tables were auto-created
  ```sql
  # In phpMyAdmin, run:
  USE hito_db;
  SHOW TABLES;
  # Should show: contact_message, order_item, orders, products
  ```

- [ ] Tables have correct structure
  ```sql
  DESCRIBE products;
  DESCRIBE orders;
  DESCRIBE order_item;
  DESCRIBE contact_message;
  # Each should show the correct columns
  ```

---

## ✅ Frontend Setup Checklist

### File Structure
- [ ] Frontend files exist
  ```bash
  ls -la frontend/
  # Should show: index.html, menu.html, checkout.html, css/, js/
  ```

- [ ] All JS files present
  ```bash
  ls -la frontend/js/
  # Should show: main.js, products.js, cart.js
  ```

- [ ] CSS file present
  ```bash
  ls -la frontend/css/
  # Should show: style.css
  ```

### Frontend Server
- [ ] Local web server can start
  ```bash
  cd frontend
  python -m http.server 3000
  # Should show: "Serving HTTP on 0.0.0.0 port 3000"
  ```

- [ ] Website is accessible
  ```
  http://localhost:3000
  # Should load without errors (check browser console)
  ```

---

## ✅ Integration Checklist

### Full Flow Test
- [ ] Homepage loads with navigation
  - [ ] See Hito House logo and name
  - [ ] See navigation links (Home, Menu, About, Contact)
  - [ ] See shopping cart icon with count (0)

- [ ] Menu page loads products
  - [ ] Click "Menu" in navbar
  - [ ] See product list (real from backend or sample data)
  - [ ] Each product shows: name, price, category, image/emoji
  - [ ] See "Add to Cart" button on each

- [ ] Add to Cart works
  - [ ] Click "Add to Cart" on any product
  - [ ] See success toast notification
  - [ ] Cart count updates to (1)
  - [ ] Click cart icon → see product in sidebar

- [ ] Cart operations work
  - [ ] Can increase quantity (+ button)
  - [ ] Can decrease quantity (- button)
  - [ ] Can remove item (trash icon)
  - [ ] Total updates correctly
  - [ ] Empty cart shows message when all removed

- [ ] Checkout form works
  - [ ] Click "Proceed to Checkout"
  - [ ] Checkout page loads
  - [ ] See order summary with items
  - [ ] See checkout form with fields:
    - [ ] Full Name
    - [ ] Contact Number
    - [ ] Address
    - [ ] Order Notes (optional)
  - [ ] See total amount

- [ ] Order submission works
  - [ ] Fill in all required fields
  - [ ] Click "Place Order"
  - [ ] See success message
  - [ ] Cart empties
  - [ ] **NO ERRORS in browser console (F12)**

### Database Verification
- [ ] Order appears in database
  ```bash
  # Open phpMyAdmin → hito_db → orders table
  # Should see your order with:
  # - customer_name
  # - contact_number
  # - address
  # - total_amount
  # - status: PENDING
  # - created_at: current timestamp
  ```

- [ ] Order items appear in database
  ```bash
  # Check order_item table
  # Should see items linked to the order
  # - order_id
  # - product_id
  # - product_name
  # - quantity
  # - price
  ```

### Contact Form (Optional)
- [ ] Contact form works
  - [ ] Scroll to Contact section
  - [ ] Fill in: Name, Contact, Message
  - [ ] Click "Send Message"
  - [ ] See success toast
  - [ ] Data appears in `contact_message` table

---

## ✅ Error Scenarios (Should Be Handled)

Test that error handling works:

- [ ] Backend offline → Products show sample data
  ```bash
  # Stop backend (Ctrl+C)
  # Refresh menu page
  # Should still show sample Hito products
  # (Not an error page)
  ```

- [ ] Invalid form data → Validation error
  ```bash
  # On checkout, try:
  # - Empty name → Error shown
  # - Empty contact → Error shown
  # - Empty address → Error shown
  # Backend returns 400, frontend shows error
  ```

- [ ] Network error → User-friendly message
  ```bash
  # Simulate by blocking API:
  # Close backend
  # Try checkout → See "Could not connect" message
  # (Not technical error)
  ```

---

## ✅ Performance Checklist

- [ ] Page load time < 2 seconds
  - [ ] Open DevTools (F12)
  - [ ] Go to Network tab
  - [ ] Refresh page
  - [ ] Check load time (all assets loaded)

- [ ] Animations are smooth
  - [ ] Hover effects work smoothly
  - [ ] Transitions don't stutter
  - [ ] No console warnings

- [ ] No console errors
  ```bash
  # F12 → Console
  # Should be empty or only INFO logs
  # NO red error messages
  ```

- [ ] No network errors
  ```bash
  # F12 → Network
  # All requests should be green (200 status)
  # No red (404, 500) responses
  ```

---

## ✅ Browser Compatibility Check

Test in different browsers (if possible):

- [ ] Chrome/Edge → Works
- [ ] Firefox → Works
- [ ] Safari → Works

---

## ✅ Mobile Responsiveness Check

- [ ] Hamburger menu appears on mobile
  - [ ] Open DevTools (F12)
  - [ ] Click mobile device icon (mobile view)
  - [ ] See hamburger ☰ icon
  - [ ] Click it → shows menu

- [ ] Products display correctly on mobile
  - [ ] One column on mobile
  - [ ] Two columns on tablet
  - [ ] Multiple columns on desktop

- [ ] Checkout form readable on mobile
  - [ ] No horizontal scrolling
  - [ ] Input fields are large enough
  - [ ] Buttons clickable

---

## ✅ Final Verification Commands

Run these to verify everything:

```bash
# 1. Verify Java
java -version

# 2. Verify Maven
mvn -version

# 3. Verify MySQL is running
mysql -u root -p
SELECT 1;
EXIT;

# 4. Verify database exists
mysql -u root -p hito_db -e "SHOW TABLES;"

# 5. Verify backend can compile
cd backend && mvn clean compile && cd ..

# 6. Start backend in new terminal
cd backend
mvn spring-boot:run
# Should see: "Tomcat started on port(s): 8080"

# 7. In another terminal, start frontend
cd frontend
python -m http.server 3000
# Should see: "Serving HTTP on..."

# 8. Test API
curl http://localhost:8080/api/products

# 9. Open browser and test
# http://localhost:3000
```

---

## ✅ If All Checks Pass

**Congratulations!** ✨

Your Hito House website is fully functional with:
- ✅ Professional frontend
- ✅ Working backend API
- ✅ Database persistence
- ✅ Shopping cart
- ✅ Order management
- ✅ Proper error handling
- ✅ Responsive design

You can now:
1. **Enhance** → Add features from IMPROVEMENTS_GUIDE.md
2. **Customize** → Change branding, add images, modify pricing
3. **Deploy** → Move to production (see IMPROVEMENTS_GUIDE.md for checklist)
4. **Extend** → Build admin dashboard, add payments, etc.

---

## ❌ If Something Fails

**Use this decision tree:**

```
Backend won't start?
├─ Check: mvn clean compile
├─ Check: java -version (need 17+)
├─ Check: application.properties exists
├─ Check: MySQL is running
└─ Check: application.properties database URL

Frontend shows blank?
├─ Check: Browser console (F12)
├─ Check: Python/Node server is running
├─ Check: http://localhost:3000 (not 127.0.0.1)
└─ Check: No network errors (F12 → Network tab)

Products won't load?
├─ Check: Backend is running
├─ Check: MySQL has products table
├─ Check: curl http://localhost:8080/api/products
└─ If all fail: Should show sample data (fallback)

Orders won't submit?
├─ Check: All form fields filled
├─ Check: Browser console for validation errors
├─ Check: Backend logs (terminal)
└─ Check: MySQL connection and permissions

Cart won't persist?
├─ Check: localStorage not disabled
├─ Check: Browser privacy settings
├─ Check: Open DevTools (F12) → Application → Local Storage
└─ Try incognito window

```

**Still stuck?** → See DEBUGGING_REFERENCE.md

---

## ✅ Sign-Off

When everything passes this checklist, you're ready to:
- ✅ Use the website
- ✅ Modify the code
- ✅ Add new features
- ✅ Deploy to production

**Well done! 🎉**

---

**Verification Date:** _______________

**All Checks Passed:** ☐ Yes ☐ No

**Notes:**
```
[Your notes here]
```
