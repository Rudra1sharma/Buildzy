'use client'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  FileText,
  FileCode,
  File,
  Pencil,
  PlusCircle,
  CheckCircle,
  FolderOpen
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {Spinner} from "@/components/ui/spinner";

interface FilesSectionProps {
  repoName: string;
  files: any[];
  isLoading: boolean;
  isAddFileDialogOpen: boolean;
  setIsAddFileDialogOpen: (open: boolean) => void;
  newFile: any;
  setNewFile: (file: any) => void;
  formErrors: any;
  validateForm: (field: string, value: string) => boolean;
  handleCreateFile: () => void;
  isCreatingFile: boolean;
}

export default function FilesSection({
  repoName,
  files,
  isLoading,
  isAddFileDialogOpen,
  setIsAddFileDialogOpen,
  newFile,
  setNewFile,
  formErrors,
  validateForm,
  handleCreateFile,
  isCreatingFile
}: FilesSectionProps) {
  
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <FolderOpen className="h-5 w-5" />
          Repository Files
        </CardTitle>
        <CardDescription className="truncate">Files in {repoName}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[50vh] md:h-[60vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-40">
              <Spinner size="medium" />
              <p className="mt-2 text-sm text-muted-foreground">Loading files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No files found in this repository.</p>
              <p className="text-sm mt-2">Add your first file to get started!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between rounded-md p-2 hover:bg-muted cursor-pointer"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {file.type === "html" ? (
                      <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    ) : file.type === "css" ? (
                      <FileCode className="h-4 w-4 text-purple-500 flex-shrink-0" />
                    ) : (
                      <File className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    )}
                    <span className="truncate">{file.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Dialog open={isAddFileDialogOpen} onOpenChange={setIsAddFileDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add File
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New File</DialogTitle>
              <DialogDescription>Specify the file name and type.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">File Name</label>
                <Input
                  value={newFile.name}
                  onChange={(e) => {
                    setNewFile({ ...newFile, name: e.target.value });
                    validateForm('fileName', e.target.value);
                  }}
                  placeholder="about"
                  className={formErrors.fileName ? "border-red-500" : ""}
                />
                {formErrors.fileName && (
                  <p className="text-xs text-red-500 mt-1">File name cannot be empty</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">File Type</label>
                <Input
                  value={newFile.type}
                  onChange={(e) => setNewFile({ ...newFile, type: e.target.value })}
                  placeholder=".html"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddFileDialogOpen(false)} disabled={isCreatingFile}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateFile}
                disabled={isCreatingFile || formErrors.fileName}
              >
                {isCreatingFile ? (
                  <>
                    <Spinner size="small" className="mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create File"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}