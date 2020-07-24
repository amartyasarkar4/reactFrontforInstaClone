import React,{useState,useEffect} from "react";
import {Link }from "react-router-dom";
import "./profile.css"
const Profile=()=>{
    const [myData,setMyData]=useState([]);
    const [me,setMe]=useState([]);
    useEffect(()=>{
        fetch("/myposts",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            setMyData(result.myposts);
        })
    },[]);
    useEffect(()=>{
        fetch("/profile",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result.me[0]);
            setMe(result.me[0]);
        })
    },[]);
   
    return(
        <div>
            <div>
            <div className="top">
                <div className="row">
                    <div className="col l4 m4 s4">
                        <img className="prfPic"src={me.photoId?me.photoId:"https://instagram.fccu13-1.fna.fbcdn.net/v/t51.2885-19/s320x320/91040108_260150431745978_8235600932541300736_n.jpg?_nc_ht=instagram.fccu13-1.fna.fbcdn.net&_nc_ohc=P8YY4XPchOEAX-Iyb4z&oh=32d17ba60870c96232a53bdb257fbac6&oe=5F219CD9"}/>
                    </div>
                    <div className="col l8 s4">
                        <div className="row userName">
                            <div className="col s4">
                                 <h4 className="">{me.username}</h4>
                            </div>
                            <div className="col s8">
                                <button className="editButton"><Link to="/accouts/edit">Edit Profile</Link></button>
                                <i className=" material-icons">settings</i>
                            </div>
                        </div>
                        <div className="row insocial">
                            <div className="col s2 m3">
                                 <h6 className="">{myData.length} posts</h6>
                            </div>
                            <div className="col s3 m4">
                                <h6 className="">{me.length!==0?me.followers.length:null} followers</h6>
                            </div>
                            <div className="col s3 m4">
                                <h6 className="">{me.length!==0?me.following.length:null} following</h6>
                            </div>
                        </div>
                        <div className="row name">
                            <div className="col s12">
                                 <h5 className="">{me.name}</h5>
                            </div>
                        </div>
                        <div className="row bio">
                            <div className="col s12 m12 l12">
                                 <p className="">{me.bio}
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <hr>
            </hr>
           
            <nav className="">
                <div className="">
                    <div className="row tabs">
                        <div className="offset s1 m1 l1 col s1 m2 l2">
                            <div className="col s3 m3 l3"><a className="active" href="#test2"><i className="material-icons">publish</i></a></div>
                            <div className="col s6 l6"><a className="active" href="#test2">POSTS</a></div>
                        </div>
                        <div className="col s1 m2 l2">
                            <div className="col s3 l3"><a className="active" href="#test2"><i className="material-icons">tv</i></a></div>
                            <div className="col s6 l6"><a className="active" href="#test2"> IGTV</a></div>
                        </div>
                        <div className="col s1 m2 l2">
                            <div className="col s3 m3 l4"><a className="active" href="#test2"><i className="material-icons">saved</i></a></div>
                            <div className="col s6 l6"><a className="active" href="#test2"> SAVED</a></div>
                        </div>
                        <div className=" col s1 m2 l2">
                            <div className="col s3 m3 l4"><a className="active" href="#test2"><i className="material-icons">tag_faces</i></a></div>
                            <div className="col s6 l6"><a className="active" href="#test2">TAGGED</a></div>
                        </div>
                    </div>
                </div>
             </nav>
           
            <div className="gallery">
                <div className="row Images">
                {myData.map(item=>{
                return(
                    <div className="col s4 m4 l4" key={item._id}>
                        <img className="itemImg"src={item.image}/>
                    </div>
                      )
                    })}
            </div>
            
            </div>
          
        </div>
        </div>
    )
}
export default Profile;