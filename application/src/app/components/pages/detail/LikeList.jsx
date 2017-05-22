import React from 'react';
import {Table} from "react-bootstrap";

var emailSrc = "/app/components/pages/detail/email.png";

class LikeList extends React.Component {

    render() {

        var entries = this.props.likes;
        var fullMailList ='';
        console.log("Entries");
        console.log(entries);

        var tableItems = entries.map((entry, index) => {
            fullMailList += entry.user.email + ',';
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

        console.log(fullMailList);
        if (this.props.likes.length == 0)
            return (
                <div>
                    <hr/>
                    <h2 className="center-text">Ingen har gillat produkten än!</h2>
                </div>
            );
        else
            return (
                <div className="likes-container">
                    <hr className="hr-large"/>
                    <h2 className="center-text">Produkten gillas av</h2>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Namn</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableItems}
                        </tbody>
                    </Table>
                    <a className="btn btn-default mail-all" href={'mailto:' + fullMailList}>
                        Maila alla som gillat produkten
                    </a>
                </div>
            )
    }

}

export default LikeList;