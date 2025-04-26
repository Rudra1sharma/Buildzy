"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FolderOpen, FolderGit, GitCommit, PlusCircle, ExternalLink, ChevronRight, File, Pencil, FileCode, Settings, User, UserPlus, AlertCircle, } from "lucide-react";
import DashboardHeader from "../dashboard/dashboardHeader";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";

type FilesType = {
  name: string;
  path: string;
  type: string;
}
const mockCommits = [
  {
    hash: "a1b2c3d",
    message: "Update home page design",
    author: "JohnDoe",
    date: "2 hours ago",
  },
  {
    hash: "e4f5g6h",
    message: "Fix contact form styling",
    author: "JohnDoe",
    date: "1 day ago",
  },
  {
    hash: "i7j8k9l",
    message: "Initial commit",
    author: "JohnDoe",
    date: "1 week ago",
  },
];
export default function RepoManager() {
  const query = useSearchParams();
  const repoName = query.get("name") as string;
  const { data: session } = useSession();
  const [files, setFiles] = useState<FilesType[]>([]);
  const [temp, setTemp] = useState(repoName);
  const [pageName, setPageName] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  // Mock contributors data
  const [contributors, setContributors] = useState([
    { id: 1, name: "You", email: "you@example.com", role: "Owner" },
    {
      id: 2,
      name: "Collaborator",
      email: "collaborator@example.com",
      role: "Contributor",
    },
  ]);


  const fetchRepoFiles = async (owner: string, repo: string, accessToken: string) => {
    try {
      console.log(owner, accessToken)
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json"
        }
      });

      const files = await res.json();
      const myfiles = files.map((file: any) => {
        const extension = file.name.split('.').pop();
        return {
          name: file.name,
          path: file.path,
          type: extension
        };
      })
      setFiles(myfiles)
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }
  useEffect(() => {
    fetchRepoFiles(session?.user?.username as string, repoName, session?.user?.access_token as string)
  }, [session?.user?.username])


  const handleSaveRepoName = () => {
    // Here you would implement the GitHub API call to update repo name
    console.log("Saving new repo name:", repoName);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInviteContributor = () => {
    // Here you would implement the GitHub API call to invite a contributor
    console.log("Inviting contributor:", inviteEmail);
    setInviteEmail("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  const createRepo = async (accessToken: any) => {
    try {
      const res = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: temp,
          description: "Created with 💝 by Buildzy using GitHub OAuth!",
          private: false,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        throw new Error(data.message || "Failed to create repository");
      }

      const payload = {
        create_at: data.created_at || new Date().toISOString(),
        description: data.description,
        full_name: data.full_name,
        github_id: data.id,
        name: data.name,
        owner: session?.user?.username || "unknown",
        owner_id: session?.user?.id || "unknown",
      };

      await axios.post('http://localhost:3000/api/project/createrepo', payload);
      alert("Creating Repository Successfully");

    } catch (error: any) {
      console.error("Error creating repo or saving project:", error.message);
    }
  }
  return (
    <div className="container">
      <DashboardHeader />
      <div className="flex justify-between items-center mb-6"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Repository Files
            </CardTitle>
            <CardDescription>Files in your current project</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-1">
                {files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-md p-2 hover:bg-muted cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {file.type === "html" ? (
                        <FileText className="h-4 w-4 text-blue-500" />
                      ) : file.type === "css" ? (
                        <FileCode className="h-4 w-4 text-purple-500" />
                      ) : (
                        <File className="h-4 w-4 text-gray-500" />
                      )}
                      <span>{file.name}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add File
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Project Management</CardTitle>
              <div className="flex gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <FolderGit className="mr-2 h-4 w-4 " />
                      Create Repository
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Repository</DialogTitle>
                      <DialogDescription>
                        What should be your new repository name ?
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <label className="text-sm font-medium">
                        Your repository name
                      </label>
                      <Input
                        value={temp}
                        onChange={(e: any) =>setTemp(e.target.value)}
                        placeholder="Your Repo"
                        className="mt-1"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="secondary" type="submit">Cancel</Button>
                      <Button type="submit" onClick={() => {
                        createRepo(session?.user?.access_token)
                      }}>Create</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <GitCommit className="mr-2 h-4 w-4 " />
                      Commit Changes
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Commit Changes</DialogTitle>
                      <DialogDescription>
                        Add a message to describe your changes.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <label className="text-sm font-medium">
                        Commit Message
                      </label>
                      <Input
                        value={commitMessage}
                        onChange={(e: any) => setCommitMessage(e.target.value)}
                        placeholder="Update website design"
                        className="mt-1"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Commit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Page
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Page</DialogTitle>
                      <DialogDescription>
                        Enter a name for your new page. HTML and CSS files will
                        be created.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <label className="text-sm font-medium">Page Name</label>
                      <Input
                        value={pageName}
                        onChange={(e: any) => setPageName(e.target.value)}
                        placeholder="services"
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This will create services.html and services.css files
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Create & Edit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="commits">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="commits">
                  <GitCommit className="mr-2 h-4 w-4" />
                  Commit History
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="commits" className="mt-4">
                <ScrollArea className="h-[55vh]">
                  <div className="space-y-4">
                    {mockCommits.map((commit) => (
                      <div key={commit.hash} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium flex items-center gap-1">
                              <GitCommit className="h-4 w-4" />
                              {commit.message}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {commit.author} committed {commit.date}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Changes
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2 text-sm bg-muted p-2 rounded-md">
                          <code>{commit.hash}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                {showSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-3 mb-4 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>Changes saved successfully!</span>
                  </div>
                )}
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Repository Settings
                      </CardTitle>
                      <CardDescription>
                        Manage your repository configuration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">
                            Repository Name
                          </label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              value={repoName}
                              onChange={(e) => setRepoName(e.target.value)}
                              placeholder="my-awesome-website"
                            />
                            <Button onClick={handleSaveRepoName}>Save</Button>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Repository Visibility
                          </label>
                          <div className="flex gap-2 mt-1">
                            <Button variant="outline" className="w-full">
                              Public
                            </Button>
                            <Button variant="outline" className="w-full">
                              Private
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Changes to repository visibility may require
                            additional GitHub permissions.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        Contributor Management
                      </CardTitle>
                      <CardDescription>
                        Manage who has access to this repository
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">
                            Contributors
                          </label>
                          <div className="space-y-2 mt-2">
                            {contributors.map((contributor) => (
                              <div
                                key={contributor.id}
                                className="flex justify-between items-center p-2 border rounded-md"
                              >
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4 text-blue-500" />
                                  <div>
                                    <div className="font-medium">
                                      {contributor.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {contributor.email}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                    {contributor.role}
                                  </span>
                                  {contributor.role !== "Owner" && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Invite Contributor
                          </label>
                          <div className="flex gap-2 mt-1">
                            <Input
                              value={inviteEmail}
                              onChange={(e) => setInviteEmail(e.target.value)}
                              placeholder="email@example.com"
                            />
                            <Button onClick={handleInviteContributor}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Invite
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
