import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import SightingTable from "./SightingTable";
import SightingForm from "./SightingForm";
import "./SightingBox.css";
import duck_img from "./duck_contour.png";


/**
A root class for handling all AJAX requests and passing the fetched sighting and species data
as props to child classes SightingTable and SightingForm for presentation.
*/
class SightingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightingData: [],
      sorted: 2,    //1 = Ascending, 2 = Descending
      acceptedSpecies: [],
      fetchStatus: {display: false, msg: "", style: ""}, // Control error and info msgs for fetch and send
      sendStatus: {display: false, msg: "", style: ""}
    };
  }

  loadSightingsFromServer() {
    fetch("http://localhost:8081/sightings").then( response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }).then( sightings => 
      this.setState({
        sightingData: sightings,
        fetchStatus: {display: false}
      })
    ).then( () => 
      this.sortSightingsByDate(true)
    ).catch( () => {
      this.setState({
        fetchStatus: {
          display: true,
          msg: "There was a problem with the network connection. Sightings could not be loaded. Please reload the page.",
          style: "danger"
        }
      });
    });
  }

  loadSpeciesFromServer() {
    fetch("http://localhost:8081/species").then( response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }).then(species => 
      this.setState({acceptedSpecies: species})
    ).catch( () => {
      this.setState({
        fetchStatus: {
          display: true,
          msg: "There was a problem with the network connection. Sightings could not be loaded. Please reload the page.",
          style: "danger"
        }
      });
    });
  } 

  sendSightingToServer(data) {
    fetch("http://localhost:8081/sightings", {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST"
    }).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      this.loadSightingsFromServer();
      this.setState({
        sendStatus: {
          display: true,
          msg: "Sighting sent succesfully.",
          style: "success"
        }
      });
    }).catch(error => {
      this.setState({
        sendStatus: {
          display: true,
          msg: "There was a problem with the network connection. Error message: " + error.message,
          style: "danger"
        }
      });
    });
  }

  componentDidMount() {
    this.loadSightingsFromServer();
    this.loadSpeciesFromServer();
    setInterval(() => {                  
      this.loadSightingsFromServer();
      this.loadSpeciesFromServer();
    }, 5000); 
  }

  /**
  Reverses the order of sorting by default (user clicks on sorting arrow).
  If resort is true (data is refetched from the server), the ordering is not
  reversed, just redone.
  */ 
  sortSightingsByDate(reSort) { 
    let sightings = this.state.sightingData;
    let sortStatus = {};
    if ((this.state.sorted === 2 && !reSort) || (reSort && this.state.sorted === 1)) {
      sightings.sort((s1, s2) => {
        return Date.parse(s1.dateTime) - Date.parse(s2.dateTime);
      });
      sortStatus.sorted = 1;
    }
    else {
      sightings.sort((s1, s2) => {
        return Date.parse(s2.dateTime) - Date.parse(s1.dateTime);
      });
      sortStatus.sorted = 2;
    }
    this.setState(sortStatus);
  }

  render() {
    return (
      <div className="Sighting-App">
        <div className="header">
          <img src={duck_img} className="app-logo" alt="simplistic duck logo for the app"/>
          <h1> DUCK SIGHTING APP </h1>
          <h4> Check out the latest sightings from all over the world and add your own ones! </h4>
        </div>
        <Grid>
          <Row className="show-grid">
            <Col md={8}>
              <h2> OLD SIGHTINGS </h2>
              <SightingTable error={this.state.fetchStatus} data={this.state.sightingData} sort={() => this.sortSightingsByDate()} sortType={this.state.sorted}/>
            </Col>
            <Col md={4}>
              <h2> ADD A SIGHTING </h2>
              <SightingForm species={this.state.acceptedSpecies} onSubmit={(data) => this.sendSightingToServer(data)} statusMsg={this.state.sendStatus}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default SightingBox;
