import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {userRouter} from './routes/users.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(
  "mongodb+srv://admin:admin101@recepies.ef81coy.mongodb.net/recepies?retryWrites=true&w=majority"
);

app.listen(3001, () => {
  console.log(`server listening on 3001`);
});
