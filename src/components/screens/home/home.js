import React,{useState, useEffect,useContext} from "react";
import {Link} from "react-router-dom";
import "./home.css";
import {Usercontext}from "../../../App";
import Modal from "../../modal/modal";

const Home=()=>{
    const {state,dispatch}=useContext(Usercontext);
    const [data,setData]=useState([]);
    const [opinion,setOpinion]=useState("");
    const [showModal,setShowModal]=useState("");
    useEffect(()=>{
        fetch("/allposts",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            setData(result.posts);
            
        })
    },[]);
    const likePost=(id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            const newData=data.map(items=>{
                if(items._id===result._id){
                    return(result);
                }else{
                    return items;
                }
            })
            setData(newData);
        }).catch(err=>{
            console.log(err);
        })
    };
    const unlikePost=(id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            const newData=data.map(items=>{
                if(items._id===result._id){
                    return(result);
                }else{
                    return items;
                }
            })
            setData(newData);
        }).catch(err=>{
            console.log(err);
        })
    };
    const commentPost=(id)=>{
        const user=localStorage.getItem("userId");
        fetch("/comment",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id,
                commentator:user,
                opinion:opinion
            })
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            const newData=data.map(items=>{
                if(items._id===result._id){
                    return(result);
                }else{
                    return items;
                }
            })
            setData(newData);
        }).catch(err=>{
            console.log(err);
        })
    };
    const deletePost=(postId)=>{
        fetch(`/deletePost/${postId}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            const newData=data.filter(items=>{
                return items._id!==result._id
            })
            setData(newData);
            console.log(newData);
            setShowModal("");
        }).catch(err=>{
            console.log(err);
        })
    }
    const userId=(localStorage.getItem("userId"));
    var icon="favorite_border";
    var likeIcon="favorite";
   /* if(like){
        icon="favorite"
    }*/
   //console.log(userId);
  /* const seeUser=(id)=>{
      console.log("hello");
    return  (<Link to="/user"/>)
   }*/
    return(
           
             <div>
           {data.map(item=>{
              var extension =item.image.substring(item.image.lastIndexOf('.')+1);
               return(
                     <div className="hmcard"key={item._id}>
                {(showModal!=="")?<Modal Click={()=>setShowModal("")}deleteClick={()=>deletePost(showModal)}/>:null}
               
                    <div className="row">
                        <div className="col s1 m1 l1"><Link to={(state!==item.author._id)?"/user/"+item.author._id:"/profile"}><img className="photoId"src={item.author.photoId}/></Link></div>
                        <h6 className="col s10 m10 l10"><Link to={(state!==item.author._id)?"/user/"+item.author._id:"/profile"}>{item.author.name}</Link></h6>
                        <i className="col s1 m1 l1 material-icons right"onClick={()=>setShowModal(item._id)}>more_vert</i>
                    </div>
                    <div className="card-content">
                        <div onDoubleClick={(item.likes.includes(userId))?null:()=>likePost(item._id)}className="card-image waves-effect waves-block waves-light">
                            
                            {extension && extension==="mp4"?
                            <div class="video-container">
                            <iframe width="853" height="480" src={item.image} frameborder="0" allowfullscreen></iframe>
                          </div>:<h1>Heloo this is not video</h1>||(extension==="jpg"||extension==="png")?<img className="activator" src={item.image?item.image:"https://instagram.fccu13-1.fna.fbcdn.net/v/t51.2885-19/s320x320/91040108_260150431745978_8235600932541300736_n.jpg?_nc_ht=instagram.fccu13-1.fna.fbcdn.net&_nc_ohc=SgbQZ4zf4ekAX9FU2Eo&oh=3e371fc39c12a339508c941fc3ea4eba&oe=5F219CD9"}/>:null}
                        </div>
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">
                                {(item.likes.includes(userId))?
                                 <i className="myicons medium material-icons"onClick={()=>unlikePost(item._id)}>{likeIcon}</i>:
                                 <i className="myicons medium material-icons"onClick={()=>likePost(item._id)}>{icon}</i>
                                }
                               
                                <i className="cmnt material-icons">comment</i>
                                <i className="sendbtn medium material-icons">send</i>
                                
                            </span>
                            <p><a href="#">{item.likes.length} likes</a></p>
                            <p><a href="#">{item.title}</a></p>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{item.caption}<i className="material-icons right">close</i></span>
                            
                        </div>
                        <div className="commentSec row">
                            <input type="text"className="inputCmnt col s8 m8 l8"name="commentCreate"onChange={(event)=>setOpinion(event.target.value)}/>
                            <button type="submit"className="commentbtn col s2 m2 l2"onClick={()=>commentPost(item._id)}><i className="submitCmnt tiny material-icons">send</i></button>
                        </div>
                        {item.comments.map((snglCmnt)=>{
                             return(<div className="commentSec row"key={snglCmnt._id}>
                                <div className="col ">{snglCmnt.commentator.name}</div>
                        <div className="col ">{snglCmnt.opinion}</div>
                            </div>)
                        })}
                       
                    </div>
                </div>
               )
           })}
        </div>

    )
}
export default Home;