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
