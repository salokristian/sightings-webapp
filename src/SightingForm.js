import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";
import DateTime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

class SightingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: "",
      count: "",
      dateTime: moment(),
      description: ""
    };
  }

  handleChange(event) {
    const target = event.target;
    this.setState({[target.id]: target.value});
  }

  handleDateChange(dateObj) {
    this.setState({dateTime: dateObj}); //if isn't valid it is a string, needs to be checked
  }
  
  render() {
    const species = this.props.species.map(species =>
      <option value={species.name} key={species.name}> {species.name} </option>
    );
    return(
      <div>
        <h3> Add a new sighting </h3>
        <form>

          <FormGroup controlId="species">
            <ControlLabel>Select species</ControlLabel>
            <FormControl componentClass="select" value={this.state.species} onChange={(e) => this.handleChange(e)}>
              <option disabled value=""> -- select species -- </option>
              {species}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="count">
            <ControlLabel>Count</ControlLabel>
            <FormControl type="text" placeholder="100" value={this.state.count} onChange={(e) => this.handleChange(e)}/>
          </FormGroup>

          <FormGroup controlId="dateTime">
            <ControlLabel>Date and time</ControlLabel>
            <DateTime value={this.state.dateTime} onChange={dateObj => this.handleDateChange(dateObj)}/> 
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="A whole squad of redheads. Produced horrible noice."
              value={this.state.description} onChange={(e) => this.handleChange(e)} />
          </FormGroup>

        </form>
      </div>
    );
  }
}

export default SightingForm;