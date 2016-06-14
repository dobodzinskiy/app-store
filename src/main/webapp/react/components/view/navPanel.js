import React from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem, Modal, Button } from 'react-bootstrap';

class NavPanel extends React.Component {
    render() {
        return (
            <div>
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
                                        this.props.profileActions.showSignUp();
                                     }}>
                                <span class="glyphicon glyphicon-user"></span> Sign up
                            </NavItem>
                            <NavItem href="#"
                                     onClick={(e) => {
                                        e.preventDefault();
                                        this.props.profileActions.showLogin();
                                     }}>
                                <span class="glyphicon glyphicon-log-in"></span> Login
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Modal show={this.props.profileState.isLoginOpen} onHide={this.props.showLoginModal} bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title> <span className="glyphicon glyphicon-log-in"></span> Login </Modal.Title>
                    </Modal.Header>

                </Modal>

                <Modal show={this.props.profileState.isSignUpOpen} onHide={this.props.showSignUpModal} bsSize="lg">
                    <Modal.Header closeButton>
                        <Modal.Title> <span className="glyphicon glyphicon-log-in"></span> Sign up </Modal.Title>
                    </Modal.Header>

                </Modal>

            </div>
        )
    }
}
export default NavPanel;