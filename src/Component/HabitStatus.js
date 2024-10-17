
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { habitSelector, setShowStatus } from "../Redux/Reducer/habitReducer";
import WeekStatus from "./WeekStatus";
import { useState, useEffect } from "react";

// Function to get days for a given week
const CalculateDayOfWeek = (date) => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i);
        days.push(`${currentDate.toLocaleDateString('en-US', { weekday: 'long' })}, ${currentDate.toLocaleDateString()}`);
    }
    return days;
}

const HabitStatus = () => {
    const dispatch = useDispatch();
    const { habits, showStatus } = useSelector(habitSelector);
    const [loading, setLoading] = useState(true);  // Loading state
    const [currentDate, setCurrentDate] = useState(new Date()); // Track the current week
    const weekDays = CalculateDayOfWeek(currentDate);

    // Simulate loading effect (if data is being fetched)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        dispatch(setShowStatus(null));
    };

    const handlePreviousWeek = () => {
        const newDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
        setCurrentDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        setCurrentDate(newDate);
    };

    return (
        <div className="w-full md:w-2/3 h-full ml-1 flex flex-col p-1">
            {/* Navigation */}
            <nav className="w-full p-1 flex justify-between items-center">
                <NavLink to="/">
                    <button className="bg-indigo-400 hover:bg-indigo-500 float-right p-2 rounded text-white transition-all duration-200 ease-in-out transform hover:scale-105">
                        New Habit
                    </button>
                </NavLink>
                <div className="flex space-x-2">
                    <button onClick={handlePreviousWeek} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">Previous Week</button>
                    <button onClick={handleNextWeek} className="bg-gray-300 hover:bg-gray-400 p-2 rounded">Next Week</button>
                </div>
            </nav>

            {/* Main Section */}
            <div className="w-full h-full mt-2 p-2 rounded flex flex-col bg-fixed overflow-y-auto bg-gray-50">
                {/* Loading Spinner */}
                {loading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Show Weekly Status */}
                        <div className="hidden md:block w-full">
                            {!showStatus ? (
                                <h1 className="text-center text-2xl text-indigo-600 font-semibold">
                                    {habits.length !== 0 ? 
                                        'Select a habit from the list to view your weekly status' : 
                                        'Add some habits to see your progress'}
                                </h1>
                            ) : null}
                        </div>

                        {/* Show Weekly Status when selected */}
                        <div className="hidden md:block w-full">
                            {showStatus ? (
                                <WeekStatus handleCloseClick={handleCloseClick}
                                            showStatus={showStatus}
                                            weekDays={weekDays} />
                            ) : null}
                        </div>

                        {/* Mobile View: List of Habits */}
                        <div className="block md:hidden w-full h-full">
                            {habits.length === 0 ? (
                                <div className="w-full text-2xl text-center font-semibold text-indigo-600">
                                    Nothing in Your List
                                </div>
                            ) : (
                                habits.map((habit, i) => (
                                    <div key={i} className="my-3 p-3 border rounded-lg shadow-md bg-white transform transition-transform hover:scale-105">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-bold text-indigo-700">{habit.name}</h2>
                                            <button onClick={() => dispatch(setShowStatus(habit))} className="bg-indigo-400 hover:bg-indigo-500 p-2 rounded text-white">
                                                View Status
                                            </button>
                                        </div>
                                        <div className="mt-2">
                                            {/* Animated Progress Bar */}
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${(habit.completedDays / 7) * 100}%` }}></div>
                                            </div>
                                            <small className="text-gray-600">{habit.completedDays}/7 days completed</small>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// export the component
export default HabitStatus;
