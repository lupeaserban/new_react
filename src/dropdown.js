import React from "react";
import "./styles.css";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "...",
      backgroundColor: "red",
      displayMenu: false
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  changeBackgroundColor(color) {
    console.log(color);
    this.setState({
      backgroundColor: color || "red"
    });
  }

  changeName(name) {
    this.setState({
      name: name || "Meniu"
    });
  }

  render() {
    const { toggleLayer, labelName, realName} = this.props;
    const { name, backgroundColor, displayMenu } = this.state;
    return (
      <div
        className="dropdown"
        style={{
          textAlign: "center",
          background: backgroundColor,
          width: "200px",
          position: "relative",
          margin: "20px 0px 0px 0px"
        }}
      >
        <div style={{ marginBottom: "5px", background: "white" }}>
          {labelName}
        </div>
        <div
          className="button"
          onClick={this.showDropdownMenu}
          style={{ cursor: "pointer" }}
        >
          {realName ? realName : name}
        </div>

        {displayMenu ? (
          <ul>
            <li
              onClick={() =>
                toggleLayer(
                  "week1",
                  "Mon",
                  "red",
                  this.changeBackgroundColor,
                  this.changeName
                )
              }
            >
              MONDAY
            </li>
            <li
              onClick={() =>
                toggleLayer(
                  "week2",
                  "Tues",
                  "blue",
                  this.changeBackgroundColor,
                  this.changeName
                )
              }
            >
              TUESDAY
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}
