import React from "react";

const MainDisplay = (props) => {
  const {num1, num2, operator} = props.calcVariables;
  return(
    <div className="mainDisplay">
      {`${num1} ${operator} ${num2}`}
    </div>
  );
}

export default MainDisplay;