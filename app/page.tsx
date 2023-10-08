"use client";
import {useUser} from "@clerk/nextjs"
import {useEffect} from "react";
import AlertSection from "@/app/alert-section";
import LocationInput from "@/components/LocationInput";

export default function Home() {
    const {isSignedIn, user} = useUser();

    let userInfo = {
        clerk_id: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
    }

    const checkUser = async (value: any) => {
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
        <>
            <div className="relative min-h-[60vh] md:min-h-[90vh] bg-center bg-no-repeat">
                <div
                    className={`h-[60vh] md:h-[90vh] bg-[url("https://cdn.discordapp.com/attachments/1157875808124276847/1160589094179582002/lol.png?ex=653535d2&is=6522c0d2&hm=608f5c6b8014aa7872a04ca6588362105e7a07e3dc91b2c37650a5211166e338&")] bg-cover flex flex-col justify-center`}>
                    <div className="text-center max-w-3xl mx-auto p-4 md:p-0">
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-6xl">
                            Comfire Wildfire Alert
                        </h1>
                        <p className="mt-4 md:mt-6 text-md md:text-lg leading-8 text-white">
                            Alert communities of wildfires in their area and provides a platform for members to respond
                            to
                            the fire and create action plans.
                        </p>
                        <div className="mt-4 md:mt-10 flex items-center justify-center gap-x-6">
                            <LocationInput/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Alert Section */}
            <div className="max-w-7xl mx-auto px-4 mt-8 mb-16">
                <h2 className="text-xl font-bold sm:text-2xl mb-8">Search Alerts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-x-8 sm:gap-y-6">
                    <AlertSection
                        imageUrl={"../../static/fire1.png"}
                        heading="Fire Verification Team"
                        text="Our team swiftly responds to reports to verify and assess the authenticity and intensity of fires"
                    />
                    <AlertSection
                        imageUrl={"../../static/fire2.png"}
                        heading="Post-Fire Cleanup Crew"
                        text="Once the fire is controlled, our dedicated crew steps in for debris removal, infrastructure restoration, and site clean-up"
                    />
                    <AlertSection
                        imageUrl={"../../static/fire3.png"}
                        heading="Environmental Recovery Unit"
                        text="Ensuring post-fire environments are safe and resilient, we monitor water contamination, soil erosion, and implement necessary restoration measures"
                    />
                    <AlertSection
                        imageUrl={"../../static/fire4.png"}
                        heading="Community Feedback Portal"
                        text="An avenue for community members to share insights, experiences, and recommendations for improved fire management and response"
                    />
                </div>
            </div>
        </>
    )
}
