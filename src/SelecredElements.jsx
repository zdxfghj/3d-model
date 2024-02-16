import React, { useState,Suspense, useEffect } from 'react'
import { FrontSide } from 'three'


export default function SelectedElements({selectedElements,setSelectedElements}) {

//   const [selectedElements,setSelectedElements] = useState([
//    {front_bumper:  false, baseCost: 100, damage: 1} ,
//    {hood:  false, damage: 1, coin: 130,variableCoin: 130},

console.log(selectedElements);
function Element (item){
  
    return(
        <div className='card_item'>
        <h2 className='card_item_title'>{item.name}</h2>
        <select className="calc_select" name={item.name} value={item.damage} 
          onChange={e => {
            // const newArray = selectedElements.map(item => {
            //   if (item.name == e.target.name) {
            //     console.log( e.target.value)
            // return {...item, damage: e.target.value, variableCoin: e.target.value*item.coin}
            // } else return item;
            // })
            // setSelectedElements(newArray);
           }}>
          <option value={1}>Без повреждений</option>
          <option value={2}>Небольшие повреждения</option> 
          <option value={3}>Cредние повреждения</option>
          <option value={4}>Серьезные повреждения</option>
          <option value={5}>Тотальные повреждения</option>
      </select>
      <div className="" style={{fontSize : 20 }}>Стоимость работ: {item.variableCoin} р.</div>
      </div>
    )
}


  
  return (
    <div>
   {Object.keys(selectedElements).map((key,index) =>  console.log(selectedElements[key]))}
    </div>
  )
}
