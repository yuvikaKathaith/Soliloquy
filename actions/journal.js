"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { MOODS } from "@/app/lib/moods";
import { getPixabayImage } from "./public";
import { request } from "@arcjet/next";
import aj from "@/lib/arcjet";

// journal entry creation API
export async function createJournalEntry(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // arcjet rate limiting to jounral entries per user
    const req = await request()

    const decision = await aj.protect(req, {
      userId, // links the rate limit to the logged-in user.
      requested: 1, // this action costs 1 token.
    });

    if(decision.isDenied()){
      if(decision.reason.isRateLimit()){
        const {remaining, reset} = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        })
        throw new Error("Too many requests. Please try again later.")
      }
      throw new Error("Request Blocked.")
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const mood = MOODS[data.mood.toUpperCase()];
    if (!mood) throw new Error("Invalid mood");

    const moodImageUrl = await getPixabayImage(data.moodQuery);
    const entry = await db.entry.create({
      data: {
        title: data.title,
        content: data.content,
        mood: mood.id,
        moodScore: mood.score,
        moodImageUrl,
        userId: user.id,
        collectionId: data.collectionId || null,
      },
    });

    await db.draft.deleteMany({
      where: { userId: user.id },
    });
    revalidatePath("/dashboard");
    return entry;
  } catch (error) {
    throw new Error(error.message);
  }
}
