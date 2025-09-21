import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], // Track limits separately for each Clerk user
  rules: [
    // Rate limiting specifically for collection creation
    tokenBucket({
      mode: "LIVE",
      refillRate: 2,  // Adds 2 tokens per hour
      interval: 3600, // per hour
      capacity: 2,  // Max tokens the bucket can hold
    }),
  ],
});

export default aj;