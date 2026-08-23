import express from "express";
import router from "./routes/route";
import { errorMiddleware } from "./middleware/errorMiddleware";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', router);

app.use(errorMiddleware);

app.listen(4000, () => {
    console.log("http server running on port 4000");
});