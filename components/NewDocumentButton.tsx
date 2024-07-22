"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FormEvent, useState, useTransition } from "react";
import { createNewDocument } from "@/actions/action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";

const NewDocumentButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateDocument = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const { docId } = await createNewDocument(title);
      router.push(`/doc/${docId}`);
      setTitle("");
      setIsOpen(false);
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild>
        <DialogTrigger>Create Document</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the Title of the document!</DialogTitle>
        </DialogHeader>
        <form className="flex gap-2" onSubmit={handleCreateDocument}>
          <Input
            type="text"
            placeholder="Title"
            className="w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" disabled={!title || isPending}>
            {isPending ? "Creating..." : "New Document"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDocumentButton;
