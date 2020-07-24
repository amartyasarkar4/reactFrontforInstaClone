import React,{useState,useEffect} from "react";
import {useHistory}from "react-router-dom";
import Spiner from "../../modal/spiner/spiner";
import M from "materialize-css";

import "./newpost.css";
const NewPost=()=>{
    const history=useHistory();
    const [title,setTitle]=useState("");
    const [caption,setCaption]=useState("");
    const [image,setImage]=useState("");
    const [loading,setLoading]=useState(false);

    if(image){var extension =image.substring(image.lastIndexOf('.')+1)};
    useEffect(()=>{
        console.log(extension);
    },[image])
    const postFile=(postImage)=>{
     console.log(postImage);
       setLoading(true);
        var data = new FormData();
        data.append("file",postImage);
        data.append("upload_preset","instaClone");
        data.append("cloud_name","amartya4lipi");
        console.log(data);
        if(postImage.type==="video/mp4"){
        fetch("https://api.cloudinary.com/v1_1/amartya4lipi/video/upload",{
            method:"POST",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            setImage(data.url);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })}else if(postImage.type==="image/png"||postImage.type==="image/jpeg"){
        fetch("https://api.cloudinary.com/v1_1/amartya4lipi/image/upload",{
            method:"POST",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            setImage(data.url);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })}
    }
    const CreatePost=()=>{
        setLoading(true);
        var user=localStorage.getItem("userId");
        if(image){
            fetch("/Createpost",{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    caption,
                    pic:image,
                    user:user
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error,classes:"#ff1744 red accent-3"})
                }else{
                    M.toast({html: "New File Posted Successfully",classes:"#76ff03 light-green accent-3"});
                    setLoading(false);
                    console.log(data);
                    history.push('/profile');
                }
            })
        }
    }
    return(
        <div>
            {loading?<Spiner/>:null}
              <div className="newPost row">
                    <div className="col s12 m12">
                        <div className="card">
                            <div className="card-image">
                                <h4 className="heas">Create New Post</h4>
                                <div className="col s7 m7 l9 forst">
                                    <div className="col s6 m6 l2 creator">
                                        <img className="creator"src="https://instagram.fccu13-1.fna.fbcdn.net/v/t51.2885-19/s320x320/91040108_260150431745978_8235600932541300736_n.jpg?_nc_ht=instagram.fccu13-1.fna.fbcdn.net&_nc_ohc=SgbQZ4zf4ekAX9FU2Eo&oh=3e371fc39c12a339508c941fc3ea4eba&oe=5F219CD9"/>
                                    </div>
                                    <div className="col s6 m6 l7">
                                        <input type="text"name="title"placeholder="Give a title.."value={title}onChange={event=>setTitle(event.target.value)}/>
                                    </div>
                                </div>
                                <div className="col s5 m5 l3">
                                        
                                        {extension && extension==="mp4"?<div className="video-container"><iframe width="253" height="230" src={image} frameborder="0" allowfullscreen></iframe></div>:<h1>Heloo this is not video</h1>||extension &&(extension==="jpg"||extension==="png")?<img className="File"src={image?image:"https://instagram.fccu13-1.fna.fbcdn.net/v/t51.2885-19/s320x320/91040108_260150431745978_8235600932541300736_n.jpg?_nc_ht=instagram.fccu13-1.fna.fbcdn.net&_nc_ohc=SgbQZ4zf4ekAX9FU2Eo&oh=3e371fc39c12a339508c941fc3ea4eba&oe=5F219CD9"}/>:null}
                                        <div className="file-field input-field">
                                            {image?<span type="file"className="changePic change-title">Change this photo</span>:<span type="file"className="changePic change-title">Add a photo to post</span>}
                                            <input type="file" multiple onChange={(event)=>postFile(event.target.files[0])}/>
                                        </div>
                                </div>
                                <div className="row">
                                    <div className="col s10 m10 l10 caption">
                                        <input type="text"name="cation"placeholder="Write a caption ....."value={caption}onChange={event=>setCaption(event.target.value)}/>
                                    </div>
                                  
                                </div>
                            </div>
                            <div className="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div className="row">
                                <div className="col s9 m6 l4 card-action">
                                    <button className="btn waves-effect waves-light" type="submit" name="action"onClick={()=>CreatePost()}>Submit
                                        <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default NewPost;