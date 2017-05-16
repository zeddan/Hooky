import React from 'react';
import {Table} from "react-bootstrap";

var emailSrc = "/app/components/pages/detail/email-alt.png";

class LikeList extends React.Component {

    render() {

        var entries = this.props.likes;
        console.log("Entries");
        console.log(entries);

        var tableItems = entries.map((entry, index) => {
            return (
                <tr className="like-table-row" key={index + 1}>
                    <td >
                        <p>{entry.user.name}</p>
                    </td>
                    <td>
                        <p>{entry.user.email}</p>
                    </td>
                    <td>
                        <a href={'mailto:' + entry.user.email}>
                            <img className="small-email-btn" alt="Email" src={emailSrc}/>
                        </a>
                    </td>
                </tr>
            );
        });

        if (this.props.likes.length == 0)
            return (
                <div>
                    <hr/>
                    <h2 className="center-text">No Likes Yet, Be the first!</h2>
                </div>
            );
        else
            return (
                <div>
                    <hr/>
                    <h2 className="center-text">Likes</h2>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableItems}
                        </tbody>
                    </Table>
                </div>
            )
    }

}

export default LikeList;