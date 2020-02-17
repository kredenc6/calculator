import React from "react";
import Message from "../components/Message.jsx";


const MainDisplay = (props) => {
  const {num1, num2, operator} = props.calcVariables;
  
  return(
    <div className="mainDisplay">
      {props.message.visible ? <Message message={props.message} /> : null}
      {`${num1} ${operator} ${num2}`}
    </div>
  );
}

export default MainDisplay;