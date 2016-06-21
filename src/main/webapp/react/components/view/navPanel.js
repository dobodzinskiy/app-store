import React from 'react';
import $ from 'jquery';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem, Modal, Button } from 'react-bootstrap';


class GuestPanel extends React.Component {
    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/">App store</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                        practice: Obodzinskiy D.
                    </Navbar.Text>
                    <Nav pullRight>
                        <NavItem href="#"
                                 onClick={(e) => {
                                        e.preventDefault();
                                        this.props.showSignUp();
                                     }}>
                            <span class="glyphicon glyphicon-user"></span> Sign up
                        </NavItem>
                        <NavItem href="#"
                                 onClick={(e) => {
                                        e.preventDefault();
                                        this.props.showLogin();
                                     }}>
                            <span class="glyphicon glyphicon-log-in"></span> Login
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
class UserPanel extends React.Component {
    render() {
        var applications = this.props.profile.currentUserApps.length;
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/">App store</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                        practice: Obodzinskiy D.
                    </Navbar.Text>
                    <Nav pullRight>
                        <NavDropdown title={this.props.profile.currentUser.login} id="basic-nav-dropdown">
                            <MenuItem href="#/profile">
                                Profile
                                <span class="glyphicon glyphicon-user pull-right"></span>
                            </MenuItem>
                            <MenuItem href="#/profile/applications">
                                downloaded
                                <span class="badge pull-right"> {applications}</span>
                            </MenuItem>
                            <MenuItem divider/>
                            <MenuItem onClick={this.props.logout}>
                                Logout <span class="glyphicon glyphicon-log-out pull-right"></span>
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
class DevPanel extends React.Component {
    render() {
        var applications = this.props.profile.currentUserApps.length;
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/">App store</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                        practice: Obodzinskiy D.
                    </Navbar.Text>
                    <Nav pullRight>
                        <MenuItem href="#/upload">
                            Upload new app
                        </MenuItem>
                        <NavDropdown title={this.props.profile.currentUser.login} id="basic-nav-dropdown">
                            <MenuItem href="#/profile">
                                Profile
                                <span class="glyphicon glyphicon-user pull-right"></span>
                            </MenuItem>
                            <MenuItem href="#/profile/applications">
                                Downloaded
                                <span class="badge pull-right"> {applications}</span>
                            </MenuItem>
                            <MenuItem divider/>
                            <MenuItem onClick={this.props.logout}>
                                Logout <span class="glyphicon glyphicon-log-out pull-right"></span>
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
class LoginForm extends React.Component {
    handleLogin() {
        this.props.login($("#loginForm").serialize());
    }

    render() {
        return (
            <form role="form" action="/j_spring_security_check" method="post" id="loginForm"
                  onSubmit={(e) => {e.preventDefault(); this.handleLogin();}}>
                <Modal.Body>
                    <div class="form-group">
                        <label for="login">Login:</label>
                        <input class="form-control" id="login" placeholder="Enter login" name="j_username"/>
                    </div>
                    <div class="form-group">
                        <label for="pwd"> Password:</label>
                        <input type="password" class="form-control" id="pwd" placeholder="Enter password"
                               name="j_password"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" class="btn btn-primary"> Submit</button>
                </Modal.Footer>
            </form>
        )
    }
}
class SignUpForm extends React.Component {
    handleSignUp() {
        var form = {
            login: $("#login").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            developer: $("#isDev").prop('checked')
        };
        this.props.signUp(form);
    }

    render() {
        return (
            <form id="sign-form" role="form" onSubmit={(e) => {e.preventDefault(); this.handleSignUp();}}>
                <Modal.Body>
                    <div class="form-group">
                        <label for="login">Login:</label>
                        <input class="form-control" id="login" placeholder="Enter login"/>
                        <div id="login-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input class="form-control" id="email" placeholder="Enter email"/>
                        <div id="email-error"></div>
                    </div>

                    <div class="form-group">
                        <label for="password"> Password:</label>
                        <input type="password" class="form-control" id="password" placeholder="Enter password"/>
                        <div id="password-error"></div>
                    </div>
                    <div class="checkbox">
                        <label><input id="isDev" type="checkbox"/> I'm developer</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" class="btn btn-primary"> Sign up</button>
                </Modal.Footer>
            </form>
        )
    }
}
class NavPanel extends React.Component {
    render() {
        var NavBar = <GuestPanel showLogin={this.props.showLogin}
                                 showSignUp={this.props.showSignUp}/>;
        switch (this.props.profileState.currentUserRole) {
            case 'ROLE_USER' :
                NavBar =
                    <UserPanel profile={this.props.profileState} logout={this.props.logout}/>;
                break;
            case 'ROLE_DEVELOPER' :
                NavBar =
                    <DevPanel profile={this.props.profileState} logout={this.props.logout}/>;
                break;
            default :
                break;
        }
        return (
            <div>
                {NavBar}
                <Modal show={this.props.profileState.isLoginOpen} onHide={this.props.showLogin} bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title> <span class="glyphicon glyphicon-log-in"></span> Login </Modal.Title>
                        <LoginForm login={this.props.login}/>
                    </Modal.Header>

                </Modal>

                <Modal show={this.props.profileState.isSignUpOpen} onHide={this.props.showSignUp} bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title> <span class="glyphicon glyphicon-log-in"></span> Sign up </Modal.Title>
                        <SignUpForm signUp={this.props.signUp}/>
                    </Modal.Header>

                </Modal>

            </div>
        )
    }
}
export default NavPanel;