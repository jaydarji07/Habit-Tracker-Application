

import { useDispatch } from "react-redux";
import { setShowStatus } from "../Redux/Reducer/habitReducer";

const HabitListItem = (props) => {
    const dispatch = useDispatch();

    const { name, completedDays, url } = props.habit;

    const handleClick = () => {
        dispatch(setShowStatus(props.habit));
    }

    // Dynamic background color based on completed days
    const backgroundColor = completedDays === 7 ? "bg-green-300" : completedDays >= 4 ? "bg-yellow-300" : "bg-red-300";

    return (
        <div className={`w-full h-14 ${backgroundColor} font-semibold my-2 rounded-lg p-3 flex justify-between items-center cursor-pointer 
                        hover:bg-opacity-75 transition-all duration-300 ease-in-out shadow-md`}
            onClick={handleClick}>

            {/* Habit Information */}
            <div className="flex flex-col">
                <p className="text-lg">{name}</p>
                <small className="text-gray-700">{completedDays}/7 Days Completed</small>
            </div>

            {/* Habit Icon */}
            <div className="flex-shrink-0">
                <img src={url} alt="icon" className="h-10 w-10 object-cover rounded-full border-2 border-indigo-400" />
            </div>
        </div>
    )
}

// export the component
export default HabitListItem;
