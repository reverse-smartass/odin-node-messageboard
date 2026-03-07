import express from "express";
import path from "path";
const app = express();
import pool from "./db.js";

const port = process.env.PORT || 3000;
const pages = [
  { name: "Home", path: "/" },
  { name: "New Message", path: "/new" },
];

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {

  try {
    console.log(pool);
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC",
    );

    res.render("homepage", { pages, messages: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
});

app.get("/new", (req, res) => {
  res.render("form", { pages });
});

app.post("/new", async (req, res) => {
  const { text, user } = req.body;
  if (text && user) {
    try {
      
      await pool.query(
        "insert into messages (msg, username) values ($1, $2) returning *",
        [text, user],
      );
      res.redirect("/");

    } catch (err) {
      console.error(err);
      res.status(500).send("Database Error");
    }
  } else {
    return res.status(400).send("Both text and user are required.");
  }
  
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
