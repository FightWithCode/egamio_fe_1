"use client";
import ResponsiveContainer from "../ui/ResponsiveContainer";
import { TypographyP } from "../ui/Typographies";

const PlainFooter = () => {
    return (
    
        <footer className="w-full">
                <div className="py-4 border-t border-gray-800 text-center">
                    <TypographyP className="text-sm text-white/80">
                        © {new Date().getFullYear()} eGamio. All rights reserved.
                    </TypographyP>
                </div>
        </footer>
            
    );
};
export default PlainFooter;