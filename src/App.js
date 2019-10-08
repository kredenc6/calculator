import React, {useState, useEffect} from 'react';
import MainDisplay from "./components/MainDisplay.jsx";
import Keyboard from "./components/Keyboard.jsx";


function App() {
  const [calcVariables, setCalcVariables] = useState(
    {
      num1: "0",
      num2: "",
      operator: "",
      result: false
    });

  const maxNumbers = 15;

  useEffect(() => {
    const {num1, result} = calcVariables;
    if(result && num1.length > (maxNumbers)) {

      if(Number(num1) > Number("" + "9".repeat(maxNumbers)) ||
         Number(num1) < Number("-" + "9".repeat(maxNumbers - 1))) {
           setCalcVariables(
             {
               ...calcVariables,
               num1: "0"
             }
           );
           alert("Too big/small number. Result won't fit.");
      } else {
        setCalcVariables(
          {
            ...calcVariables,
            num1: num1.substring(0, maxNumbers)
          }
        );
        // alert("The result was rounded.");
      }
    }
  },[calcVariables]);
  
  return (
    <div className="App">
      <MainDisplay calcVariables={calcVariables} />
      <Keyboard
        calcVariables={calcVariables}
        setCalcVariables={setCalcVariables}
        maxNumbers={maxNumbers}
      />
    </div>
  );
}

export default App;