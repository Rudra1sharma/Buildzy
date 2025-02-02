'use client';

import { useEffect, useState } from 'react';
import { UserPlus, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { Invitation } from "@/types/interfaces";
import { useAuth } from "@/context/AuthContext";
import mongoose, { Types } from 'mongoose';


interface Invites {
  id: number;
  _id: Types.ObjectId;
  inviter: string;
  receiver: string;
  team: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export default function TeamInvitations() {
  const { user } = useAuth();
  const [invites, setInvites] = useState<Invites[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (isMounted && user?._id) {
      getInvites(user._id);
    }
  }, [isMounted, user]);

  const getInvites = async (userId: any) => {
    try {
      const response = await axios.get(`/api/invitation/getInvite?id=${userId}`);
      setInvites(response.data.invitations);
      console.log(response.data.invitations)
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to fetch invitations");
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (invitationId: any) => {
    if (!user?._id) return;
    try {
      const response = await axios.post(`/api/invitation/acceptInvite`, {
        invitationId,
        userid: user._id,
      });
      alert(response.data.message);
      getInvites(user._id);
    } catch (error: any) {
      console.log(error);
    }
  };

  const declineInvite = async (invitationId:any) => {
    if (!user?._id) return;
    try {
      const response = await axios.post(`/api/invitation/declineInvite`, {
        userid: user._id,
        invitationId,
      });
      alert(response.data.message);
      getInvites(user?._id);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to decline invitation");
    }
  };

  // ✅ Prevent rendering until the component is mounted
  // if (!isMounted) {
  //   return null; 
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Invitations</CardTitle>
        <CardDescription>Pending invitations to join teams</CardDescription>
      </CardHeader>
      <CardContent className="h-[197px]">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading Invitations...</p>
        ) : invites?.length === 0 ? (
          <p>No pending invitations.</p>
        ) : (
          <ScrollArea className="h-[180px] pr-4 mb-4">
            <div className="space-y-4">
              {invites?.map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{invitation.team.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{invitation.team}</p>
                      <p className="text-sm text-muted-foreground">
                        Invited by {invitation.inviter}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => acceptInvite(invitation._id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => declineInvite(invitation._id)}>
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
