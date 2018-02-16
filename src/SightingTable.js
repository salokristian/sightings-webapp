import React, { Component } from 'react';
import { Table } from 'react-bootstrap';



class SightingTable extends Component {
	constructor(props) {
    super(props);
  }
  
  render() {//Change to arrows so that only the other is shown
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
          <tr>
            <td> Mallard </td>
            <td> 2 </td>
            <td> 14.12.2018 13:33</td>
            <td> A horrendeous one. </td>
          </tr>
        </tbody>
      </Table>
    </div>
    );
  }
}

export default SightingTable;