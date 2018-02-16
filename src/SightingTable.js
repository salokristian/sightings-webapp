import React, { Component } from "react";
import { Table } from "react-bootstrap";



class SightingTable extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const tableData = this.props.data.map(sighting => {
      const date = new Date(sighting.dateTime);
      const formattedDate = date.getDay() + "." + date.getMonth() + "." + date.getFullYear() +
                            " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
      return (
        <tr>
          <td> {sighting.species} </td>
          <td> {sighting.count} </td>
          <td> {formattedDate} </td>
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
              <th className="col-md-3"> Time <span style={{textAlign:'right', float:'right'}}> &#9206; &#9207; </span> </th> 
              <th className="col-md-5"> Description </th> 
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