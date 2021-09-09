import React, {useState} from "react";

import { Trophy,Newspaper, Flask } from "phosphor-react";

export default function NewsItem(props){    

    const {obj} = props

    function icon(icon){

        const fontSize = 46;

        if(icon == 'trophy'){
            return <Trophy size={fontSize} color="#20FF93"/>
        }
        if(icon == 'flask'){
            return <Flask size={fontSize} color="#00bcd4"/>
        }
        if(icon == 'newspaper'){
            return <Newspaper size={fontSize} color="#ff36ff"/>
        }
    }

    return (
            <div className="news-item">
                <div className="content">
                    <div className="row">
                        <div className="col-3 col-md-2">
                            {icon(obj.icon)}
                        </div>
                        <div className="col-9 col-md-10">
                            <small>{obj.date}</small>
                            <p>{obj.title}</p>
                        </div>
                    </div>                   
                </div>
            </div>
        
    )
}