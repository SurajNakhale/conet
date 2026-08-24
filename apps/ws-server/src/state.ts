import { WebSocket } from "ws";

export let Rooms = new Map<string, Set<WebSocket>>();
export let SocketToRoomId = new Map<WebSocket, string>();
export let SocketToUserId = new Map<WebSocket, string>();
