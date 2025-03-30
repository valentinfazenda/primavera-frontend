import { WebSocketResponse } from '@/types/websocketResponse';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}`;

export class WebSocketService {
  private socket: Socket | null;
  private token: string;

  constructor(token: string) {
    this.socket = null;
    this.token = token;
  }

  // Connect to the WebSocket server with authentication
  connect(): void {
    if (!this.token) {
      console.error('WebSocket Service: Token not found');
      return;
    }

    this.socket = io(SERVER_URL, {
      auth: {
        token: this.token,
      },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('WebSocket Service: Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket Service: Disconnected from server');
    });

    this.socket.on('error', (error: Error) => {
      console.error('WebSocket Service: Error', error);
    });
  }

  // Send a message through the WebSocket connection
  sendMessage(message: string | object): void {
    if (!this.socket) {
      console.error('WebSocket Service: Socket not initialized');
      return;
    }
    this.socket.emit('message', message);
  }

  // Listen for incoming messages
  onMessage(callback: (data: WebSocketResponse) => void): void {
    if (!this.socket) {
      console.error('WebSocket Service: Socket not initialized');
      return;
    }

    this.socket.on('message', (data: string | object) => {
      if (typeof data === 'object' && data !== null) {
        callback(data as WebSocketResponse);
      } else {
        console.error('Unexpected WebSocket message type:', typeof data);
      }
    });
  }

  // Close the WebSocket connection
  close(): void {
    if (this.socket) {
      this.socket.close();
      console.log('WebSocket Service: Connection closed');
    }
  }
}

// Exporting the WebSocketService class directly for instantiation
export default WebSocketService;
