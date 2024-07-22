"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/firebase-admin";
import { title } from "process";
import { create } from "domain";
import liveblocks from "@/lib/liveblocks";

export async function createNewDocument(docTitle:string) {
  auth().protect();
  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: docTitle,
  });
  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set(
      {
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
      },
      { merge: true }
    );

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth().protect();
  console.log("deleted document", roomId);
  try {
    await adminDb.collection("documents").doc(roomId).delete();
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();
    const batch = adminDb.batch();
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    await liveblocks.deleteRoom(roomId);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId : string,email:string){
  auth().protect()
  console.log("inviteUserToDocument",roomId,email)
  try {
    await adminDb.
    collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .set({
      userId:email,
      role:"editor",
      roomId,
      createdAt:new Date()
    })
    return {success:true}
  } catch (error) {
    console.error(error)
    return {success:false}
  }
}

export async function removeUserFromDocument(roomId:string,email:string){
  auth().protect()
  console.log("removeUserFromDocument",roomId,email)

  try {
    await adminDb
    .collection("users")
    .doc(email)
    .collection("rooms")
    .doc(roomId)
    .delete()
    return {success:true}
  } catch (error) {
    console.error(error)
    return {success:false}
  }
} 