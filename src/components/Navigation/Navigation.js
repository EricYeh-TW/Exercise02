import React from "react";

const Navigation = ({onRouteChange, isSignIn}) => {
  if (isSignIn) {
    return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p className="f3 link black pa3 pointer" onClick={() => onRouteChange('signOut')} >Sign Out</p>
        </div>
      )
  } else {
     return (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p className="f3 link black pa3 pointer" onClick={() => onRouteChange('signIn')} >Sign In</p>
          <p className="f3 link black pa3 pointer" onClick={() => onRouteChange('register')} >Register</p>
        </div>
      )
  }
};

export default Navigation;
