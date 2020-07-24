import React from "react";
import "./deleting.css";
const Deleting=(cops)=>{
    const sole=()=>{
        console.log("heloo")
    }
    return(
        <div className="division"onClick={cops.deleteClick}>
            <div className="">
            <p className="chingari">Delete</p>
            </div>
        </div>
    )
}
export default Deleting;