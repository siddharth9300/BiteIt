const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDb } = require("./connection");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
connectDb();
app.use(
  cors({
    origin: ["http://localhost:5173","https://biteit.onrender.com","https://biteit.siddharthjain.me"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", cartRoutes,authRoutes,menuRoutes,orderRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
