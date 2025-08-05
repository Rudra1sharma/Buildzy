import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res?.socket?.server?.io) {
    const io = new Server(res?.socket?.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('join-editor', (editorId) => {
        socket.join(editorId);
        console.log(`Client joined editor: ${editorId}`);
      });

      socket.on('editor-change', (data) => {
        socket.to(data.editorId).emit('editor-update', data.changes);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  res.end();
};

export const GET = ioHandler;
export const POST = ioHandler;