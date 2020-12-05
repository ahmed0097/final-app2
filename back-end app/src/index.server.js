const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');

//routes

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
//const bodyParser = require("body-parser");

//envirenment variable
env.config();

//mongodb connection

const uri =
  "mongodb+srv://adminzgh:ahmed1997@cluster0.rho04.mongodb.net/webapp?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log(`mongodb connected..`);
  })
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
