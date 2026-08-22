import { Router } from "express";
import { getuser, signin, signup } from "../controllers/authController";
import { createRoom, deleteRoom, getAllRooms, getMessage } from "../controllers/roomController";



const router = Router();



router.post('/signup', signup);
router.post('/signin', signin);
router.post('/room', createRoom);

router.get('/user', getuser);
router.get('/rooms', getAllRooms);
router.get('/room/:roomId/messages', getMessage);

router.delete('/room/:roomId', deleteRoom);


export default router