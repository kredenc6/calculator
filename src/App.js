import React, {useState, useEffect} from 'react';
import MainDisplay from "./components/MainDisplay.jsx";
import Keyboard from "./components/Keyboard.jsx";

function App() {
  const [message, setMessage] = useState(
    {
      visible: false,
      text: "Won't fit"
    }
  );
  const [calcVariables, setCalcVariables] = useState(
    {
      num1: "0",
      num2: "",
      operator: "",
      result: false
    });

    // maxNumbers limits result as well as input(in Keyboard.jsx)
    const MAX_NUMBERS = 15;
    
    const calculate = (num1,num2,operator) => {
      let result;
      switch (operator) {
        case "+":
          result = Number(num1) + Number(num2);
          break;
      
        case "-":
          result = num1 - num2;
          break;
      
        case "*":
          result = num1 * num2;
          break;
      
        case "/":
          result = num1 / num2;
          break;
      
        default:
          console.error(`Switch statement received unknown operator "${operator}".`);
          return;
      }
      if(Number.isInteger(result)) return result.toString();
      
      result = result.toPrecision(MAX_NUMBERS).toString(); // round decimal to precision
      for(let i=result.length - 1; ;i--) { // get rid of redundant zeros
        if(result[i] === "0") result = result.substring(0, result.length - 1);
        else break;
      }
      return result;
    };

  // adjusting/allowing max count of integers and decimals
  useEffect(() => {
    const {num1, result} = calcVariables;
    const maxNumbers = MAX_NUMBERS + 2;
    if(result && num1.length > (maxNumbers)) {

      if(Number(num1) > Number("" + "9".repeat(maxNumbers)) ||
         Number(num1) < Number("-" + "9".repeat(maxNumbers - 1))) {
        setCalcVariables(
          {
            ...calcVariables,
            num1: "0"
          }
        );
        setMessage(
          {
            ...message,
            visible: true
          }
        )
      } else {
        let roundedResult = num1.endsWith(".") ? num1.substring(0, maxNumbers - 1) : num1.substring(0, maxNumbers);
        setCalcVariables(
          {
            ...calcVariables,
            num1: roundedResult
          }
        );
      }
    }
  },[calcVariables, message]);

  // responsive font size
  useEffect(() => {
    function computeAndStyleFontSize() {
      const mainDisplayNode = document.getElementsByClassName("mainDisplay")[0];
      const buttonNodes = document.getElementsByClassName("button");
      const displayWidth = /\d+/.exec(window.getComputedStyle(mainDisplayNode).width)[0];
      let calculatedSize;
      
      if(displayWidth > 390) {
        calculatedSize = `${Math.round(displayWidth / 9)}px`;
      }
      else {
        calculatedSize = `${Math.round(displayWidth / 10)}px`;
      }
      
      mainDisplayNode.style.fontSize = calculatedSize;
      for(let button of buttonNodes) {
        button.style.fontSize = calculatedSize;
      }
    }

    computeAndStyleFontSize();
    window.addEventListener("resize", computeAndStyleFontSize);
  },[]);
  
  return (
    <div className="App">
      <MainDisplay calcVariables={calcVariables} message={message} />
      <Keyboard
        calcVariables={calcVariables}
        setCalcVariables={setCalcVariables}
        maxNumbers={MAX_NUMBERS}
        message={message}
        setMessage={setMessage}
        calculate={calculate}
      />
    </div>
  );
}

export default App;