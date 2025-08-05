import { Server as SocketIOServer } from 'socket.io';
import { NextResponse } from 'next/server';

let io: SocketIOServer;

export async function GET(req: Request) {
  if (!io) {
    console.log('Initializing Socket.io server...');
    const httpServer = (req as any).socket.server;
    
    if (!httpServer) {
      console.error('HTTP server not found');
      return NextResponse.json({ error: 'Server not initialized' }, { status: 500 });
    }

    io = new SocketIOServer(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      },
      transports: ['websocket', 'polling']
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('join-editor', (editorId: string) => {
        console.log(`Client ${socket.id} joining editor: ${editorId}`);
        socket.join(editorId);
      });

      socket.on('editor-change', (data: { editorId: string; changes: any }) => {
        console.log(`Broadcasting changes for editor ${data.editorId}`);
        socket.to(data.editorId).emit('editor-update', data.changes);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    });
  }

  return NextResponse.json({ status: 'Socket.io server running' });
}

export const POST = GET; 