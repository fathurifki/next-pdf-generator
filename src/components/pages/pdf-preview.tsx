"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { User } from "@/types/user";
import { Loader2 } from "lucide-react";

interface PdfPreviewProps {
  userData: User | null;
}

export default function PdfPreview({ userData }: PdfPreviewProps) {
  const [template, setTemplate] = useState<"professional" | "modern">(
    "professional"
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [template, userData]);

  if (!userData) return null;

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="professional"
        onValueChange={(value) => setTemplate(value as any)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="modern">Modern</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex items-center justify-center h-[600px] w-full border rounded-lg bg-muted/50">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Generating PDF preview...
            </p>
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="bg-white p-8 min-h-[600px] shadow-sm">
            {template === "professional" && (
              <ProfessionalTemplate userData={userData} />
            )}
            {template === "modern" && <ModernTemplate userData={userData} />}
          </div>
        </Card>
      )}
    </div>
  );
}

function ProfessionalTemplate({ userData }: { userData: User }) {
  return (
    <div className="space-y-6">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
        <p className="text-lg text-gray-600">{userData.company.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Contact Information
            </h2>
            <div className="mt-2 space-y-1">
              <p>
                <span className="font-medium">Email:</span> {userData.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {userData.phone}
              </p>
              <p>
                <span className="font-medium">Website:</span> {userData.website}
              </p>
              <p>
                <span className="font-medium">Username:</span>{" "}
                {userData.username}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">Address</h2>
            <div className="mt-2 space-y-1">
              <p>
                {userData.address.street}, {userData.address.suite}
              </p>
              <p>
                {userData.address.city}, {userData.address.zipcode}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Company Profile
            </h2>
            <div className="mt-2 space-y-1">
              <p>
                <span className="font-medium">Company:</span>{" "}
                {userData.company.name}
              </p>
              <p>
                <span className="font-medium">Catch Phrase:</span>{" "}
                {userData.company.catchPhrase}
              </p>
              <p>
                <span className="font-medium">Business Services:</span>{" "}
                {userData.company.bs}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <p className="text-sm text-gray-500 text-center">
          This document was generated on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

function ModernTemplate({ userData }: { userData: User }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 -mx-8 -mt-8 mb-6">
        <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
        <p className="text-blue-100">{userData.company.name}</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Contact</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Email:</span>
                <br />
                {userData.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>
                <br />
                {userData.phone}
              </p>
              <p>
                <span className="font-medium">Web:</span>
                <br />
                {userData.website}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Address</h2>
            <div className="space-y-1 text-sm">
              <p>{userData.address.street}</p>
              <p>{userData.address.suite}</p>
              <p>
                {userData.address.city}, {userData.address.zipcode}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-3">
              Company Profile
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Company Name</h3>
                <p>{userData.company.name}</p>
              </div>
              <div>
                <h3 className="font-medium">Catch Phrase</h3>
                <p className="italic">"{userData.company.catchPhrase}"</p>
              </div>
              <div>
                <h3 className="font-medium">Business Services</h3>
                <p>{userData.company.bs}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-3">
              Additional Information
            </h2>
            <p>Username: {userData.username}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <p className="text-sm text-gray-500 text-center">
          Generated on {new Date().toLocaleDateString()} • PDF Document
          Generator
        </p>
      </div>
    </div>
  );
}

