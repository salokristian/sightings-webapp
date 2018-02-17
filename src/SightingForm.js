import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from "react-bootstrap";
import DateTime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

class SightingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: {value: "", valid: false},
      count: {value: "", valid: false},
      dateTime: {value: moment(), valid: true},
      description: {value: "", valid: false},
    };
  }

  handleChange(event) {
    const target = event.target;
    let change = {value: target.value};
    if (target.id === "count") {
      if (target.value > 0) {
        change.valid = true;
      }
      else {
        change.valid = false;
      }
    } 
    else if (target.id === "species" || target.id === "description") {
      if (target.value !== "") {
        change.valid = true;
      }
      else {
        change.valid = false;
      }
    }
    this.setState({[target.id]: change});
  }

  handleDateChange(dateObj) {
    let change = {value: dateObj};
    if (typeof dateObj === "string" || dateObj instanceof String) {
      change.valid = false;
    }
    else {
      change.valid = true;
    }
    this.setState({dateTime: change}); 
  }

  getCountValidationState() {
    if (this.state.count.value === "" || this.state.count.value > 0) {
      return null;
    }
    else {
      return "error";
    }
  }

  getDateTimeValidationState() {
    if (typeof this.state.dateTime.value === "string" || this.state.dateTime.value instanceof String) {
      return "error";
    }
    else {
      return null;
    }
  }

  getDescriptionValidationState() {
    if (this.state.description.value === "") {
      return "error";
    }
    else {
      return null;
    }
  }

  areFieldsValid() {
    return this.state.count.valid && this.state.dateTime.valid && this.state.description.valid && this.state.species.valid;
  }

  render() {
    const species = this.props.species.map(species =>
      <option value={species.name} key={species.name}> {species.name} </option>
    );
    return(
      <div>
        <form>
          <FormGroup controlId="species" >
            <ControlLabel>Select species</ControlLabel>
            <FormControl componentClass="select" value={this.state.species.value} onChange={(e) => this.handleChange(e)}>
              <option disabled value=""> -- select species -- </option>
              {species}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="count" validationState={this.getCountValidationState()}>
            <ControlLabel>Count</ControlLabel>
            <FormControl type="text" placeholder="100" value={this.state.count.value} onChange={(e) => this.handleChange(e)}/>
          </FormGroup>

          <FormGroup controlId="dateTime" validationState={this.getDateTimeValidationState()}>
            <ControlLabel>Date and time</ControlLabel>
            <DateTime value={this.state.dateTime.value} onChange={dateObj => this.handleDateChange(dateObj)}/> 
          </FormGroup>

          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="A whole squad of redheads. Produced horrible noice."
              value={this.state.description.value} onChange={(e) => this.handleChange(e)} />
          </FormGroup>

          <Button type="submit" disabled={!this.areFieldsValid()}> Submit </Button>

        </form>
      </div>
    );
  }
}

export default SightingForm;