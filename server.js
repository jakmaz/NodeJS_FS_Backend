const http = require("http");
const app = require("./app/app"); // Correct module import
require("dotenv").config();

const PORT = process.env.port || 3000; // Default to 3000 if not defined in .env

http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
