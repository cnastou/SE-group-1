const http = require('http');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./customerService.db');
let lastTicketID = 0;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const path = reqUrl.pathname;
  const method = req.method;

  // Endpoint for user registration
  if (method === 'POST' && path === '/register-user') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string.
    });
    req.on('end', () => {
      const user = JSON.parse(body);
      // Insert user registration logic here
    });
  } 
  // Endpoint for submitting a ticket
  else if (method === 'POST' && path === '/submit-ticket') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const ticket = JSON.parse(body);
      // Insert ticket submission logic here, including validation and insertion into the database
    });
  } 
  // Endpoint for updating a ticket
  else if (method === 'PUT' && path.startsWith('/update-ticket/')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const ticket = JSON.parse(body);
      const ticketID = path.split('/')[2];
      // Insert ticket update logic here
    });
  } 
  // Endpoint for deleting a ticket
  else if (method === 'DELETE' && path.startsWith('/delete-ticket/')) {
    const ticketID = path.split('/')[2];
    // Insert ticket deletion logic here
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

db.serialize(() => {
  // Check if the 'users' and 'tickets' tables exist; create them if not
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
