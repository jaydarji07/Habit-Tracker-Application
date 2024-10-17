
import { SuggestedHabit } from "../Data/SuggestedHabit";

// to render a single list item on the screen
import ListItem from "./ListItem";

// render the suggestion list of habits
const Suggestions = () => {
    return (
        <>  
            {/* Navbar showing suggestion heading */}
            <nav className="w-full h-[55px] text-lg text-indigo-700 
                            font-semibold shadow-md p-2 flex justify-center 
                            items-center sticky top-0 bg-[#f4faff]">
                Suggestions
            </nav>

            {/* List container, containing list of the suggested habits */}
            <div className="w-full flex flex-col h-full p-2 overflow-y-auto">

                {/* Map over the array of suggested habits to show all items one by one in the list */}
                {SuggestedHabit.length > 0 ? (
                    SuggestedHabit.map((habit, i) => (
                        <ListItem key={i} habit={habit} />
                    ))
                ) : (
                    <div className="w-full text-center text-gray-500 font-semibold mt-4">
                        No suggestions available. Please check back later!
                    </div>
                )}
            </div>
        </>
    );
}

// export the component
export default Suggestions;
