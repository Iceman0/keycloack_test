import React, { Component } from 'react';
import Timer from "./timer";

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            id: ""
        };
        this.color = (this.props.keycloak.tokenParsed.scope)
            ? (this.props.keycloak.tokenParsed.scope.includes('SCOPE_write'))
                ? 'green'
                : 'red'
            : 'black';
        this.seconds = (this.props.keycloak.tokenParsed.exp)
            ? new Date(this.props.keycloak.tokenParsed.exp * 1000) - new Date()
            : 0;

        this.props.keycloak.loadUserInfo().then(userInfo => {
            this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub})
        });
    }

    render() {
        return (
            <div className="UserInfo">
                <div style={{display: 'flex'}}>Time to token death: {<Timer color={this.color} seconds={this.seconds}/>}</div>
                <p>ID: {this.state.id}</p>
            </div>
        );
    }
}
export default UserInfo;

// <Timer colorthis.props.keycloak/>