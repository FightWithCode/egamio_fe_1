"use client";
import ResponsiveContainer from "./ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";

const PlainFooter = () => {
    return (
        <ResponsiveContainer>
            <div className="mt-8 py-4 border-t border-gray-800 text-center">
                <TypographyP className="text-sm text-white/80">
                    © {new Date().getFullYear()} eGamio. All rights reserved.
                </TypographyP>
            </div>
        </ResponsiveContainer>
    );
};

export default PlainFooter;
