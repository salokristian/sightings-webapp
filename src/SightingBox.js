import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import SightingTable from "./SightingTable";
import SightingForm from "./SightingForm";

class SightingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightingData: [],
      acceptedSpecies: []
    };
  }

  loadSightingsFromServer() {
    fetch("http://localhost:8081/sightings").then(
      response => response.json()
    ).then( sightings => 
      this.setState({sightingData: sightings})
    );
  }

  loadSpeciesFromServer() {
    fetch("http://localhost:8081/species").then(
      response => response.json()
    ).then(species => 
      this.setState({acceptedSpecies: species})
    );
  }

  componentDidMount() {
    this.loadSightingsFromServer();
    this.loadSpeciesFromServer();
  }

  render() {
    return (
      <div className="Sighting-App">
        <h1> Duck Sighting App </h1>
        <Grid>
          <Row className="show-grid">
            <Col md={8}>
              <SightingTable data={this.state.sightingData}/>
            </Col>
            <Col md={4}>
              <SightingForm />
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
