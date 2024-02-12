import React, { useState,Suspense, useEffect } from 'react'
import { FrontSide } from 'three'


export default function SelectedElements({selectedElements,setSelectedElements}) {

//   const [selectedElements,setSelectedElements] = useState([{name: 'roof', damage: 'withoutDamage'}, {name: "hood", damage: 'withoutDamage'}])
 
  



function Element (item){
  
    return(
        <div className='card_item'>
        <h2 className='card_item_title'>{item.name}</h2>
        <select className="calc_select" name={item.name} value={item.damage} 
          onChange={e => {
            const newArray = selectedElements.map(item => {
              if (item.name == e.target.name) {
                console.log( e.target.value)
            return {...item, damage: e.target.value}
            } else return item;
            })
            setSelectedElements(newArray);
           }}>
          <option value={"withoutDamage"} >Без повреждений</option>
          <option value={"minorDamage"}>Небольшие повреждения</option> 
          <option value={"averageDamage"}>Cредние повреждения</option>
          <option value={"seriousDamage"}>Серьезные повреждения</option>
          <option value={"totalDamage"}>Тотальные повреждения</option>
      </select>
      <div className="" style={{fontSize : 10 }}>Стоимость работ: {12} р.</div>
      </div>
    )
}


  return (
    <div>
        {selectedElements.map(item =>Element(item))}
    </div>
  )
}
