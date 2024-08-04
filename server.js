const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://drsowmisiddha:V8xyZDudGXJJBCpw@cluster0.fnyuesa.mongodb.net/"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error", err);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/user", async (req, res) => {
  try {
    const response = await User.findOne(req.body);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    const response = await user.save();
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
