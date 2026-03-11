import pool from "./db.js";

const pages = [
  { name: "Home", path: "/" },
  { name: "New Item", path: "/new" },
];

export const getAllItemsAndCategories = async (req, res) => {
  const selectedQuery = req.query.category;

  try {
    let sql = "SELECT * FROM inventory";
    let params = [];

    if (selectedQuery) {
      sql += ` WHERE category = $1`;
      params.push(selectedQuery);
    }

    console.log

    const result = await pool.query(sql, params);

    const categories = await getAllCategories();

    res.render("homepage", { pages, items: result.rows, categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query(
      "SELECT distinct category FROM inventory ORDER BY category asc",
    );

    return categories.rows.map((row) => row.category);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
};

export const formPage = (req, res) => {
  res.render("form", { pages });
};

export const postNewMessage = async (req, res) => {
  const {title, price, description, category, image } = req.body;
  if (title && price && description && category && image) {
    try {
      const result = await pool.query('select id from inventory order by id desc limit 1');
      const maxid = result.rows[0].id;
      await pool.query(
        "insert into inventory (id, title, price, description, category, image) values ( $1, $2, $3, $4, $5, $6) returning *",
        [maxid+1, title, price, description, category, image],
      );
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Database Error");
    }
  } else {
    return res.status(400).send("Both text and user are required.");
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM inventory where id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(400).send("Item not found");
    }

    return res.status(200).send("Item deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
