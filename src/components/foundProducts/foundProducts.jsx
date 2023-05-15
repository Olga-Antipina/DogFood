import React from "react"
import './foundProducts.css'

export const FoundProducts = ({debounceValueInApp, cards}) => {
    
    const foundEnding = () => {
        if (cards.length%10 > 1 && cards.length !== 11) {      
          return 'о'
        }
      }
      const productEnding = () => {
        if (cards.length%10 === 0) { 
          return 'ов';
        } else if (cards.length > 4 && cards.length < 20) {  
          return 'ов';
        } else if (cards.length%10 > 1 && cards.length%10 < 5) {  
          return 'а';
        } else if (cards.length%10 > 4 && cards.length%10 < 9) {  
          return 'ов';
        }
      }
    
    if (!!debounceValueInApp && cards.length > 0) {
        return (
            <div className="foundProducts">
                <div className="foundProducts__search">По запросу <span className="foundProducts__search__value">{debounceValueInApp}</span> найден{foundEnding()} {cards.length} товар{productEnding()}</div>
            </div>
        )
    }
}