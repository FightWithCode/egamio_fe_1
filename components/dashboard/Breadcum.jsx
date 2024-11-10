"use client";
import breadcumb from "@/public/images/breadcumb.jpg";
import ResponsiveContainer from "../common/ResponsiveContainer";
import { FaHome } from "react-icons/fa";


const PlayerBreadcum = ({page}) => {
    return (
        <section className="w-full object-cover" style={{backgroundImage: `url(${breadcumb.src})`}}>
            <ResponsiveContainer className="py-12">
                <div className="breadcumb-content text-center">
                    <h1 className="breadcumb-title h1 text-white my-0">{page}</h1>
                </div>
            </ResponsiveContainer>
        </section>
    );
};

export default PlayerBreadcum;

