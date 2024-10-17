
/////

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { habitSelector } from "../Redux/Reducer/habitReducer";

const Quote = () => {
    const { quote } = useSelector(habitSelector);
    const [randomQuote, setRandomQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (quote && quote.length > 0) {
            // Randomly select a quote
            const randomIndex = Math.floor(Math.random() * quote.length);
            setRandomQuote(quote[randomIndex]);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [quote]);

    return (
        <div className="w-full lg:w-4/5 h-fit mt-4 mb-2 shadow-md rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-600 text-white p-4 transition-transform transform hover:scale-105">
            <h1 className="text-sm font-bold">Quote of the Day:</h1>

            {loading ? (
                <div className="text-center text-lg font-semibold">Loading...</div>
            ) : randomQuote ? (
                <div className="w-full text-center text-lg font-semibold">
                    &ldquo;{randomQuote.text}&rdquo;
                </div>
            ) : (
                <div className="w-full text-center text-lg font-semibold">
                    No quotes available.
                </div>
            )}

            {randomQuote && (
                <h1 className="float-right font-semibold text-black">
                    by: {randomQuote.author}
                </h1>
            )}
        </div>
    );
};

export default Quote;
