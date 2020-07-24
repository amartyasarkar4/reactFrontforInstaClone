import React from "react";
import "./modal.css";
import Backdrop from "./backdrop/backdrop";
import Deleting from "./deleting/deleting";
const Modal=(cops)=>{
    return(
        <div>
            <Backdrop Click={cops.Click}/>
            <Deleting deleteClick={cops.deleteClick}/>
        </div>
    )
}
export default Modal;