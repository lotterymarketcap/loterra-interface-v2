import React from "react";
import Jackpot from "../components/Jackpot";

const HomeCard={
    marginTop: '50px',
    width: '100px',
    padding: '30px',
}
export default function Index () {
     return (
         <div className="container">
             <Jackpot/>
             <div className="card-glass" style={HomeCard}>
                 <span>Proposal</span>
                 <div className="card-glass" style={{width:"30px", height:"30px" }}>no</div>
             </div>
         </div>

     );
}
