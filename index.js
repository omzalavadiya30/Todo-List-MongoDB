const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const Todo = require("./models/Todo");

dotenv.config();
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

app.get("/", async (req, res) => {
  const tasks = await Todo.find();
  const { error, message } = req.query;
  res.render("list", { todos: tasks, error, message });
});

app.post("/add", async (req, res) => {
  const { task, priority } = req.body;
  if (!task.trim()) return res.redirect("/?error=Todo cannot be empty");
  await Todo.create({ title: task, priority });
  res.redirect("/?message=Todo added successfully");
});

app.put("/edit/:id", async (req, res) => {
  const { task, priority } = req.body;
  await Todo.findByIdAndUpdate(req.params.id, { title: task, priority });
  res.redirect("/?message=Todo updated successfully");
});

app.delete("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/?message=Todo deleted successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
