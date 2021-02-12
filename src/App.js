import './App.css';

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./components/firebase"
import { SignIn } from "./components/SignIn"
import Home from "./components/Home"
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() { 

  const [user] = useAuthState(auth);
  // console.log(auth)

  return (
    <div className="App">
      {user ? <Home /> : <SignIn />}
    </div>
  );
}

export default App;
