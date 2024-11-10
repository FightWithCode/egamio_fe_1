"use client";
import ResponsiveContainer from "../common/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";

const Footer = () => {

    return (
        <section className="w-full z-[123] bg-black">
            <ResponsiveContainer className="flex justify-between items-center h-[75px]">
                <TypographyP className="text-xs">eGamio | All Rights Reserved 2018</TypographyP>
                <TypographyP className="text-xs !mt-0">Terms and Conditions | Privacy Policy</TypographyP>
            </ResponsiveContainer>
        </section>
    );
};

export default Footer;
