"use server";

import { unstable_cache } from "next/cache";

// Pixabay image API
export async function getPixabayImage(query) {
  try {
    const res = await fetch(
      `https://pixabay.com/api?q=${query}&key=${process.env.PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
    );
    const data = await res.json();
    return data.hits[0]?.largeImageURL || null;
  } catch (error) {
    console.log("Pixabay API error:", error.message);
    return null;
  }
}

// Daily advice (ZenQuotes)
export const getDailyprompt = unstable_cache(
  async () => {
    try {
      const res = await fetch("https://zenquotes.io/api/random", {
        cache: "no-store",
      });
      const data = await res.json();
      return (
        data[0]?.q + " — " + data[0]?.a ||
        "Reflect on something meaningful today."
      );
    } catch (error) {
      console.log("ZenQuotes API error:", error.message);
      return "What's on your mind today?";
    }
  },
  ["daily-prompt"],
  {
    revalidate: 43200, // 12 hours
    tags: ["daily-prompt"],
  }
);
