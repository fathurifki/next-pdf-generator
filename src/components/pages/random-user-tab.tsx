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
      const response = await fetch(process.env.NEXT_PUBLIC_RANDOM_USER_API_URL);
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

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <div className="flex justify-center">
        <Button
          onClick={fetchRandomUserData}
          disabled={isLoading}
          size="lg"
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching...
            </>
          ) : (
            "Generate Random User"
          )}
        </Button>
      </div>

      {detailUserData && !isLoading ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-medium">Edit User Information</h3>
            <Button
              onClick={() => setIsPdfPreviewOpen(true)}
              variant="outline"
              className="w-full sm:w-auto"
            >
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
        <div className="flex items-center justify-center h-48 sm:h-64 border rounded-lg bg-muted/20 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-muted-foreground">Loading Fetching data...</p>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">No user data loaded yet.</p>
              <p className="text-sm text-muted-foreground">
                Click the button above to generate a random user.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
