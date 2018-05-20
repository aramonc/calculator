import React from 'react';

const Button = (props) => {
  const style = {
    width: "100%"
  };

  return <button style={style} onClick={ () => props.click(props.value) }>{props.label}</button>
};

export default Button
