import React, { useState,Suspense, useEffect } from 'react'


export default function SelectedElements({selectedElements}) {

//   const [selectedElements,setSelectedElements] = useState([{name: 'iii'}, {name: "iooooo"}])
 
  

useEffect(() =>{
    
},[selectedElements])

function Element (item){
    return(
        <div className='card_item'>
        <h2>{item.name}</h2>
        <select className="calc_select">
        <option value={""}>Без повреждений</option>
        <option value={""}>Небольшие повреждения</option>
        <option value={""}>Cредние повреждения</option>
        <option value={""}>Серьезные повреждения</option>
        <option value={""}>Тотальные повреждения</option>
      </select>
      </div>
    )
}


  return (
    <div>
        {selectedElements.map(item =>Element(item))}
    </div>
  )
}
