import { Router } from 'express';
const userRouter = Router();
import { getAllMessages, postNewMessage, formPage } from './controller';

app.get("/", getAllMessages);

app.get("/new", formPage);

app.post("/new", postNewMessage);


export default userRouter;
