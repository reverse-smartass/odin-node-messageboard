import pool from "./db.js";

const pages = [
  { name: "Home", path: "/" },
  { name: "New Message", path: "/new" },
];

export const getAllMessages = async (req, res) => {

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
};

export const formPage = (req, res) => {
  res.render("form", { pages });
};

export const postNewMessage = async (req, res) => {
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
}
