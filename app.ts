import "reflect-metadata";
import express = require("express");
import { Connection, createConnection } from "typeorm";
import ErrorMiddleware from "./middlewares/error.middleware";
import cors = require("cors");

require("dotenv").config();

const familyRouter = require("./routes/family.route");
const placementRouter = require("./routes/placement.route");
const criteriaRouter = require("./routes/criteria.route");

export const connection: Promise<Connection> = createConnection();

const app = express();
const port = Number(process.env.PORT) || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3001" }));

app.use("/family", familyRouter);
app.use("/placement", placementRouter);
app.use("/criteria", criteriaRouter);

app.use((req, res, next) => {
  next({
    status: 404,
    message: "Not Found",
  });
});

app.use(ErrorMiddleware.use);
//handle unhandledRejection and Exception
// process.on('unhandledRejection', () => {
//   console.log('CATCHED');
// });

app.listen(port, "127.0.0.1", () =>
  console.log(`app listening at http://127.0.0.1:${port}`)
);

module.exports = app;
