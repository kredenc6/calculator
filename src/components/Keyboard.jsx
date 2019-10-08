import React, {useEffect} from "react";
import Button from "./Button.jsx";

const Keyboard = props => {
  const handleClick = event => {
    let newValue;
    let buttonClasses;
    const {num1, num2, operator, result} = props.calcVariables;
    
    if(props.message.visible) {
      props.setMessage(
        {
          ...props.message,
          visible: false
        }
      );
    }

    if(!event.key) {
      newValue = event.target.innerText;
      buttonClasses = event.target.className;
    } else {
      let {key, classNameSubstitute} = filterKeys(event);
      newValue = key;
      buttonClasses = classNameSubstitute;
      if(!key) return;
    }

    if(buttonClasses.includes("clear")) {
      props.setCalcVariables(
        {
          num1: "0",
          num2: "",
          operator: ""
        });
    }

    if(buttonClasses.includes("operator") &&
       newValue !== "=") {
      if(num2) { 
        props.setCalcVariables(
          {
            num1: calculate(num1, num2, operator),
            num2: "",
            operator: newValue
          });
      } else {
        props.setCalcVariables(
          {
            ...props.calcVariables,
            operator: newValue,
            result: false
          });
      }
    }

    if(newValue === "=") {
      if(num2) {
        props.setCalcVariables(
          {
            num1: calculate(num1, num2, operator),
            num2: "",
            operator: "",
            result: true
          }
        )
      }
    }

    if(newValue === ".") {
      if(result) {
        props.setCalcVariables(
          {...props.calcVariables,
            num1: "0.",
            result: false
          });
        } else
      if(operator) {
        if(num2.length >= props.maxNumbers) return;
        if(num2.includes(".")) return;
        props.setCalcVariables(
          {
            ...props.calcVariables,
            num2: `${num2 === "0" || num2 === "" ? "0" : num2}.`
          });
      } else {
          if(num1.length >= props.maxNumbers) return;
          if(num1.includes(".")) return;
          props.setCalcVariables(
            {
              ...props.calcVariables,
              num1: `${num1}.`,
            });
        }
    }

    if(buttonClasses.includes("number")) {
      if(result) {
        props.setCalcVariables(
          {...props.calcVariables,
            num1: `${newValue}`,
            result: false
          });
        } else
        if(operator) {
          if(num2.length >= props.maxNumbers) return;
          props.setCalcVariables(
            {
              ...props.calcVariables,
              num2: `${num2 === "0" ? "" : num2}${newValue}`
            });
          } else {
            if(num1.length >= props.maxNumbers && !result) return;
            props.setCalcVariables(
              {
                ...props.calcVariables,
                num1: `${num1 === "0" ? "" : num1}${newValue}`
              });
          }
    }
  };

  const filterKeys = event => {
    const allowedNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const allowedOperators = ["+", "-", "*", "/", "=", "Enter"];
    let classNameSubstitute;
    let key;

    if(allowedNumbers.includes(event.key)) {
      key = event.key;
      classNameSubstitute = "number";
    }

    if(allowedOperators.includes(event.key)) {
      key = event.key;
      classNameSubstitute = "operator";
      
      key = key === "Enter" ? "=" : key;
    }

    if(event.key === "Backspace" || event.key === "Delete") {
      key = "clear";
      classNameSubstitute = "clear";
    }

    if(event.key === "," || event.key === ".") {
      key = ".";
      classNameSubstitute = "decimal";
    }

    return {key, classNameSubstitute};
  };

  let calculate = (num1,num2,operator) => {
    const result = Function(`return ${num1} ${operator} ${num2}`)();
    return result.toString();
  }

  useEffect(() => {
    window.addEventListener("keydown", handleClick);
    return () => {
      window.removeEventListener("keydown", handleClick);
    }
  }, [props.calcVariables]);

  return(
    <div className="keyboard">
      <div className="row">
        <Button value="clear" onClick={handleClick} wide={true} />
        <Button value="*"  onClick={handleClick} />
        <Button value="/"  onClick={handleClick} />
      </div>
      <div className="row">
        <Button value="7" onClick={handleClick} />
        <Button value="8"  onClick={handleClick} />
        <Button value="9"  onClick={handleClick} />
        <Button value="-"  onClick={handleClick} />
      </div>
      <div className="row">
        <Button value="4"  onClick={handleClick} />
        <Button value="5"  onClick={handleClick} />
        <Button value="6"  onClick={handleClick} />
        <Button value="+"  onClick={handleClick} />
      </div>
      <div className="row">
        <Button value="1"  onClick={handleClick} />
        <Button value="2"  onClick={handleClick} />
        <Button value="3"  onClick={handleClick} />
        <Button value="="  onClick={handleClick} />
      </div>
      <div className="row">
        <Button value="0"  onClick={handleClick} wide={true} />
        <Button value="."  onClick={handleClick} />
      </div>
    </div>
  );
}

export default Keyboard;