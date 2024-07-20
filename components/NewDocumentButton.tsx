"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useTransition } from "react"
import { createNewDocument } from "@/actions/action"

const NewDocumentButton = () => {
    const [isPending,startTransition] = useTransition()
    const router = useRouter()
    const handleCreateDocument = () => {
        startTransition(async () => {
            const {docId} = await createNewDocument()
            router.push(`/doc/${docId}`)
        })
    }
  return (
    <Button onClick={handleCreateDocument} disabled={isPending}>
        {isPending ? "Creating..." : "New Document"}
    </Button>
  )
}

export default NewDocumentButton