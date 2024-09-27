const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' folder

// Route for homepage
app.get("/", (req, res) => {
  res.send(`Working`);
});

// Route to create a file with the current date in the 'files' folder
app.get("/create", (req, res) => {
  const createDate = new Date(); // Get current date
  const day = String(createDate.getDate()).padStart(2, "0"); // Extract and format the day
  const month = String(createDate.getMonth()).padStart(2, "0"); // Extract and format the month (0-11)
  const year = createDate.getFullYear(); // Extract the year
  let fnDate = `${day}-${month}-${year}.txt`;

  // Create a file in the 'files' directory with the formatted date as the name
  fs.writeFile(`./files/${fnDate}`, "dalchawal", (err) => {
    if (err) res.send("Something went wrong");
    else res.send("Created successfully");
  });
});
app.get("/");
app.listen(3000); // Start the server and listen on port 3000
