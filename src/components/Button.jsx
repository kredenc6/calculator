import React from "react";

const Button = (props) => {
  let className;
  if(props.value === "clear") {
    className = "clear";
  } else
  if(props.value === ".") {
    className = "decimal";
  } else
  if(Number(props.value) < 10) {
    className = "number";
  }
  else {
    className = "operator";
  }

  return(
    <div
      key={props.value}
      className={className + " button" + (props.wide ? " wide" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </div>
  );
}

export default Button;