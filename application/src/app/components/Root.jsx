import React from "react";

import {NavBar} from "./NavBar.jsx";

export class Root extends React.Component{
    render() {
        return (
           <div>
                <NavBar/>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}