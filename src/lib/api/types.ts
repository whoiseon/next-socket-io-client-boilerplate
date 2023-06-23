export interface User {
  id: number;
  username: string;
  nickname: string;
}

export interface Room {
  id: number;
  code: string;
  name: string;
  description: string;
  lastMessage: string | null;
  timeOfLastMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  managerId: number;
}

export interface Message {
  id: number;
  content: string;
  userId: number;
  roomCode: string;
  timestamp: Date;
  user: User;
}

export interface ApiResponse {
  error: string;
}

export interface GetRoomResponse extends ApiResponse {
  totalCount: number;
  data: Room[];
}

export interface GetRoomUniqueResponse extends ApiResponse {
  data: Room;
}

export interface GetRoomMessageResponse {
  totalCount: number;
  data: Message[];
}

export interface ResponseError {
  name: string;
  message: string;
  statusCode: number;
  payload?: {
    isExpiredToken: boolean;
  };
}
