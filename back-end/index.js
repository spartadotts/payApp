const express = require("express");
const app = express();
import { rootRouter } from "./routes";

app.use("/api/v1",rootRouter);


