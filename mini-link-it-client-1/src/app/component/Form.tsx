'use-client'

import { useState } from "react";
import { nanoid } from 'nanoid'
import { isWebUri } from 'valid-url';
import { getDatabase, child, ref, set, get } from "firebase/database";

type FormFields = {
    longURL: string;
    preferredAlias: string;
};

type ErrorMessages = {
    longURLErrorMessage: string;
    suggestedAliasErrorMessage: string;
}

//Change URL to your Domain
const SHORTNER_DOMAIN = "minilinkit.com"


export default function Form() {

    const [formValues, setFormValues] = useState<FormFields>({
        longURL: "",
        preferredAlias: "",
    });

    const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
        longURLErrorMessage: "",
        suggestedAliasErrorMessage: "",
    });

    const [generatedURL, setGeneratedURL] = useState('');
    const [toolTipMessage, setToolTipMessage] = useState('Copy To Clip Board')


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const onSubmit = async () => {


        validateInput().then((results) => {

            // Validation failed
            if (!results) {
                return
            }

            //If the user has input a prefered alias then we use it, if not, we generate one
            var generatedKey = nanoid(5);
            var generatedURL = SHORTNER_DOMAIN +'/'+  generatedKey

            var l_prefferedAlias = formValues.preferredAlias

            if (l_prefferedAlias !== '') {
                generatedKey = l_prefferedAlias
                generatedURL = SHORTNER_DOMAIN +'/'+ l_prefferedAlias
            }

            // Write to db
            const db = getDatabase();
            set(ref(db, '/' + generatedKey), {
                generatedKey: generatedKey,
                longURL: formValues.longURL,
                preferedAlias: l_prefferedAlias,
                generatedURL: generatedURL
            }).then((result) => {
                setGeneratedURL(generatedURL)
            }).catch((e) => {
                console.log(e)
            })
        })
    }

    const validateInput = async () => {
        let errors = [];
        // Clear previous errors
        setErrorMessages({
            longURLErrorMessage: "",
            suggestedAliasErrorMessage: "",
        });

        //Validate long url. Should not be empty and should be a valid url
        if (formValues.longURL.length === 0) {
            errors.push("longURL");
            setErrorMessages((prev) => ({
                ...prev,
                longURLErrorMessage: 'Please enter your URL!',
            }));
        } else if (!isWebUri(formValues.longURL)) {
            errors.push("longURL");
            setErrorMessages((prev) => ({
                ...prev,
                longURLErrorMessage: 'Please a URL in the form of https://...',
            }));
        }

        //Preferred Alias
        if (formValues.preferredAlias !== '') {
            if (formValues.preferredAlias.length > 7) {
                errors.push("suggestedAlias");
                setErrorMessages((prev) => ({
                    ...prev,
                    suggestedAliasErrorMessage: 'Please enter an Alias less than 7 Characters',
                }));
            } else if (formValues.preferredAlias.indexOf(' ') >= 0) {
                errors.push("suggestedAlias");
                setErrorMessages((prev) => ({
                    ...prev,
                    suggestedAliasErrorMessage: 'Spaces are not allowed in URLS, remove space from alias',
                }));
            }

            var keyExists = await checkKeyExists()

            if (keyExists) {
                errors.push("suggestedAlias");
                setErrorMessages((prev) => ({
                    ...prev,
                    suggestedAliasErrorMessage: 'The Alias you have entered already exists! Please enter another one =-)',
                }));
            }
        }

        if (errors.length > 0) {
            return false;
        }
        return true;
    }

    const checkKeyExists = async () => {
        const dbRef = ref(getDatabase());
        try {
            const snapshot = await get(child(dbRef, `/${formValues.preferredAlias}`));
            return snapshot.exists()
        } catch (error) {
            console.error("Error checking key:", error);
            return false;
        }
    }

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(generatedURL)
        setToolTipMessage('Copied')
    }


    return (
        <div className="w-auto mx-auto bg-white shadow-[0px_14px_80px_rgba(34,35,58,0.2)] px-[55px] pt-[40px] pb-[45px] rounded-[15px] transition-all duration-300">
            <form autoComplete="off" className="space-y-6">
                <h1 className="font-bold text-center  leading-none pb-2 text-lg">Mini Link It!</h1>

                {/* Long URL */}
                <div>
                    <label htmlFor="longURL" className="block mb-2 font-semibold">Enter Your Long URL</label>
                    <input
                        id="longURL"
                        onChange={handleChange}
                        value={formValues.longURL}
                        type="url"
                        required
                        placeholder="https://www..."
                        className="border border-gray-300 focus:border-[#167bff] focus:shadow-none outline-none px-3 py-2 rounded w-full"
                    />
                    <div>
                        {errorMessages.longURLErrorMessage && <p className="text-xs text-red-500 font-medium flex items-center mt-2">{errorMessages.longURLErrorMessage}</p>}
                    </div>
                </div>

                {/* Mini URL */}
                <div>
                    <label htmlFor="preferredAlias" className="block mb-2 font-semibold">Your Mini URL</label>
                    <div className="flex w-full  overflow-hidden">
                        <span className="px-4 inline-flex items-center min-w-fit border border-e-0 border-gray-300 bg-gray-50 
                        rounded-s text-sm text-gray-500">
                            {SHORTNER_DOMAIN}
                        </span>
                        <input
                            id="preferredAlias"
                            onChange={handleChange}
                            value={formValues.preferredAlias}
                            type="text"
                            placeholder="eg. 3fwias (Optional)"
                            className="border 
                            rounded-e
                            border-gray-300 focus:border-[#167bff] focus:shadow-none outline-none px-3 py-2 w-full"
                        />

                    </div>
                    <div>
                        {errorMessages.suggestedAliasErrorMessage && <p className="text-xs text-red-500 font-medium flex items-center mt-2">{errorMessages.suggestedAliasErrorMessage}</p>}
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

                {
                    generatedURL === '' ?
                        <></>
                        :
                        <div className="">
                            <span>Your generated URL is: </span>
                            <div>
                                <div className="flex rounded-lg">
                                    <input type="text"
                                        readOnly
                                        value={generatedURL}
                                        className="border rounded
                            border-gray-300 focus:border-[#167bff] focus:shadow-none outline-none px-3 py-2 w-full"/>
                                    <div className="relative group inline-block">
                                        <button
                                            type="button"
                                            onClick={copyToClipBoard}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Copy
                                        </button>
                                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max text-sm bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            {toolTipMessage}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </form>
        </div>

    );
}

