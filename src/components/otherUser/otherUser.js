import React,{useState,useEffect} from "react";
import {useParams}from "react-router-dom";
import M from "materialize-css";
import "./otherUser.css";
const User=(props)=>{
    const {id}=useParams();
    const [userData,setUserData]=useState(null);
    const [loading,setLoading]=useState(true);
    const userId=(localStorage.getItem("userId"));
    useEffect(()=>{
        console.log(id);
        fetch(`/otherUsers/${id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            setUserData(result);
            setLoading(false);
        })
    },[id]);
    const followUser=(id)=>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                userId:id
            })
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            setUserData(result);
            M.toast({html:result.message,classes:"#76ff03 light-green accent-3"});
        }).catch(err=>{
            console.log(err);
        })
    };
    const unfollowUser=(id)=>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                userId:id
            })
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            setUserData(result);
            M.toast({html:result.message,classes:"#ff1744 red accent-3"});
        }).catch(err=>{
            console.log(err);
        })
    };
   var followerArr=[];
   if(userData){
       followerArr=[userData.user.followers.map(snglFollower=>{return snglFollower._id})];
   }
   if(followerArr.length!==0){
        console.log(followerArr[0]);
    }
    return(
        <div>
        <div>
        <div className="top">
            <div className="row">
                <div className="col l4 m4 s4">
                    <img className="prfPic"src={userData && userData.user.photoId?userData.user.photoId:"https://instagram.fccu13-1.fna.fbcdn.net/v/t51.2885-19/s320x320/91040108_260150431745978_8235600932541300736_n.jpg?_nc_ht=instagram.fccu13-1.fna.fbcdn.net&_nc_ohc=P8YY4XPchOEAX-Iyb4z&oh=32d17ba60870c96232a53bdb257fbac6&oe=5F219CD9"}/>
                </div>
                <div className="col l8 m8 s8">
                    <div className="row userProfileName">
                        <div className="col s4">
                             <h4 className="">{userData?userData.user.username:<p>Loading !..</p>}</h4>
                        </div>
                        <div className="col s8 m8 l8">
                            {(followerArr.length!==0?(followerArr[0].length!==0?(followerArr[0].includes(userId)?<button className="col s4 m4 l4 offset s1 m1 l1 followButton"onClick={()=>unfollowUser(userData.user._id)}>Unfollow</button>:<button className="col s4 m4 l4 offset s1 m1 l1 followButton"onClick={()=>followUser(userData.user._id)}>Follow</button>):<button className="col s4 m4 l4 offset s1 m1 l1 followButton"onClick={()=>followUser(userData.user._id)}>Follow</button>):null)}
                            <button className="col s2 m2 l2 offset s1 m1 l1 arrowBut"><i className="downarw material-icons">arrow_drop_down</i></button>
                        </div>
                    </div>
                    <div className="row insocial">
                        <div className="col s2 m3">
                            <h6 className="">{userData?userData.post.length:108} posts</h6>
                        </div>
                        <div className="col s3 m4">
                            <h6 className="">{userData?userData.user.followers.length:108}  followers</h6>
                        </div>
                        <div className="col s3 m4">
                            <h6 className="">{userData?userData.user.following.length:108}  following</h6>
                        </div>
                    </div>
                    <div className="row name">
                        <div className="col s12">
                             <h5 className="">{userData?userData.user.name:<p>Loading !..</p>}</h5>
                        </div>
                    </div>
                    <div className="row bio">
                        <div className="col s12 m12 l12">
                             <p className="">{userData?userData.user.bio:<p>Loading !..</p>}
                            </p>
                        </div>
                    </div>
                    <div className="row bio">
                        <div className="col s12 m12 l12">
                             <p className="">{userData && userData.user.followers.length!==0?"Follwed by "+userData.user.followers.map(snglfollower=>{return(snglfollower.name)}):null }
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
            {userData?userData.post.map(item=>{
            return(
                <div className="col s4 m4 l4" key={item._id}>
                    <img className="itemImg"src={item.image}/>
                </div>
                  )
                }):<h2>Loading.......</h2>}
        </div>
        
        </div>
      
    </div>
    </div>
    )
}
export default User;