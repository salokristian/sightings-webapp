import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import SightingTable from "./SightingTable";
import SightingForm from "./SightingForm";

class SightingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sightingData: [],
      sorted: 1,    //1 = Ascending, 2 = Descending
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
  } //there is a problem with the network connection, please reload the page (an alert)

  componentDidMount() {
    this.loadSightingsFromServer();
    this.loadSpeciesFromServer();
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
        <h1> Duck Sighting App </h1>
        <Grid>
          <Row className="show-grid">
            <Col md={8}>
              <SightingTable data={this.state.sightingData} sort={() => this.sortSightingsByDate()} sortType={this.state.sorted}/>
            </Col>
            <Col md={4}>
              <SightingForm species={this.state.acceptedSpecies}/>
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
