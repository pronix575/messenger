import React from 'react'

export const Selector = ({ state }) => {

    return (
        <div className="selectorContainer flex">
            {  state.map(item => 
                
                <div key={ item.name } className={ "selectorItem " + item.classList } onClick={ item.action }>
                    { item.name }
                </div> 
            )}
        </div>
    )
}
