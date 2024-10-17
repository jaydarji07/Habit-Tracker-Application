
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHabit, habitSelector, setSuggestionSelected } from "../Redux/Reducer/habitReducer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const AddHabit = () => {
    const dispatch = useDispatch();
    const { habits, suggestionSelected } = useSelector(habitSelector);
    const [habitName, setHabitName] = useState('');
    const [habitCategory, setHabitCategory] = useState('');
    const [habitDuration, setHabitDuration] = useState(30); // Default duration
    const [weekStatus, setWeekStatus] = useState(Array(7).fill(false)); // Track selected days
    const [nameError, setNameError] = useState('');
    const [durationError, setDurationError] = useState('');

    useEffect(() => {
        if (suggestionSelected) {
            setHabitName(suggestionSelected.habit);
        }
    }, [suggestionSelected]);

    const handleWeekStatusChange = (index) => {
        const updatedWeekStatus = [...weekStatus];
        updatedWeekStatus[index] = !updatedWeekStatus[index];
        setWeekStatus(updatedWeekStatus);
    };

    const handleHabitNameChange = (e) => {
        const value = e.target.value;
        setHabitName(value);
        if (!value.trim()) {
            setNameError("Habit name cannot be empty!");
        } else {
            setNameError("");
        }
    };

    const handleHabitDurationChange = (value) => {
        setHabitDuration(value);
        if (value <= 0) {
            setDurationError("Duration must be a positive number!");
        } else {
            setDurationError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nameError || durationError || !habitName.trim()) {
            toast.error('Please fix the errors before submitting!');
            return;
        }

        const newDate = new Date().toString();
        const data = {
            id: uuidv4(),
            name: habitName,
            category: habitCategory,
            duration: habitDuration,
            completedDays: 0,
            createdOn: `${newDate.slice(4, 15)}`,
            url: suggestionSelected ? `${suggestionSelected.url}` : 'https://freeiconshop.com/wp-content/uploads/edd/task-done-flat.png',
            weekStatus: weekStatus,
        };

        dispatch(addHabit(data));
        dispatch(setSuggestionSelected(null));
        resetForm();
        toast.success('New Habit Added!');
    };

    const resetForm = () => {
        setHabitName('');
        setHabitCategory('');
        setHabitDuration(30);
        setWeekStatus(Array(7).fill(false));
    };

    return (
        <div className="w-full lg:w-4/5 h-auto bg-[#C5DFF8] rounded shadow-md flex flex-col p-4 topclaas">
            <h1 className="text-indigo-700 text-lg font-semibold text-center mt-1">Add Habit</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4 mt-4">
                <div>
                    <label htmlFor="habit-name" className="font-semibold">Habit:</label>
                    <input
                        type="text"
                        placeholder="Enter habit name..."
                        id="habit-name"
                        value={habitName}
                        className="w-full h-10 rounded my-2 px-2 border border-gray-300 focus:border-indigo-500"
                        onChange={handleHabitNameChange}
                        required
                    />
                    {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
                </div>

                <div>
                    <label htmlFor="habit-category" className="font-semibold">Category:</label>
                    <input
                        type="text"
                        placeholder="Enter habit category..."
                        id="habit-category"
                        value={habitCategory}
                        className="w-full h-10 rounded my-2 px-2 border border-gray-300 focus:border-indigo-500"
                        onChange={(e) => setHabitCategory(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="habit-duration" className="font-semibold">Duration (Days):</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={habitDuration}
                        onChange={(e) => handleHabitDurationChange(e.target.value)}
                        className="w-full h-10 rounded my-2 px-2 border border-gray-300 focus:border-indigo-500"
                    />
                    <div className="text-indigo-800 font-semibold">Duration: {habitDuration} Days</div>
                    {durationError && <span className="text-red-500 text-sm">{durationError}</span>}
                </div>

                <div>
                    <label className="font-semibold">Select Days:</label>
                    <div className="flex space-x-4 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                            <label key={index} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={weekStatus[index]}
                                    onChange={() => handleWeekStatusChange(index)}
                                    className="mr-2"
                                />
                                <span
                                    className={`font-medium transition-colors ${
                                        weekStatus[index] ? 'text-indigo-700 font-bold' : 'text-gray-600'
                                    }`}
                                >
                                    {day}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-4 p-4 bg-gray-100 rounded shadow-sm">
                    <h2 className="text-indigo-600 font-semibold">Habit Preview:</h2>
                    <p><strong>Habit Name:</strong> {habitName || "Not set yet"}</p>
                    <p><strong>Category:</strong> {habitCategory || "Not set yet"}</p>
                    <p><strong>Duration:</strong> {habitDuration} days</p>
                    <p><strong>Selected Days:</strong> {weekStatus.map((status, index) => status && ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]).filter(Boolean).join(", ") || "None"}</p>
                </div>

                <button
                    type="submit"
                    className="bg-[#9b80fc] hover:bg-indigo-500 rounded shadow-md p-2 text-white font-medium transition duration-200"
                >
                    ADD HABIT
                </button>
            </form>
        </div>
    );
};

export default AddHabit;
