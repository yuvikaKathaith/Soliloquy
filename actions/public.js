import { unstable_cache } from 'next/cache';

export const getDailyprompt = unstable_cache(
  async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-store",
      });
      const data = await res.json();
      return data.slip.advice;
    } catch (error) {
      return "What's on your mind today"; 
    }
  },
  ["daily-prompt"],
  {
    revalidate: 43200, // 12 hours
    tags: ["daily-prompt"],
  }
);