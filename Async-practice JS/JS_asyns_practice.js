// Task1
function checkOrderStatus(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof orderId === "number") {
        resolve("Order Shipped");
      } else {
        reject("Invalid Order ID");
      }
    }, 1000);
  });
}

async function getOrderStatus(orderId) {
  try {
    const result = await checkOrderStatus(orderId);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// Test cases
getOrderStatus(101);     // Order Shipped
getOrderStatus("ABC");  // Invalid Order ID



// Task 2
// Function 1: Get User
function getUser(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Rahul",
        type: "Premium"
      });
    }, 1500);
  });
}

// Function 2: Check Subscription
function checkSubscription(user) {
  return new Promise((resolve, reject) => {
    if (user.type === "Premium") {
      resolve("Access Granted to Netflix");
    } else {
      reject("Please Subscribe");
    }
  });
}

// Consumer Function (Sequential Await)
async function authenticateUser(username) {
  try {
    const user = await getUser(username);          // Step 1
    const result = await checkSubscription(user);  // Step 2
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// Test
authenticateUser("rahul123");





//    Task3
// Function 1: Fetch User
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Rahul",
        isPremium: true
      });
    }, 1000);
  });
}

// Function 2: Fetch Orders
function fetchOrders(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { item: "Laptop", price: 1000, status: "delivered" },
        { item: "Phone", price: 500, status: "pending" }
      ]);
    }, 2000);
  });
}

// Dashboard Function
async function displayDashboard(id) {
  try {
    // 1. Await both functions
    const user = await fetchUser(id);
    const orders = await fetchOrders(id);

    // 2. Filter delivered orders
    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered"
    );

    // 3. Apply 10% discount if user is premium
    const discountedOrders = deliveredOrders.map((order) => {
      let finalPrice = order.price;
      if (user.isPremium) {
        finalPrice = order.price * 0.9; // 10% discount
      }
      return finalPrice;
    });

    // 4. Calculate total
    const totalAmount = discountedOrders.reduce(
      (sum, price) => sum + price,
      0
    );

    // Print result
    console.log(`Welcome ${user.name} 👋`);
    console.log(`Total Amount of Delivered Items: $${totalAmount}`);
  } catch (error) {
    console.log("Error:", error);
  }
}

// Test
displayDashboard(1);
