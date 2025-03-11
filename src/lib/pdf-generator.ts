import type { User } from "@/types/user"

export type PdfTemplate = "professional" | "modern"

export async function generatePdf(userData: User, template: PdfTemplate): Promise<Blob> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return new Blob(["PDF content"], { type: "application/pdf" })
}

export function downloadPdf(blob: Blob, filename = "user-document.pdf") {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

