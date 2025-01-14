const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    // Collect data chunks
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // End of data collection
    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body); // Parse JSON
        console.log(parsedBody); // Log parsed request body
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Request received', data: parsedBody }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

console.log('Server listening on port 9000...');
server.listen(9000);
