'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, LogOut, UserPlus, FolderPlus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import toast from 'react-hot-toast';
import axios from 'axios'
import { Team } from '@/types/interfaces';
import { Types } from "mongoose";
import { useAuth } from '@/context/AuthContext';



interface props {
  flag: boolean,
  setflag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TeamOverview({ flag, setflag }: props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true)
  const id = user?._id;
  const [teams, setTeams] = useState<Team[]>([])
  const [selectedteams, setselectedTeams] = useState<Types.ObjectId[]>([])
  const [selectedTeamId, setSelectedTeamId] = useState<Types.ObjectId | null>(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [addMember, setAddMember] = useState<string>('');

  const addMemberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddMember(e.target.value);
  };

  const addMemberSubmit = async (teamId: Types.ObjectId) => {
    console.log("receiverUsername: ", addMember, " teamId: ", teamId, " inviterId: ", id)
    try {
      const response = await axios.post<any>('/api/invitation/sendInvite', {
        teamId: teamId,
        receiverUsername: addMember,
        inviterId: id
      });
      alert("Invite Send Successfully")
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
    finally {
      setIsAddMemberOpen(false);
      setAddMember('');
    }
  };


  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        if (!id) {
          toast.error('User not logged in');
          setLoading(false);
          return;
        }
        const { data } = await axios.get('/api/team/getteamsbyuser', { params: { userId: id } });
        if (data.success) {
          const detailedTeams = await Promise.all(
            data.teams.map(async (team: Team) => {
              try {
                const { data: teamData } = await axios.get('/api/team/getteambyid', {
                  params: { teamId: team },
                });
                return teamData.success ? teamData.team : null;
              } catch (error) {
                toast.error('Failed to fetch team details');
                return null;
              }
            })
          );
          setTeams(detailedTeams.filter((team) => team !== null));
        }
      } catch (error) {
        toast.error('Failed to fetch teams');
      }
      setLoading(false);
    };
    fetchTeams();
  }, [id, flag]);

  const leaveteam = async (teamid: any, userid: any) => {
    console.log("clicked")
    try {
      const response = await axios.put("/api/team/leaveteam", null, {
        params: { teamId: teamid, userId: userid },
      });
      console.log(response.data);
      setflag(flag => !flag)
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <Card className="h-[470px]">
      <CardHeader>
        <CardTitle>Your Teams</CardTitle>
        <CardDescription>Teams you're currently a part of</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (<p className="text-center text-muted-foreground">Loading teams...</p>) : teams?.length === 0 ? (
          <p>No Teams.</p>) : (<ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team._id?.toString()} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{team.teamName?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/teams/${team._id}`} className="font-medium hover:underline">
                      {team.teamName}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {team.Members?.length} members
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog
                    open={isAddMemberOpen && selectedTeamId?.toString() === team._id.toString()}
                    onOpenChange={(open) => {
                      setIsAddMemberOpen(open);
                      if (open) setSelectedTeamId(team._id);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <UserPlus className="h-4 w-4" />
                        <span className="sr-only">Add member</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Member to {team.teamName}</DialogTitle>
                        <DialogDescription>
                          Enter the unique ID of the user you want to add to this team.
                        </DialogDescription>
                      </DialogHeader>
                      <Input
                        id="addMember"
                        type="text"
                        value={addMember}
                        placeholder="Enter user's unique ID"
                        onChange={addMemberHandler}
                      />
                      <DialogFooter>
                        <Button type="submit" onClick={() => addMemberSubmit(team._id)}>
                          Add Member
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    open={isAddProjectOpen && selectedTeamId === team._id}
                    onOpenChange={(open) => {
                      setIsAddProjectOpen(open);
                      if (open) setSelectedTeamId(team._id);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FolderPlus className="h-4 w-4" />
                        <span className="sr-only">Add project</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Project to {team.teamName}</DialogTitle>
                        <DialogDescription>
                          Enter the name of the new project you want to add to this team.
                        </DialogDescription>
                      </DialogHeader>
                      <Input placeholder="Enter project name" />
                      <DialogFooter>
                        <Button type="submit">Add Project</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" onClick={() => { leaveteam(team._id, id) }}>
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Leave team</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>)
        }
      </CardContent>
    </Card>
  );
}