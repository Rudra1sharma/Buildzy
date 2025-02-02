import { Types } from "mongoose";

export interface Team {
  _id: Types.ObjectId;
  leader: Types.ObjectId;
  Members: Member[];
  description?: string;
  invitations?: Types.ObjectId[];
  projects?: Types.ObjectId[];
  teamName: string;
  createdAt: Date;
  updatedAt?: Date;
}
export interface Project {
  _id: Types.ObjectId;
  name: Types.ObjectId;
  owner: Types.ObjectId;
  teamId: Types.ObjectId;
  canvas: Types.ObjectId[];
  description?: string;
}

export interface Member {
  memberId: Types.ObjectId;
  joinedAt?: Date;
}
export interface Canvas {
  _id: Types.ObjectId;
  name: string;
  image?: string;
  project: Types.ObjectId;
}

export interface Invitation {
  _id: Types.ObjectId;
  receiver: Types.ObjectId;
  inviter: Types.ObjectId;
  team: Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Notification {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  message: string;
  read?: boolean;
}

export interface User {
  _id: Types.ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  projects?: Types.ObjectId[];
  teams?: Types.ObjectId[];
  canvas?: Types.ObjectId[];
  invitations?: Types.ObjectId[];
  notification?: Types.ObjectId[];
}