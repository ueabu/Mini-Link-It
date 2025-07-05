'use-client'

import { useState } from "react";



export default function Form() {

    const inputStyles = "border border-gray-300 focus:border-[#167bff] focus:shadow-none outline-none px-3 py-2 rounded block";

    const [longURL, setLongURL] = useState("");
    const [preferedAlias, setPreferedAlias] = useState("");


    function handleChange() {

    }

    function onSubmit() {

    }


    return (
        <div className="w-auto mx-auto bg-white shadow-[0px_14px_80px_rgba(34,35,58,0.2)] px-[55px] pt-[40px] pb-[45px] rounded-[15px] transition-all duration-300">
            <form autoComplete="off" className="space-y-6">
                <h2 className="font-medium text-center m-0 leading-none pb-2 text-lg">Mini Link It!</h2>

                {/* Long URL */}
                <div>
                    <label htmlFor="longURL" className="block mb-2">Enter Your Long URL</label>
                    <input
                        id="longURL"
                        onChange={handleChange}
                        value={longURL}
                        type="url"
                        required
                        placeholder="https://www..."
                        className="border border-gray-300 focus:border-[#167bff] focus:shadow-none outline-none px-3 py-2 rounded w-full"
                    />
                </div>

                {/* Mini URL */}
                <div>
                    <label htmlFor="preferedAlias" className="block mb-2">Your Mini URL</label>
                    <div className="flex w-full  overflow-hidden">
                        <span className="px-4 inline-flex items-center min-w-fit border border-e-0 border-gray-300 bg-gray-50 
                        rounded-s text-sm text-gray-500">
                            minilinkit.com
                        </span>
                        <input
                            id="preferedAlias"
                            onChange={handleChange}
                            value={preferedAlias}
                            type="text"
                            placeholder="eg. 3fwias (Optional)"
                            className="border 
                            rounded-e
                            border-gray-300 focus:border-[#167bff] focus:shadow-none outline-none px-3 py-2 w-full"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={onSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Mini Link It
                </button>
            </form>
        </div>

    );
}

