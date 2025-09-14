"use server"

import { unstable_cache } from 'next/cache';

export async function getPixabayImage(query){
  try {
    const res = await fetch(
      `https://pixabay.com/api?q=${query}&key=${process.env.PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
    );
    const data = await res.json();
    return data.hits[0]?.largeImageURL || null;
  } catch (error) {
    console.log("Pixabay API error: ", error.message);
    return null;
  }
}

export const getDailyprompt = unstable_cache(
  async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-store", //Don’t cache this response. Always go to the API and fetch new data
      });
      const data = await res.json();
      return data.slip.advice;
    } catch (error) {
      console.log("PAdvice API error: ", error.message)
      return "What's on your mind today"; 
    }
  },
  ["daily-prompt"],
  {
    revalidate: 43200, // 12 hours
    tags: ["daily-prompt"],
  }
);