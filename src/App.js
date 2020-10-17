import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Welcome from './Welcome';
import Secured from './Secured';
import './App.css';
import Button from '@material-ui/core/Button';
import Logout from "./Logout";
import UserInfo from "./UserInfo";

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            keycloak: null,
            authenticated: false
        };
    }

    changeAuthData = (data) => {
        this.setState({ keycloak: data.keycloak, authenticated: data.authenticated })
    };

    render() {
        return (
            <BrowserRouter>
                <div className="container">

                    <ul><li>{!this.state.keycloak ?
                        <Link to="/">Приветствие</Link> :

                        (this.state.authenticated) ?
                            <div>
                            <p>This is a Keycloak-secured component of your application. You shouldn't be able
                            to see this unless you've authenticated with Keycloak.</p>
                            <UserInfo keycloak={this.state.keycloak} />
                            </div>
                        : <div>Unable to authenticate!</div>

                }</li>
                    <li>{!this.state.keycloak ? <Button component={Link} color="primary"  variant="outlined" to="/secured">
                        Login
                    </Button> : <Logout keycloak={this.state.keycloak} />}</li>
                    </ul>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/secured" component={() => <Secured changeAuthData={this.changeAuthData}
                                                                     keycloak={this.state.keycloak}
                                                                     auth={this.state.auth}
                                                                     authenticated={this.state.authenticated}/>} />
                </div>
            </BrowserRouter>
        );
    }
}
export default App;
