import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">TechMate</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in as technician, show these links */}
        {user.position === "Technician" && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/profile">
              Profile
            </Link>
          </>
        )}

        {/* If a user is logged in as dispatcher, show these links */}
        {user.position === "Dispatcher" && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/all/users">
              All Users Page
            </Link>

            <Link className="navLink" to="/profile">
              Profile
            </Link>
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>

        {/* If a user is logged in as technician, show these links */}
        {user.position === "Technician" && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}

        {/* If a user is logged in as dispatcher, show these links */}
        {user.position === "Dispatcher" && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
