import React,{useEffect,useState} from "react";
import {useHistory}from "react-router-dom";
import M from "materialize-css";
import "./editProfile.css";
const EditProfile=()=>{
    const [me,setMe]=useState([]);
    const [file,setfile]=useState("");
    const [email,setEmail]=useState("");
    const [username,setUsername]=useState("");
    const [name,setName]=useState("");
    const [website,setWebsite]=useState("");
    const [bio,setBio]=useState("");
    const [phoneNo,setPhoneNo]=useState("");
    const [gender,setgender]=useState("");

    const history=useHistory();
    const postFile=(imagefile)=>{
        console.log(imagefile);
         var data = new FormData();
         data.append("file",imagefile);
         data.append("upload_preset","instaClone");
         data.append("cloud_name","amartya4lipi");
         console.log(data);
         fetch("https://api.cloudinary.com/v1_1/amartya4lipi/image/upload",{
             method:"POST",
             body:data
         }).then(res=>res.json())
         .then(data=>{
             console.log(data);
             setfile(data.url);
         })
         .catch(err=>{
             console.log(err);
         })
     }
    useEffect(()=>{
        fetch("/profile",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result.me[0]);
            setMe(result.me[0]);
            setfile(result.me[0].photoId);
            setEmail(result.me[0].email);
            setUsername(result.me[0].username);
            setName(result.me[0].name);
            setWebsite(result.me[0].website);
            setBio(result.me[0].bio);
            setPhoneNo(result.me[0].phoneNo);
            setgender(result.me[0].gender)
        }) 
    },[]);
    const updateProfile=()=>{
        console.log(gender);
        fetch("/updateProfile",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                file,
                email,
                username,
                name,
                website,
                bio,
                phoneNo,
                gender
            })
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
             if(result.error){
                M.toast({html: result.error,classes:"#ff1744 red accent-3"});
            }else{
                history.push("/profile");
                M.toast({html:"Successfully Updated",classes:"#76ff03 light-green accent-3"})
            }
        })
    }
    return(
        <div className="row">
            <div className="col l4 m4"></div>
            <div className="col s12 m8 l8 ">
                <div className="card">
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4">{file?<img className="profilePic"src={file}/>:<img className="profilePic"src="https://instagram.frdp1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/91040108_260150431745978_8235600932541300736_n.jpg?_nc_ht=instagram.frdp1-1.fna.fbcdn.net&_nc_ohc=bFTIBThif_sAX9JoDyH&oh=6389bd103c0d04d10733f9031871bb11&oe=5F306829"/>}</div>
                        <div className="col s8 m8 l8 ">
                            <h5 className="username">{me.username}</h5>
                            <div className="file-field input-field">
                                 <span type="file"className="changePic change-title">Change Profile photo</span>
                                 <input type="file" multiple onChange={(event)=>postFile(event.target.files[0])}/>
                             </div>
                            
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"><h6>Name</h6></div>
                        <div className="col s8 m8 l8 ">
                            <input type="text"value={name?name:null}onChange={(event)=>setName(event.target.value)}/>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"></div>
                        <div className="col s8 m8 l8 ">
                            <p className="text">Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</p>
                            <p className="text2">You can only change your name twice within 14 days.</p>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"><h6>Username</h6></div>
                        <div className="col s8 m8 l8 ">
                            <input type="text"value={username?username:null}onChange={(event)=>setUsername(event.target.value)}/>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"><h6>Website</h6></div>
                        <div className="col s8 m8 l8 ">
                            <input type="text"value={website?website:null}onChange={(event)=>setWebsite(event.target.value)}/>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"><h6>Bio</h6></div>
                        <div className="col s8 m8 l8 ">
                            <input type="textarea"value={bio?bio:null}onChange={(event)=>setBio(event.target.value)}/>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"></div>
                        <div className="col s8 m8 l8 ">
                            <h6 className="text">Personal Information.</h6>
                            <p className="text2">Provide your personal information, even if the account is used for a business, a pet or something else. This won't be a part of your public profile.</p>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"><h6>Email</h6></div>
                        <div className="col s8 m8 l8 ">
                            <input type="text"value={email?email:null}onChange={(event)=>setEmail(event.target.value)}/>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"><h6>Phone Number</h6></div>
                        <div className="col s8 m8 l8 ">
                            <input type="text"value={phoneNo?phoneNo:null}onChange={(event)=>setPhoneNo(event.target.value)}/>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"><h6>Gender</h6></div>
                        <div className="col s8 m8 l8">
                        <select className="browser-default"onChange={(event)=>setgender(event.target.value)}>
                            <option value="" disabled>Choose your option</option>
                            <option value="male"onClick={(event)=>setgender(event.target.value)}>male</option>
                            <option value="female"onClick={(event)=>setgender(event.target.value)}>Female</option>
                            <option value="other"onClick={(event)=>setgender(event.target.value)}>others</option>
                        </select>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"><h6>Similar Account Suggestions</h6></div>
                        <div className="col s8 m8 l8 ">
                            <input type="text"value=""/>
                        </div>
                    </div>
                    <div className="row imageSec card-image">
                        <div className="onlyimg col l3 m4 s4"></div>
                        <div className="col s8 m8 l8 ">
                            <button className="sbmitbtn"type="submit"onClick={()=>updateProfile()}>Submit</button>
                        </div>
                    </div>
              </div>
            
        </div> 
        
    </div>
    )
}
export default EditProfile;