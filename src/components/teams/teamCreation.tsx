'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import toast, { Toaster } from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
const id = "678a8285d7a0d7ac795afa4e";
import axios from "axios";

interface props{
  flag:boolean,
  setflag:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TeamCreation({flag,setflag}: props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [teamdetails,setteamdetails] = useState({leader:id,description:"",teamName:""});
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
  const { name, value } = e.target;
    setteamdetails(prev => ({ ...prev, [name]: value }));
  };
  const handleAddGroup = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
      try {
        console.log(teamdetails)
        if(!teamdetails.teamName){
          toast.error("Group name cannot be empty")
          return
      }
        if(!teamdetails.description){
          toast.error("Description cannot be empty")
          return
      }
        if(!teamdetails.leader){
          toast.error("Sign In!")
          return
      }
        
        const {data} = await axios.post("/api/team/createteam",teamdetails)
        if (data.success) {
            console.log(data);
            setflag(flag=>!flag)
            setIsDialogOpen(false);
        } 
      } catch (error:any) {
        toast.error(error.response.data.error)
      }
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Team</CardTitle>
        <CardDescription>Start collaborating by creating a new team</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create New Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Team</DialogTitle>
              <DialogDescription>
                Give your team a name and start inviting members.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-name"  className="text-right">
                  Team Name
                </Label>
                <Input id="team-name" name="teamName" className="col-span-3" placeholder="e.g. Design Wizards" value={teamdetails.teamName} onChange={handleInputChange}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-description" className="text-right">
                  Description
                </Label>
                <Input id="team-description" name="description" className="col-span-3" placeholder="Team description" value={teamdetails.description} onChange={handleInputChange}/>
              </div>
            </div>
            <DialogFooter>
              <div><Button onClick = {handleAddGroup} type="button">Create Team</Button></div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

