import { io } from "socket.io-client"
import { URL } from './URL.js'

export const socket = io(URL);