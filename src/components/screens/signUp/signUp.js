import React,{useState} from "react";
import {Link,useHistory}from "react-router-dom";
import M from "materialize-css";
import "./signUp.css"
const SignUp=()=>{
    const history=useHistory();
    const [email,setEmail]=useState("");
    const [fullName,setFullName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [texttype,settype]=useState(false);
    var textType="password";
    if(texttype){
        textType="text"
    }
    const signUpData=()=>{
        fetch("/signUp",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                email,
                name:fullName,
                username,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#ff1744 red accent-3"})
            }else{
                M.toast({html: data.message,classes:"#76ff03 light-green accent-3"});
                history.push('/signIn');
            }
        })
    }
    const hello=()=>{
        console.log("heloooooooooooooooooooo")
    }
    return(
        <div className=""onClick={()=>hello()}>
            <div className="row">
                <div className="col l12">
                    <div className="mycard">
                        <div className="card-content white-text">
                            <p className="title brand-logo">Instagram</p>
                            <div> <p className="desc">Sign up to see photos and videos from your friends.</p></div>
                           <div className="row separate">
                                    <span className="col 4 hr"><hr></hr></span>
                                    <span className="col 4">or</span>
                                    <span className="col 4 hr"><hr></hr></span>
                           </div>
                            <div className="row">
                                <div className="type">
                                    <input 
                                        type="text"
                                        name="email"
                                        placeholder="Mobile Number or Email"
                                        value={email}
                                        onChange={(event)=>setEmail(event.target.value)}
                                     />
                                </div>
                            </div>
                            <div className="row">
                                <div className="type">
                                    <input 
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={(event)=>setFullName(event.target.value)}
                                     />
                                </div>
                             </div>
                            <div className="row">
                                <div className="type">
                                    <input 
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(event)=>setUsername(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="type">
                                    <input 
                                        type={textType}
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event)=>setPassword(event.target.value)}
                                    />
                                    <p onClick={()=>settype(!texttype)}>SEE PASSWORD</p>
                                </div>
                            </div>
                        
                        <div className="type">
                            <button 
                                className="signUpBtn btn waves-effect waves-light" 
                                type="submit" 
                                name="action"
                                onClick={()=>signUpData()}
                            >Sign up
                                <i className="material-icons right"/>
                            </button>
                        </div>
                        <div><p className="desc">By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p></div>
                         
                     </div>
                        
                    </div>
                    <div className="mycard">
                        <p className="desc">Have an account ? <span><Link to="/signIn"className="otherlink">Log in</Link></span></p>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}
export default SignUp;