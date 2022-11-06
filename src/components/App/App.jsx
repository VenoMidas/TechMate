import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// socket.io 
import { io } from 'socket.io-client';
// Component Imports
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import TechnicianView from '../TechnicianView/TechnicianView';
import DispatchView from '../DispatchView/DispatchView';
import ProfileView from '../ProfileView/ProfileView';
import AllUsersView from '../AllUsersView/AllUsersView';
// Styling imports css and MUI
import './App.css';
import Container from '@mui/material/Container';

function App() {
  const dispatch = useDispatch();

  // socket.io
  const IS_PROD = process.env.NODE_ENV === "production"; // check if we are in production environment
  const URL = IS_PROD ? "https://morning-sands-43472.herokuapp.com" : "http://localhost:5000"; // if true set URL to URL, else use local host
  const socket = io(URL);

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Container >
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows technician or dispatch view, else shows LoginPage
              exact
              path="/user"
            >
              {user.position === "Technician" ?
                // if user is a technician - display technician landing page
                <TechnicianView socket={socket} />
                :
                // Otherwise, show the dispatch landing page
                <DispatchView socket={socket} />
              }
            </ProtectedRoute>

            <ProtectedRoute
              // logged in as dispatch shows AllUsersView, else shows LoginPage
              exact
              path="/all/users"
            >
              {user.position === "Dispatcher" ?
                // if user is a technician - display technician landing page
                <AllUsersView />
                :
                // Otherwise, show the dispatch landing page
                <Redirect to="/user" />
              }
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows profile page else shows LoginPage
              exact
              path="/profile"
            >
              <ProfileView />
            </ProtectedRoute>

            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LoginPage />
              }
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Container>
  );
};

export default App;