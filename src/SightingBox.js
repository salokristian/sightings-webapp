import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import SightingTable from "./SightingTable";
import SightingForm from "./SightingForm";
import "./SightingBox.css";
import duck_img from "./duck_contour.png";

class SightingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightingData: [],
      sorted: 1,    //1 = Ascending, 2 = Descending
      acceptedSpecies: [],
      fetchStatus: {display: false, msg: "", style: ""},
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
    ).catch( (error) => {
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
    fetch("http://localhost:8081/species").then(
      response => response.json()
    ).then(species => 
      this.setState({acceptedSpecies: species})
    );
  } //there is a problem with the network connection, please reload the page (an alert)

  sendSpeciesToServer(data) {
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
    }, 5000); //Reload every 5 seconds
  }

  sortSightingsByDate() {
    let sightings = this.state.sightingData;
    if (this.state.sorted === 2) {
      sightings.sort((s1, s2) => {
        return Date.parse(s1.dateTime) - Date.parse(s2.dateTime);
      });
      this.setState({sorted: 1});
    }
    else {
      sightings.sort((s1, s2) => {
        return Date.parse(s2.dateTime) - Date.parse(s1.dateTime);
      });
      this.setState({sorted: 2});
    }
  }

  render() {
    return (
      <div className="Sighting-App">
        <div className="header">
          <img src={duck_img} className="app-logo"/>
          <h1> DUCK SIGHTING APP </h1>
        </div>
        <Grid>
          <Row className="show-grid">
            <Col md={8}>
              <h3> OLD SIGHTINGS </h3>
              <SightingTable error={this.state.fetchStatus} data={this.state.sightingData} sort={() => this.sortSightingsByDate()} sortType={this.state.sorted}/>
            </Col>
            <Col md={4}>
              <h3> ADD A SIGHTING </h3>
              <SightingForm species={this.state.acceptedSpecies} onSubmit={(data) => this.sendSpeciesToServer(data)} statusMsg={this.state.sendStatus}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


// componentDidMount() {
//   this.loadCommentsFromServer()
//   setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval)
// }

export default SightingBox;
