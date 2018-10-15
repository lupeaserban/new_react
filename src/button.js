import React from "react";

export default class Button extends React.Component {
  render() {
    const { title, click, pressed, pressedColor, color } = this.props;
    const backgroundColor = pressed ? pressedColor : color;

    const style = {
      background: backgroundColor,
      position: "relative",
      margin: "20px 0px 0px 20px"
    };

    return (
      <button onClick={click} style={style}>
        {title}
      </button>
    );
  }
}
