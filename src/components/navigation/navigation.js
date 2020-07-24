import React,{useContext} from "react";
import {Link,useHistory}from "react-router-dom";
import { Usercontext } from "../../App";

const Navbar=()=>{
  const {state,dispatch}=useContext(Usercontext);
  const history=useHistory();
  const RenderList=()=>{
    if(state){
      return[
            <li key="1"><Link to="/newPost">New Post</Link></li>,
            <li key="2"><Link to="/profile">Profile</Link></li>,
            <li key="3"><button  className="logout-btn"onClick={()=>Logout()}>log out</button></li>
      ]
    }else{
      return[
        <li key="4"><Link to="/signIn">Log In</Link></li>,
        <li key="5"><Link to="/signUp">Sign Up</Link></li>
      ]
    }
  }
  const Logout=()=>{
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    dispatch({type:""});
    history.push("/signIn");
  }
    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signIn"}className="left brand-logo">Instagram</Link>
          <ul id="nav-mobile" className="right">
           {RenderList()}
            
           
          </ul>
        </div>
      </nav>
    )
}
export default Navbar;