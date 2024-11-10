"use client";
// React import
import Image from "next/image";
// Components import
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";
// Assets import
import user3 from "@/public/images/users/user3.jpeg";

const TeamDetail = () => {

    return (
        <ResponsiveContainer className="">
            <div className="flex justify-between items-center gap-4">
                <div className="flex justify-center items-center rounded-full border-2">
                    <Image 
                        src={user3} 
                        alt="step1" 
                        className=""
                    />
                </div>
                <div className="">
                    <TypographyP className="font-bold">Bio</TypographyP>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim rem accusamus animi excepturi, deserunt repellendus nemo at non voluptas beatae molestiae, nesciunt similique dicta! Obcaecati, rem? Qui, sapiente iure?</p>
                </div>
            </div>
        </ResponsiveContainer>
    );
};

export default TeamDetail;
