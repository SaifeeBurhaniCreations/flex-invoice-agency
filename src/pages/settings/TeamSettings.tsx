
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, Clock, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock team members
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Owner",
    status: "Active",
    joinedDate: "Jan 15, 2025"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
    joinedDate: "Feb 23, 2025"
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Pending",
    joinedDate: "Invitation sent Apr 8, 2025"
  }
];

// Mock activity logs
const activityLogs = [
  {
    id: 1,
    user: "John Doe",
    action: "Created invoice INV-001",
    timestamp: "Today at 14:32"
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Edited client 'Acme Inc.'",
    timestamp: "Yesterday at 09:15"
  },
  {
    id: 3,
    user: "John Doe",
    action: "Deleted invoice INV-002",
    timestamp: "Apr 10, 2025 at 16:44"
  },
  {
    id: 4,
    user: "Jane Smith",
    action: "Created new client 'Tech Solutions'",
    timestamp: "Apr 9, 2025 at 11:23"
  },
  {
    id: 5,
    user: "John Doe",
    action: "Updated company branding settings",
    timestamp: "Apr 8, 2025 at 15:30"
  }
];

const TeamSettings = () => {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("editor");
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your team members and access permissions.
        </p>
      </div>
      
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Invite New Team Member</CardTitle>
              <CardDescription>
                Add a new member to your workspace. They'll receive an email invitation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                  />
                </div>
                
                <div className="sm:w-1/3 space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="sm:w-auto flex items-end">
                  <Button className="w-full sm:w-auto">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invite
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map(member => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        {member.status === "Active" ? (
                          <Select defaultValue={member.role.toLowerCase()}>
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="owner">Owner</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          member.role
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.status === "Active" ? "default" : "outline"}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.joinedDate}</TableCell>
                      <TableCell className="text-right">
                        {member.role !== "Owner" && (
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Activity Logs</CardTitle>
              <CardDescription>
                Recent actions performed by team members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map(log => (
                  <div key={log.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="bg-muted rounded-full p-2">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{log.user}</div>
                      <div className="text-sm text-muted-foreground">{log.action}</div>
                      <div className="text-xs text-muted-foreground mt-1">{log.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamSettings;
