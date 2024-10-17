
import { useDispatch } from "react-redux";
import { toggleHabitStatus } from "../Redux/Reducer/habitReducer";
import SingleDayStatus from "./SingleDayStatus";
import { toast } from "react-toastify";

const WeekStatus = ({ habitIndex, handleCloseClick, showStatus, weekDays }) => {
    const dispatch = useDispatch();

    const toggleStatus = (dayIndex, status) => {
        dispatch(toggleHabitStatus({ habitIndex, dayIndex, status }));

        // Display a success message based on the status
        if (status !== null) {
            const statusMessage = status 
                ? `${showStatus.name} marked as done on ${weekDays[dayIndex]}` 
                : `${showStatus.name} marked as not done on ${weekDays[dayIndex]}`;
            toast.success(statusMessage);
        } else {
            toast.error(`Status for ${showStatus.name} on ${weekDays[dayIndex]} was cleared.`);
        }
    }

    return (
        <div className="w-full p-1 h-full border-b-2 border-indigo-800 md:border-none">
            {/* Close button for desktop view */}
            <button
                className="hidden md:block float-left bg-red-500 text-white px-2 rounded-md transition-transform duration-300 transform hover:scale-105"
                onClick={handleCloseClick}
                aria-label="Close"
            >
                X
            </button>

            <h1 className="text-center text-2xl text-indigo-600 font-semibold">
                <span className="text-black">Habit:</span> {showStatus.name}
            </h1>

            {/* Days Completed and Created Date */}
            <h1 className="text-md font-semibold text-stone-500 mt-2">
                <span className="md:hidden float-left">Days Completed: {showStatus.completedDays} / 7</span>
                <span className="float-right">Added On: {new Date(showStatus.createdOn).toLocaleDateString()}</span> 
            </h1>

            {/* Weekly Progress Section */}
            <div className="w-full h-full mt-5 bg-fixed overflow-y-auto">
                <h1 className="w-full text-center text-lg font-semibold mb-2">Your Weekly Progress:</h1>
                
                {/* Week days and their statuses */}
                <div className="w-full h-full p-2 flex flex-row justify-between flex-wrap items-center mt-2 space-y-2 md:space-y-0 md:space-x-2">
                    {weekDays.map((day, i) => (
                        <SingleDayStatus
                            key={i}
                            day={day}
                            i={i}
                            status={showStatus.weekStatus[i]} // Dynamic status for each day
                            toggleStatus={toggleStatus} // Passing the toggle function
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WeekStatus;
