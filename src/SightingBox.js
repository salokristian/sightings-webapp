import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import SightingTable from './SightingTable';
import SightingForm from './SightingForm';

class SightingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  render() {
    return (
      <div className="Sighting-App">
        <h1> Duck Sighting App </h1>
        <Grid>
          <Row className="show-grid">
            <Col md={8}>
              <SightingTable />
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
