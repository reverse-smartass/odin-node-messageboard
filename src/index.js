import express from "express";
import path from "path";
import userRouter from "./router.js";
const app = express();
import { body, validationResult } from "express-validator";


const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter)

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found", pages });
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running on port ${port}`);
});
