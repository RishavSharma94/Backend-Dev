const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const { user, pass } = parsedUrl.query;

  if (pathname === "/admin") {

    const ADMIN_USER = "admin";
    const ADMIN_PASS = "1234";

    if (user === ADMIN_USER && pass === ADMIN_PASS) {

      fs.readFile(
        path.join(__dirname, "./admin_dashboard.html"),
        "utf-8",
        (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Server Error");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        }
      );

    } else {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Access Denied");
    }

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  }
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});
// cl : http://localhost:8000/admin?user=admin&pass=1234

// wl : http://localhost:8000/admin?user=admin&pass=0000
