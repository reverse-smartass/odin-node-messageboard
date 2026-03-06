import express from "express";
import path from "path";
const app = express();
import messages from "./db.js";

const port = process.env.PORT || 3000;
const pages = [
  { name: "Home", path: "/" },
  { name: "New Message", path: "/new" }
];

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));
app.use(express.static(path.join(process.cwd(),"public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("homepage", { pages , messages });
});

app.get("/new", (req, res) => {
  res.render("form", { pages });
});

app.post("/new", (req, res) => {
  const { text, user } = req.body;
  if (text && user) {
    messages.push({ text, user, added: new Date() });
  }
  res.redirect("/");
});
   

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found", pages });
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running on port ${port}`);
});
