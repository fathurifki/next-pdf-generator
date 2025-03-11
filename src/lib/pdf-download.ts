import type { User } from "@/types/user";

export const generatePdf = async (user: User, template: string) => {
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