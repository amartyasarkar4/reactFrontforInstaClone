import React from "react";
import Backdrop from "../backdrop/backdrop";
import "./spiner.css"
const Spiner=(cops)=>{
    return(
        <div>
            <Backdrop Click={cops.Click} />
            <div className="topSpiner">
                <div class="loader">Loading...</div>
            </div>
    </div>
    )
}
export default Spiner;