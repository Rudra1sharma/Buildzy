'use client'

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
import { useEffect, useState } from "react";
import axios from "axios";
import Invitation from "@/Models/invitationModel";

const userid = '678a8285d7a0d7ac795afa4e';

const invitations = [
  { id: 1, teamName: "Pixel Perfectors", inviter: "Alex Johnson", _id: '234242'},
  { id: 2, teamName: "Creative Minds", inviter: "Sam Smith",_id: '234242'},
  { id: 3, teamName: "Design Wizards", inviter: "Emma Watson",_id: '234242' },
  { id: 4, teamName: "Color Harmony", inviter: "Olivia Brown",_id: '234242' },
  { id: 5, teamName: "Digital Dreamers", inviter: "Liam Wilson" ,_id: '234242'},
];

export default function TeamInvitations() {
  const [invites, setInvites] = useState<Array<{}>>([]);

  const getInvites = async () => {
    try {
      const response = await axios.get(`/api/invitation/getInvite?id=${userid}`);
      setInvites(response.data); // Assuming the response contains an array of invitations
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to fetch invitations");
    }
  };

  useEffect(() => {
    getInvites();
  }, []);

  const acceptInvite = async (invitationId: string) => {
    // console.log("id: ", id)
    try {
      invitationId = '678a8285d7a0d7ac795afa4e'
      const response = await axios.post(`/api/invitation/acceptInvite`, { invitationId, userid });
      alert(response.data.message)
      getInvites(); // Refresh the list of invitations
    } catch (error: any) {
      console.log(error)
    }
  };

  const declineInvite = async (invitationId: string) => {
    try {
      invitationId = '678a8285d7a0d7ac795afa4e'
      const response = await axios.post(`/api/invitation/declineInvite`, {
        userid, invitationId
      });
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to decline invitation");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Invitations</CardTitle>
        <CardDescription>Pending invitations to join teams</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[173px] pr-4">
          <div className="space-y-4">
            {invitations.map((invitation: any) => (
              <div
                key={invitation.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {invitation.teamName.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{invitation.teamName}</p>
                    <p className="text-sm text-muted-foreground">
                      Invited by {invitation.inviter}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => acceptInvite(invitation._id)} // Pass a callback
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => declineInvite(invitation._id)} // Pass a callback
                  >
                    <X className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}