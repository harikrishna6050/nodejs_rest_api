const http = require('http');
const app = http.createServer();

app.listen(3000, () => {
    console.log("server is running");
});