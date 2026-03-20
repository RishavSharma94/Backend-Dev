console.log("fetching user data from db");
let user;
setTimeout(() => {
  user = {
    name: "Rudra", email: "rudra@gmail.com", phone: "6846",
    social: {
      fb: "https://facebook.com",
      instagram: "https://instagram.com"
    }

  }
  console.log("Settimout task");

}, 0);
Promise.resolve(() => console.log("task3")
)
console.log(user);

const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = {
        1: { name: "raj", email: "raj@gmail.com", address: "agra" },
        2: { name: "raj", email: "raj@gmail.com", address: "agra" }
      };

      const user = users[id];

      if (user) {
        resolve(user);
      } else {
        reject("User not found");
      }
    }, 1000); 
  });
};
fetchUser(1).then(user => console.log(user))