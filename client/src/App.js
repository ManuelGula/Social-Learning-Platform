//references
//https://www.youtube.com/watch?v=56E8b9prPTs
//https://github.com/iamfaiz/react-auth-ui
//https://scotch.io/tutorials/build-a-blog-using-expressjs-and-react-in-30-minutes
//https://serverless-stack.com/chapters/create-a-login-page.html

import React from "react";
import { HashRouter as Router, BrowserRouter, Route, Redirect,  NavLink, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./pages/Navbar";
import SignUpForm from "./pages/signUp/SignUpForm";
import SignInForm from "./pages/SignInForm";
import Profile from "./pages/profilePage/Profile";
import Newsfeed from "./pages/newsFeed/newsFeed"
import SearchUsers from "./pages/SearchUsers";
import MentorCreationPage from "./pages/mentorCreation/mentorCreationPage";
import EditProfileForm from "./pages/profilePage/EditProfileForm";
import { makeStyles } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/contactPage/Contact";
import Landing from "./pages/Landing";




const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));


export default function App() {
  return(
    <BrowserRouter>
      <Navbar />
      {/*<Route path='/'> <Landing/></Route>*/}
      <PrivateRouteLogIn path= "/sign-in"> <SignInForm/> </PrivateRouteLogIn>
      <PrivateRouteRegister path="/register"> <SignUpForm/> </PrivateRouteRegister>
      <PrivateRouteMentorContent path="/post"> <MentorCreationPage /></PrivateRouteMentorContent>
      <PrivateRoute path="/profile-page"> <Profile /> </PrivateRoute>
      <PrivateRoute path="/newsfeed"> < Newsfeed/> </PrivateRoute>
      <PrivateRoute path="/editprofile"> <EditProfileForm/></PrivateRoute>
      <Redirect exact from="/" to="/landing" />
      <Route 
            path = "/ForgotPassword">
            <ForgotPassword />
           </Route>
           <Route 
            path = "/contact">
            <Contact />
           </Route>
           <Route 
            path = "/landing">
            <Landing />
           </Route>
           <Route 
            path = "/ResetPassword/:token">
            <ResetPassword />
           </Route>

      <PrivateRoute path="/search-users"> <SearchUsers/>> </PrivateRoute>
    </BrowserRouter>
  );

  function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('usertoken') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  function PrivateRouteLogIn({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('usertoken') ? (
            <Redirect
              to={{
                pathname: "/profile-page",
                state: { from: location }
              }}
            />
          ) : (
            children
          )
        }
      />    
    );
  }
  function PrivateRouteRegister({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('usertoken') ? (
            <Redirect
              to={{
                pathname: "/profile-page",
                state: { from: location }
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }
  function PrivateRouteMentorContent({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        localStorage.getItem('isMentor') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/profile-page",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  
}
