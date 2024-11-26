import { FaChevronDown } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";

const Notifications = ({ show, setShow }) => {
    return (
        <section
            className={`fixed z-[124] bg-white transition-transform duration-500 ease-in-out ${
                show
                    ? "translate-x-0 md:translate-y-0"
                    : "translate-x-full md:translate-y-full"
            } w-full md:w-[350px] max-h-[75%] md:top-0 md:right-0 sm:bottom-0 md:rounded-l-xl sm:rounded-t-xl`}
        >
            <div className="flex justify-between items-center p-4 bg-highlight text-white">
                <p className="text-lg">Notifications</p>
                <IoCloseCircleOutline
                    className="cursor-pointer text-3xl"
                    onClick={() => setShow(false)}
                />
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(100%-75px)]">
                {/* Notifications List */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between py-2 border-b">
                        <p className="text-sm">New Comment on your post</p>
                        <FaChevronDown />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <p className="text-sm">Someone liked your profile</p>
                        <FaChevronDown />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <p className="text-sm">You have 3 new messages</p>
                        <FaChevronDown />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <p className="text-sm">Your team has a new match</p>
                        <FaChevronDown />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Notifications;
