import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Button, Alert } from "react-bootstrap";
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
      if ((parseInt(target.value) && target.value > 0)) {
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
    if ((parseInt(this.state.count.value) && this.state.count.value > 0) || this.state.count.value === "") {
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

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      species: this.state.species.value,
      count: parseInt(this.state.count.value),
      dateTime: this.state.dateTime.value.format("YYYY-MM-DDTHH:mm:ss") + "Z",
      description: this.state.description.value
    };
    this.props.onSubmit(data);
    this.setState({
      species: {value: "", valid: false},
      count: {value: "", valid: false},
      dateTime: {value: moment(), valid: true},
      description: {value: "", valid: false},
    });
  }

  render() {
    const species = this.props.species.map(species =>
      <option value={species.name} key={species.name}> {species.name} </option>
    );
    return(
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup controlId="species" >
            <ControlLabel>Species</ControlLabel>
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
          {this.props.statusMsg.display && <div>
            <br /><Alert bsStyle={this.props.statusMsg.style}>{this.props.statusMsg.msg}</Alert></div>}
        </form>
      </div>
    );
  }
}

export default SightingForm;