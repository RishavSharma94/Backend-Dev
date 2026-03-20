const http = require("http");
const obj = {
    name: "John Doe",
    age: 30,
    city: "New York"
};

const server = http.createServer((req, res) => {
    // res.writeHead(200, {'Content-Type': 'text/json'});
    // res.end(JSON.stringify(obj));

    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>Welcome</h1>');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<h1>About Us</h1>');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/json'});
            res.end(JSON.stringify({username:"", phone:""}));
    }
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});