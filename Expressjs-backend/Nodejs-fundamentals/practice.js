const user={user:"Rahul", email:"rahul@gmail.com", phone:"7896576432", social:{
fb:"https:// fb.com", insta:"https://insta.com"}};

// const userName= user.name;
// const email = user.email;

const {name,email,phone,social}=user;
const updateUser={...user, address:"Mathura"}
const user1= user;
user1.name="Ajay";
console.log(user.name);

// console.log("updateData",updateUser);
 

const {password,...publicData}=user;
console.log("publicData",publicData);

const numbers=[1,2,3,4,5]

const newNumbers=numbers.map((number)=>number*2);
console.log(newNumbers);

const sumofNumbers=numbers.reduce((sum,number)=>sum+number,0);
console.log("sumofNumbers",sumofNumbers);