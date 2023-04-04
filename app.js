import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";

import usersRouter from "./routes/users.js";

dotenv.config();
const app = express();

app.use(cors());
app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  console.log("Root Route");
  res.json({ message: "hello world!" });
});

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  console.error("err: ", err);
  res.status(500).send(err.message);
});

app.use('*', (req, res) => {
  res.status = 404;
  res.json({ error: 'NOT_FOUND', message: '유효하지 않은 요청입니다.' });
})

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
