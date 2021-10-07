const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

app.get("*", (req, res) => {
  const fileName = req.url.slice(1).endsWith(".css")
    ? req.url
    : `${req.url}.html`;

  const filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : fileName
  );

  const errorPage = path.join(__dirname, "public", "404.html");

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else res.sendFile(errorPage);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
