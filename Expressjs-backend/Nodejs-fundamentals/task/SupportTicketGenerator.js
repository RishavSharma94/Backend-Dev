const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const { name, issue, priority } = parsedUrl.query;

  if (pathname === "/complain") {

    // 1️⃣ Ticket ID
    const ticketId = "TKT-" + Math.floor(Math.random() * 100000);

    // 2️⃣ Log format
    const log = `
    Ticket ID: ${ticketId}
    Name: ${name}
    Issue: ${issue}
    Priority: ${priority}
    ------------------
    `;

    // 3️⃣ File decide
    const fileName = priority === "high"
      ? "URGENT.txt"
      : "normal_complaints.txt";

    // 4️⃣ Save complaint
    fs.appendFile(fileName, log, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to save complaint" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          ticketId,
          message: "We will solve your issue soon"
        }));
      }
    });

  } else {
    // ❗ Unknown route
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
// http://localhost:3000/complain?name=Satvik&issue=LoginFail&priority=high
