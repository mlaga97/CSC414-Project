// Library imports
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from 'react-router-bootstrap';

// Components
import Footer from './Footer';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import FinishRegistration from './FinishRegistration';

// TODO: Show a landing page for non-logged-in users
const PublicApp = () => {
  const basename = process.env.PUBLIC_URL.replace(/(^\w+:|^)\/\/.*?\//, '');

  return <BrowserRouter basename={basename}>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>BananaNet</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href='/'>Login</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href='/registerLink'>Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    <div className='page'>
      <Route exact path='/' component={LoginPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/registerLink' component={RegistrationPage} />
      <Route exact path='/register' component={FinishRegistration} />
    </div>
  </BrowserRouter>;
};

export default PublicApp;
