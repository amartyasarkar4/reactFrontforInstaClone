import React,{useState,useContext} from "react";
import {Link,useHistory}from "react-router-dom";
import M from "materialize-css";
import {Usercontext}from "../../../App";
import "./signIn.css";
const SignIn=()=>{
    const {state,dispatch}=useContext(Usercontext);
    const history=useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const signInData=()=>{
        fetch("/SignIn",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#ff1744 red accent-3"})
            }else{
                M.toast({html: data.message,classes:"#76ff03 light-green accent-3"});
                console.log(data);
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("userId",data.user._id);
                dispatch({type:"USER",payload:data.user._id});
                history.push('/profile');
            }
        })
    }
    return(
        <div>
            <div className="row">
                <div className="col l12">
                    <div className="mycard">
                        <div className="card-content white-text">
                            <p className="title brand-logo">Instagram</p>
                            <div className="row">
                                <div className="type">
                                    <input type="text"name="username"placeholder="Mobile number, username ,or email"value={email}onChange={event=>setEmail(event.target.value)}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="type">
                                    <input type="password"name="password"placeholder="Password"value={password}onChange={event=>setPassword(event.target.value)}/>
                                </div>
                            </div>
                        
                        <div className="type">
                            <button className="btn waves-effect waves-light" type="submit" name="action"onClick={()=>signInData()}>Log In
                                <i className="material-icons right"/>
                            </button>
                        </div>
                        </div>
                        <div className="row separate">
                                    <span className="col 4 hr"><hr></hr></span>
                                    <span className="col 4">or</span>
                                    <span className="col 4 hr"><hr></hr></span>
                           </div>
                           <p className="desc">Log in with Facebook</p>
                           <p className="desc"><Link to="/forgotPassword">Forgot password ?</Link></p>
                    </div>
                    <div className="mycard">
                        <p className="desc">Don't have an account ? <span><Link to="/signUp"className="otherlink">Sign up</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignIn;