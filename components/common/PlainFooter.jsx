"use client";
import ResponsiveContainer from "./ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";

const PlainFooter = () => {
    return (
        <footer className="w-full z-[123] bg-background mt-auto">
            <ResponsiveContainer className="flex justify-center items-center h-[75px]">
                <TypographyP className="text-xs">eGamio All Rights Reserved 2024 </TypographyP>
            </ResponsiveContainer>
        </footer>
    );
};

export default PlainFooter;
