"use client";
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react";

export default function Home() {
    const {isSignedIn, user} = useUser();

    let userInfo = {
        clerk_id: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
        firstName: user?.firstName,           
        lastName: user?.lastName,
    }

    const checkUser = async (value) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isSignedIn) {
            checkUser(userInfo).then()
        }
    }, [isSignedIn])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>COMFIRE</h1>
        </main>
    )
}
