import WebSocket from 'ws';
import { Rooms, SocketToRoomId, SocketToUserId } from '../state';
import { prisma } from '@conet/database';

export async function handleJoin(roomId: string, socket: WebSocket) {
  const userId = SocketToUserId.get(socket);

  if (!userId) throw new Error("unauthorized user");

  try {
    const roomExists = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!roomExists) {
      throw new Error('room does not exist');
    }

    const alreadyMember = await prisma.userRoom.findUnique({
      where: {
        roomId_userId: {
          roomId,
          userId,
        },
      },
    });

    if (!alreadyMember) {
      await prisma.userRoom.create({
        data: {
          userId,
          roomId,
        },
      });
    }

    if (!Rooms.has(roomId)) {
      Rooms.set(roomId, new Set());
    }

    SocketToRoomId.set(socket, roomId);
    Rooms.get(roomId)?.add(socket);

    socket.send(
      JSON.stringify({
        type: 'join_success',
        payload: {
          roomId,
        },
      }),
    );

  } catch (err: any) {
    console.error(`[Join Error] Room: ${roomId} | Message:`, err.message || err);

    if(socket.readyState == socket.OPEN){
        socket.send(JSON.stringify({
            type: "join_error",
            payload: {
                message: err.message
            }
        }));
    }
    
  }
}
