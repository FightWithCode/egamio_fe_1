import { FaChevronDown, FaSignOutAlt } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';

const DashboardOptions = ({ show, setShow }) => {
    return (
        <section
            className={`absolute right-0 bg-white z-50 w-full sm:w-full max-h-[75%] transition-all duration-500 ease-in-out
                ${show ? 'translate-x-0 sm:translate-y-0' : 'translate-x-full sm:translate-y-full'}
                md:w-[350px] md:max-h-full sm:bottom-0 sm:rounded-tl-xl sm:rounded-tr-xl`}
        >
            <div className="flex justify-between items-center p-4 bg-highlight text-white">
                <p className="text-lg">Dashboard Options</p>
                <IoCloseCircleOutline
                    className="cursor-pointer text-3xl"
                    onClick={() => setShow(false)}
                />
            </div>

            <div className="px-4 py-3 overflow-y-auto">
                {/* Dashboard Options List */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between py-2 border-b">
                        <p className="text-sm">Profile Settings</p>
                        <FaChevronDown />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <p className="text-sm">Manage Teams</p>
                        <FaChevronDown />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <p className="text-sm">Notifications</p>
                        <FaChevronDown />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                        <p className="text-sm">Logout</p>
                        <FaSignOutAlt />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardOptions;
