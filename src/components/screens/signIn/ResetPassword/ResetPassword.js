import React,{useState,useEffect} from "react";
import {Link,useHistory,useParams}from "react-router-dom";
import M from "materialize-css";
//import {Usercontext}from "../../../App";
const ResetPassword=()=>{
    const {token}=useParams();
    //const {state,dispatch}=useContext(Usercontext);
    const history=useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    useEffect(()=>{
        console.log(token);
        fetch(`/identify/${token}`,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            console.log(Date.now());
            (result.email)?setEmail(result.email):setEmail(result.error);
        })
        .catch(err=>{
            console.log("Session Expired");
        })
    },[]);
    const reset=()=>{
        fetch(`/setNewPassword/${token}`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                newPassword:password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#ff1744 red accent-3"})
            }else{
                M.toast({html: data.message,classes:"#76ff03 light-green accent-3"});
                console.log(data);
                //localStorage.setItem("jwt",data.token);
                //localStorage.setItem("userId",data.user._id);
                //dispatch({type:"USER",payload:data.user._id});
                history.push('/signIn');
            }
        })
    }
    return(
        <div>
            <div className="row">
                <div className="col l12">
                    <div className="mycard">
                        <div className="card-content white-text">
                            <p className="title brand-logo">Reset Password</p>
                            <div className="row">
                                <div className="type">
                                    <h6 style={{color:"purple"}}>{email?email:"No email,try again"}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="type">
                                    <input type="password"name="password"placeholder="Password"value={password}onChange={event=>setPassword(event.target.value)}/>
                                </div>
                            </div>
                        
                        <div className="type">
                            <button className="btn waves-effect waves-light" type="submit" name="action"onClick={()=>reset()}>Reset Password
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
                           <p className="desc">Forgot password ?</p>
                    </div>
                    <div className="mycard">
                        <p className="desc">Don't have an account ? <span><Link to="/signUp"className="otherlink">Sign up</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword;