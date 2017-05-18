import React from 'react';

import {Table} from 'react-bootstrap';

class TableItems extends React.Component {
  render() {
    var entries = this.props.entries;

    var tableItems = entries.map((entry, index) => {
      return (
        <tr key={index + 1} onClick={() => this.props.handleClick(entry.id)}>
          <td>
            <div className="suggestion-listitem">
              <p id="title"><strong>{entry.name}</strong>, {entry.supplier}</p>
              <p id="user">{entry.added_by.name}</p>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table hover>
        <tbody>
          {tableItems}
        </tbody>
      </Table>
    );
  }
}

export default TableItems;
