import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [PreviousPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    // function to send prompt to gemini
    setResultData(""); // clear previous result
    setLoading(true); // set loading to true
    setShowResult(true); // show result
    setRecentPrompt(input)
    const response = await run(input); // send prompt to gemini
    setResultData(response); // set result data
    setLoading(false); // set loading to false
    setinput(""); // clear input
  };  

  const contextValue = {
    // context value for gemini api
    PreviousPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setinput,
    setShowResult,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
