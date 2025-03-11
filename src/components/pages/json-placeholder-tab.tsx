"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Edit,  FileSpreadsheetIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types/user";
import UserEditForm from "@/components/form/user-edit-form";
import PdfPreviewDialog from "@/components/pages/pdf-preview-dialog";

const generatePdf = async (user: User, template: string) => {
  try {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, template }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to generate PDF");
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/pdf")) {
      throw new Error("Invalid response format");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.name.replace(/\s+/g, "_")}_details.pdf`;

    setTimeout(() => {
      a.click();
      window.URL.revokeObjectURL(url);
    }, 100);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

export default function JsonPlaceholderTab() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();

      const formattedData: User[] = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        website: user.website,
        company: {
          name: user.company.name,
          catchPhrase: user.company.catchPhrase,
          bs: user.company.bs,
        },
        address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
        },
      }));

      setUsers(formattedData);
      toast({
        title: "Data fetched successfully",
        description: `Loaded ${formattedData.length} users from JSONPlaceholder API`,
      });
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: "Failed to fetch data from JSONPlaceholder API",
        variant: "destructive",
      });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handlePreviewPdf = async (user: User) => {
    setSelectedUser(user);
    setIsPdfPreviewOpen(true);
  };

  const downloadPdf = async (user: User, template: string) => {
    try {
      await generatePdf(user, template);
      toast({
        title: "PDF Generated",
        description: "The PDF has been generated and downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditDialogOpen(false);
    toast({
      title: "User updated",
      description: `${updatedUser.name}'s information has been updated`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={fetchUsers} disabled={isLoading} variant="outline">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            "Refresh Data"
          )}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreviewPdf(user)}
                      >
                        <FileSpreadsheetIcon className="h-4 w-4" />
                        <span className="sr-only">Preview</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user information below.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserEditForm
              user={selectedUser}
              onSave={handleSaveUser}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <PdfPreviewDialog
        open={isPdfPreviewOpen}
        onOpenChange={setIsPdfPreviewOpen}
        userData={selectedUser}
        downloadPdf={downloadPdf}
      />
    </div>
  );
}
