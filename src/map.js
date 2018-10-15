import React from "react";
import mapboxgl from "mapbox-gl";

import Dropdown from "./dropdown";

mapboxgl.accessToken =
  "pk.eyJ1IjoibHVwZWFzZXJiYW4iLCJhIjoiY2owaGNsMjZyMDJ5eDJxcDVleWE2a3BjdCJ9.fMYQbhKexTYmOygHsUSUEw";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.showLayer = this.showLayer.bind(this);
    this.hideLayer = this.hideLayer.bind(this);
    this.toggleLayer = this.toggleLayer.bind(this);
    this.getTheDayAndWeek = this.getTheDayAndWeek.bind(this);
  }

  getTheDayAndWeek() {
    let d = new Date();
    let hour = d.getHours();
    let firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    let week = Math.ceil((d.getDate() + firstDay) / 7);
    let weekofmon = "week" + week + "ofmon";

    return {
      weekofmon: weekofmon,
      hour: hour,
      dayName: d.toString().split(" ")[0],
      date: d
    };
  }

  // getDerivedstatefromprops {
  //   get date and get hour and pass them into state
  // }

  componentDidMount() {
    const rightNow = this.getTheDayAndWeek();
    window.alert("This is street sweeper for today, " + rightNow.date);
    console.log(rightNow);

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/lupeaserban/cjfbyjjtv04362rpavlr7edsx",
      center: [-122.41, 37.77], // starting position [lng, lat]
      zoom: 11 // starting zoom
    });
    this.map.on("style.load", () => {
      this.map.addSource("streets", {
        type: "geojson",
        data:
          "https://rawgit.com/lupeaserban/react_mapbox/master/street_sweep.geojson"
      });
      //addLayer filter with current day
      this.map.addLayer({
        id: "now",
        type: "line",
        source: "streets",
        filter: [
          "all",
          ["==", "weekday", rightNow.dayName],
          ["==", rightNow.weekofmon, "Y"]
        ],
        paint: {
          "line-width": 1.4,
          "line-color": "white"
        }
      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  hideLayer(id) {
    this.map.removeLayer(id);
  }

  showLayer(id, day, color) {
    // Find the index of the first symbol layer in the map style
    const layers = this.map.getStyle().layers;
    let firstSymbolLayer;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol") {
        firstSymbolLayer = layers[i].id;
        break;
      }
    }

    this.map.addLayer(
      {
        id: id,
        type: "line",
        source: "streets",
        filter: ["==", "weekday", day],
        paint: {
          "line-width": 1.4,
          "line-color": color
        }
      },
      firstSymbolLayer
    );
  }

  toggleLayer(id, day, color, callback, callback2) {
    if (!this.state[id]) {
      this.showLayer(id, day, color);
    } else {
      this.hideLayer(id);
    }
    this.setState(
      prevState => {
        return {
          [id]: !prevState[id]
        };
      },
      () => {
        callback(color);
        callback2(day);
      }
    );
  }

  render() {
    const style = {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%"
    };

    return (
      <div>
        <div style={style} ref={el => (this.mapContainer = el)} />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Dropdown labelName="Select a day" toggleLayer={this.toggleLayer} />
          <Dropdown labelName="Select hours" />
        </div>
      </div>
    );
  }
}
