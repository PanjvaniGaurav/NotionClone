import { DocumentData } from "firebase/firestore";
import * as Y from "yjs";

export type User = {
    fullName : string,
    email: string,
    image: string,
}

export interface RoomDocument extends DocumentData {
    createdAt: Date;
    role : "owner" | "editor";
    roomId: string;
    userId: string;
}

export type EditorProps = {
    doc : Y.Doc;
    provider : any;
    darkMode : boolean;
}