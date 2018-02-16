import React, { Component } from 'react';
import { Table } from 'react-bootstrap';



class SightingTable extends Component {
	constructor(props) {
    super(props);
  }
  
  render() {
    return(
    <div>
      <Table striped bordered condensed hover>
        <thead> 
          <tr>
            <th> Species </th> 
            <th> Count </th> 
            <th> Time </th> 
            <th> Description </th> 
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