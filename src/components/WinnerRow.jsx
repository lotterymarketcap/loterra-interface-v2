import React, {useState} from "react";

import { UserCircle } from "phosphor-react";

export default function WinnerRow(props){    

    const {a, obj} = props;

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
        
        const rankClasses = [
          {rank: 1, class:'super-special-text'},       
          {rank: 2, class:'special-text'},         
          {rank: 3, class:'medium-text'},       
          {rank: 4, class:''},        
        ];
        
        const amountClasses = [
          {amount: 1, class:'cyan'},       
          {amount: 2, class:'blue'},         
          {amount: 3, class:'cyan'},       
          {amount: 4, class:'fire'},        
          {amount: 5, class:'fire'},        
          {amount: 6, class:'fire'},        
          {amount: 7, class:'fire'},        
          {amount: 8, class:'fire'},        
          {amount: 9, class:'fire'},        
          {amount: 10, class:'fire'},        
          {amount: 11, class:'fire'},                  
        ];
     

        const comboTextFour = [
            'Good work!',
            'Boom!',
            'Perfect!',
            'So close!',
            'Dynamite!',
            'On Fire!',
            'Impossible!',
        ]

        const comboTextThree = [
            'What a combo?!',
            'Wipeout!',
            'Tasty!',
            'Blasted!',
            'Thunder!',            
        ]

        const comboTextTwo = [
            'Heros!',
            'Smashed!',
            'Rocket!',
            'Master!',
            'Out of control!',
            'Ticket Storm!',
            'Blasted!',
            'On Fire!',
            'Crypto mania!',           
        ]

        const comboTextOne = [
            'Big bang!',
            'Destroyer!',
            'Dynamite!',
            'Summit!',
            'Mavericks!',
            'Galactic!',
            'Wanted!',
        ]

        function getComboText(rank,amount){
            let text = ''
            if(rank == 1){
                text = comboTextOne[parseInt(amount)] != undefined ? comboTextOne[parseInt(amount - 1)] : comboTextOne[comboTextFour.length - 1];
            }
            if(rank == 2){
                text = comboTextTwo[parseInt(amount)] != undefined ? comboTextTwo[parseInt(amount - 1 )] : comboTextTwo[comboTextFour.length - 1];
            }
            if(rank == 3){
                text = comboTextThree[parseInt(amount)] != undefined ? comboTextThree[parseInt(amount -1 )] : comboTextThree[comboTextFour.length - 1];
            }
            if(rank == 4){
                text = comboTextFour[parseInt(amount)] != undefined ? comboTextFour[parseInt(amount -1 )] : comboTextFour[comboTextFour.length - 1];
            }            
            return text;
        }

        function getAmountClass(amount){
          let name = '';
 
          for (let index = 0; index < amountClasses.length; index++) {
            const element = amountClasses[index];
            if(element.amount == amount){
              name = element.class
            }
            
          }

          return name;
        }
  
        function comboTextResponse(rank,amount){
          let result = '';
          for (let index = 0; index < rankClasses.length; index++) {
            const element = rankClasses[index];
              if(parseInt(rank) == element.rank){              
                result = ('<span class="combo-text '+element.class+' '+getAmountClass(amount)+'">'+getComboText(rank,amount)+'</span>')
                return result;                      
              }                       
             
          }          
  
        }
  
        let html = '';
        for (let index = 0; index < ranksArray.length; index++) {
          const element = ranksArray[index];
            if(element.length > 0){
              html += '<span class="combo-box">'
              html += '<span class="main">'+element[0]+'</span>' + '<span class="special">x'+element.length+'</span>'
              html += comboTextResponse(element[0],element.length)
              html += '</span>'
            }
        }     
        
        return (
          <div className="combos">
              <span dangerouslySetInnerHTML={{__html : html}}></span>
          </div>
        );
    }

    return (
        <tr key={a}>
            <th scope="row" style={{minWidth:'265px'}}>{getRanks(obj.claims.ranks)}</th>
            <td style={{minWidth:'450px'}}><UserCircle size={18} color="#827A99" />{obj.address}</td>
            <td style={{background:'#0F0038', textAlign:'center'}} className={obj.claims.claimed ? 'collected' : 'uncollected'}>{obj.claims.claimed ? 'Collected' : 'Uncollected'}</td>
        </tr>         
    )
}