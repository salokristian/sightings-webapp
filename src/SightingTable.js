import React, { Component } from "react";
import { Table } from "react-bootstrap";



class SightingTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tableData = this.props.data.map(sighting => {
      const date = new Date(sighting.dateTime);
      const formattedDate = date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
      const formattedTime = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
      return (
        <tr key={sighting.id}>
          <td> {sighting.species} </td>
          <td> {sighting.count} </td>
          <td> {formattedDate} </td>
          <td> {formattedTime} </td>
          <td> {sighting.description} </td>
        </tr>
      );
    });
    //if the table is empty
    return(
      <div>
        <Table striped bordered condensed hover responsive>
          <thead> 
            <tr>
              <th className="col-md-2"> Species </th> 
              <th className="col-md-1"> Count </th> 
              <th className="col-md-2"> Date <span onClick={() => this.props.sort()} style={{textAlign:"right", float:"right"}}> {this.props.sortType === 1 ? "\u23F6": "\u23F7"} </span> </th> 
              <th className="col-md-1"> Time </th> 
              <th className="col-md-6"> Description </th> 
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SightingTable;