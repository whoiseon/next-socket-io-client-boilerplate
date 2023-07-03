import { io, Socket as SocketIOClient } from 'socket.io-client';

class Socket {
  private socket: SocketIOClient;
  private baseUrl: string = 'http://localhost:3060';

  constructor() {
    this.socket = io(this.baseUrl, {
      transports: ['websocket'],
    });
    this.setupEventListeners();
  }

  public connect() {
    if (this.socket.disconnected) {
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  private setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });

    this.socket.on('chat message', (message: string) => {
      //   console.log(message);
    });
  }

  public sendMessage(message: string) {
    this.socket.emit('chat message', message);
  }

  public onMessage(callback: (message: string) => void) {
    this.socket.on('chat message', callback);
  }
}

const socket = new Socket();

export default socket;
