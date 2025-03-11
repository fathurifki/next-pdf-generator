"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@/types/user";
import UserForm from "@/components/form/user-form";
import PdfPreviewDialog from "@/components/pages/pdf-preview-dialog";
import { usePdfStore } from "@/store/use-pdf-store";
import { generatePdf } from "@/lib/pdf-download";

export default function RandomUserTab() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setIsPdfPreviewOpen, detailUserData, setDetailUserData } =
    usePdfStore();

  const fetchRandomUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const user = data.results[0];

      const formattedData: User = {
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        username: user.login.username,
        website: "example.com",
        company: {
          name: "Self-employed",
          catchPhrase: "Independent professional",
          bs: "Freelance services",
        },
        address: {
          street: user.location.street.name,
          suite: user.location.street.number.toString(),
          city: user.location.city,
          zipcode: user.location.postcode.toString(),
        },
      };

      setDetailUserData(formattedData);
      toast({
        title: "Data fetched successfully",
        description: "User data has been loaded from Random User API",
      });
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: "Failed to fetch data from Random User API",
        variant: "destructive",
      });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (data: User) => {
    setDetailUserData(data);
    toast({
      title: "Data updated",
      description: "Your changes have been saved",
    });
  };

  const downloadPdf = async (user: User, template: PdfTemplate) => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Button onClick={fetchRandomUserData} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching Random User...
            </>
          ) : (
            "Generate Random User"
          )}
        </Button>
      </div>

      {detailUserData ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Edit User Information</h3>
            <Button onClick={() => setIsPdfPreviewOpen(true)} variant="outline">
              Preview PDF
            </Button>
          </div>

          <UserForm initialData={detailUserData} onSubmit={handleFormSubmit} />

          <PdfPreviewDialog
            userData={detailUserData}
            downloadPdf={downloadPdf}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 border rounded-lg bg-muted/20">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">No user data loaded yet.</p>
            <p className="text-sm text-muted-foreground">
              Click the button above to generate a random user.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
