const getUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
   return data;
};
getUsers().then(data=>){
data.forEach(user => {
  console.log(user.name, user.email);
});});
