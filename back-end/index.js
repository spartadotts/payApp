const express = require("express");
const app = express();
import { rootRouter } from "./routes";
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/v1",rootRouter);

const PORT = 3000;



app.listen(PORT,()=>{
    console.log(`Server is running port ${PORT}`)
});


