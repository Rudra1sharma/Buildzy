"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Types } from "mongoose";
import { useEffect, useState } from 'react';
import axios from 'axios';
interface Team {
  _id: Types.ObjectId;
  leader: Types.ObjectId;
  Members: {
    memberId: Types.ObjectId;
    joinedAt: Date;
  }[];
  description: string;
  invitations: Types.ObjectId[];
  projects: Types.ObjectId[];
  teamName: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function TeamDetails({ teamId }: { teamId: string }) {
  // In a real application, you would fetch team details based on the teamId
  // const team = {
  //   name: 'Design Wizards',
  //   description: 'A team of creative designers working on various projects.',
  //   createdAt: 'January 1, 2023',
  //   members: 5,
  //   projects: 12,
  // }

  const [team,setteam] = useState<Team | null>()

  useEffect(()=>{
    const findteam= async(id:any)=>{
      try{
        const res= await axios.get("/api/team/getteambyid", {
          params: { teamId: teamId },
        });
        if(res.data.success){
          console.log(res.data.team);
          setteam(res.data.team);
        }
      }
      catch(e){
        console.log(e);
      }
    }
    findteam(teamId)
  },[])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback>{team?.teamName?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{team?.teamName}</CardTitle>
              <CardDescription>{team?.description}</CardDescription>
            </div>
          </div>
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Team
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium">Created</p>
            <p className="text-sm text-muted-foreground"> {team?.createdAt ? new Date(team.createdAt).toLocaleDateString() : "N/A"}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Members</p>
            <p className="text-sm text-muted-foreground">{team?.Members?.length}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Projects</p>
            <p className="text-sm text-muted-foreground">{team?.projects?.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

