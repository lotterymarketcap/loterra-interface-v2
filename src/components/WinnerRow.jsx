import React, {useState} from "react";

import { UserCircle } from "phosphor-react";

export default function WinnerRow(props){    

    const {key, obj} = props;

    function getRanks(ranks) {
        const rank1 = [];
        const rank2 = [];
        const rank3 = [];
        const rank4 = [];
        ranks.map((obj,i)=> {
            if(obj == 4){
              rank4.push(obj)
            }
            if(obj == 3){
              rank3.push(obj)
            }
            if(obj == 2){
              rank2.push(obj)
            }
            if(obj == 1){
              rank1.push(obj)
            }
        })
        const ranksArray = [rank4,rank3,rank2,rank1]
        const comboTexts = [
          {rank: 1, text:'Perfect!', amount: 1 ,class:'super-special-text'},
          {rank: 1, text:'Perfect!', amount: 2 ,class:'super-special-text'},
          {rank: 1, text:'Perfect!', amount: 3 ,class:'super-special-text'},
          {rank: 1, text:'Perfect!', amount: 4 ,class:'super-special-text'},
          {rank: 1, text:'Perfect!', amount: 5 ,class:'super-special-text'},
          {rank: 1, text:'Perfect!', amount: 6 ,class:'super-special-text'},
  
  
          {rank: 2, text:'Galactic!', amount: 1,class:'super-special-text'},
          {rank: 2, text:'Galactic!', amount: 2,class:'super-special-text'},
          {rank: 2, text:'Galactic!', amount: 3,class:'super-special-text'},
          {rank: 2, text:'Galactic!', amount: 4,class:'super-special-text'},
          {rank: 2, text:'Galactic!', amount: 5,class:'super-special-text'},
          {rank: 2, text:'Galactic!', amount: 6,class:'super-special-text'},
          
          {rank: 3, text:'Boom!', amount: 1,class:'special-text'},
          {rank: 3, text:'Boom!', amount: 2,class:'special-text'},
          {rank: 3, text:'Boom!', amount: 3,class:'special-text'},
          {rank: 3, text:'Boom!', amount: 4,class:'special-text'},
          {rank: 3, text:'Boom!', amount: 5,class:'special-text'},
          {rank: 3, text:'Boom!', amount: 6,class:'special-text'},
  
  
          {rank: 4, text:'Good work!', amount: 1,class:''},
          {rank: 4, text:'Smashed!', amount: 2,class:'medium-text'},
          {rank: 4, text:'Wipeout!', amount: 3,class:'special-text'},
          {rank: 4, text:'Boom!', amount: 4,class:'special-text'},
          {rank: 4, text:'Unstoppable!', amount: 5,class:'special-text'},
          {rank: 4, text:'Unstoppable!', amount: 6,class:'special-text'},
        ];
  
        function comboTextResponse(rank,amount){
          let result = '';
          for (let index = 0; index < comboTexts.length; index++) {
            const element = comboTexts[index];
              if(parseInt(rank) == element.rank && element.amount == parseInt(amount) ){              
                result = ('<span class="combo-text '+element.class+'">'+element.text+'</span>')    
                return result;                      
              }                        
              if(parseInt(rank) == element.rank && element.amount > parseInt(amount) ){              
                result = ('<span class="combo-text '+element.class+'">'+element.text+'</span>')    
                return result;
              }
          }          
  
        }
  
        let html = '';
        for (let index = 0; index < ranksArray.length; index++) {
          const element = ranksArray[index];
            if(element.length > 0){
              html += '<span class="main">'+element[0]+'</span>' + '<span class="special">x'+element.length+'</span>'
              html += comboTextResponse(element[0],element.length)
            }
        }     
        
        return (
          <div className="combos">
              <span dangerouslySetInnerHTML={{__html : html}}></span>
          </div>
        );
    }

    return (
        <tr key={key}>
        <th scope="row" style={{minWidth:'265px'}}>{getRanks(obj.claims.ranks)}</th>
        <td style={{minWidth:'450px'}}><UserCircle size={18} color="#827A99" />{obj.address}</td>
        <td style={{background:'#0F0038', textAlign:'center'}} className={obj.claims.claimed ? 'collected' : 'uncollected'}>{obj.claims.claimed ? 'Collected' : 'Uncollected'}</td>
        </tr>         
    )
}