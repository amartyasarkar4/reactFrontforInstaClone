import React,{useEffect,createContext,useReducer,useContext} from 'react';
import Navbar from "./components/navigation/navigation";
import './App.css';
import {BrowserRouter,Route, Switch, useHistory}from "react-router-dom";
import Home from "./components/screens/home/home";
import Profile from "./components/screens/Profile/profile";
import SignIn from "./components/screens/signIn/signIn";
import SignUp from "./components/screens/signUp/signUp";
import NewPost from "./components/screens/newpost/newpost";
import OtherUser from "./components/otherUser/otherUser";
import EditProfile from "./components/screens/Profile/editProfile/editProfile";
import ForgotPassword from "./components/screens/signIn/forgotPassword/forgotPassword";
import ResetPassword from "./components/screens/signIn/ResetPassword/ResetPassword";
import { reducer, initialState } from './reducer/userReducer';

 export const Usercontext=createContext();

const Routing=()=>{
  const history=useHistory();
  const {state,dispatch}=useContext(Usercontext);
  useEffect(()=>{
    const userId=localStorage.getItem("userId");
    if(userId){
      dispatch({type:"USER",payload:userId})
      if(!history.location.pathname.startsWith('/setNewPassword'))
          history.push("/");
    }else{
      if(!history.location.pathname.startsWith('/setNewPassword'))
          history.push("/SignIn");
    }
  },[]);
  return(
    <Switch>
      <Route path="/"exact component={Home}/>
      <Route path="/profile"component={Profile}/>
      <Route path="/signUp"component={SignUp}/>
      <Route path="/signIn"component={SignIn}/>
      <Route path="/newPost"component={NewPost}/>
      <Route path="/user/:id"component={OtherUser}/>
      <Route path="/accouts/edit"component={EditProfile}/>
      <Route path="/forgotPassword"component={ForgotPassword}/>
      <Route path="/setNewPassword/:token"component={ResetPassword}/>
    </Switch>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <Usercontext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      <div className="">
        <Navbar/>
        <Routing/>
      </div>
      </BrowserRouter>
    </Usercontext.Provider>
  );
}

export default App;
