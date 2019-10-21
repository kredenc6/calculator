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
  const maxNumbers = 15;

  // adjusting/allowing max count of integers and decimals
  useEffect(() => {
    const {num1, result} = calcVariables;
    const resultMaxNumbers = maxNumbers + 2;
    if(result && num1.length > (resultMaxNumbers)) {

      if(Number(num1) > Number("" + "9".repeat(resultMaxNumbers)) ||
         Number(num1) < Number("-" + "9".repeat(resultMaxNumbers - 1))) {
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
        let roundedResult = num1.endsWith(".") ? num1.substring(0, resultMaxNumbers - 1) : num1.substring(0, resultMaxNumbers);
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
      const warningNode = document.getElementsByClassName("warning")[0];
      const buttonNodes = document.getElementsByClassName("button");
      const displayWidth = /\d+/.exec(window.getComputedStyle(mainDisplayNode).width)[0];
      let calculatedSize;
      if(displayWidth > 390) {
        calculatedSize = `${Math.round(displayWidth / 9)}px`;
        warningNode.style.fontSize = `${Math.round(displayWidth / 25)}px`;
      }
      else {
        calculatedSize = `${Math.round(displayWidth / 10)}px`;
        warningNode.style.fontSize = `${Math.round(displayWidth / 30)}px`;
      }
      
      mainDisplayNode.style.fontSize = calculatedSize;
      for(let button of buttonNodes) {
        button.style.fontSize = calculatedSize;
      }

      console.log(displayWidth);
      console.log(calculatedSize);
      console.log(`${Math.round(displayWidth / 25)}px`);
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
        maxNumbers={maxNumbers}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}

export default App;