import express from "express";
import router from "./routes/route";

const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(4000, () => {
    console.log("http server running on port 4000");
});