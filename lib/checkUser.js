import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";

export const checkUser = async() => {
    const user = await currentUser(); 
    // if no user is logged in
    if(!user){
        return null;
    }
    // if user is logged in
    try {
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id, // check if this user already exists in our dB 
            }
        })
        if(loggedInUser){
            return loggedInUser; // if user does exist then return user
        }
        const newUser = await db.user.create({ // else create this new user
            data: {
                clerkUserId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
            },
        });
        return newUser
    } catch (error) {
        console.log(error.message)
    }
}