import express from "express";
import router from "./routes/route";
import { errorMiddleware } from "./middleware/errorMiddleware";
import cors from "cors";
import "dotenv/config";


const app = express();
const port = Number(process.env.PORT) || 4000;
const frontendUrl = process.env.FRONTEND_URL;

console.log("fe url", frontendUrl);

app.use(express.json());

app.use(cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use('/api', router);

app.use(errorMiddleware);


app.listen(port, () => {
    console.log(`http server running on port ${port}`);
});