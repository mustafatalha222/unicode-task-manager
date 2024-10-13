import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'

// Extend Node.js global type to include `io` for TypeScript support
declare global {
  // eslint-disable-next-line no-var
  var io: Server | undefined
}

export const initSocket = (httpServer: HttpServer): Server => {
  if (!global.io) {
    global.io = new Server(httpServer)
    global.io.on('connection', (socket: Socket) => {
      socket.on('joinRoom', (userId: string) => {
        socket.join(userId)
      })
    })
  }

  return global.io
}

export const getSocket = (): Server => {
  if (!global.io) {
    throw new Error('Socket.io is not initialized!')
  }
  return global.io
}
