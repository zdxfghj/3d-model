import React from 'react'



export default function SelectedElements({ selectedElements, setSelectedElements }) {


  function Element(props) {
    const { item, index } = props
    console.log(item, index)

    return (
      <div className='card_item'>
        <h2 className='card_item_title'>{item.name}</h2>
        <select className="calc_select" name={item.name} value={selectedElements[index].damage}
          onChange={e => {
            setSelectedElements({ ...selectedElements, [index]: { ...selectedElements[index], damage: e.target.value, variableCoin: e.target.value * selectedElements[index].coin } })
          }}>
          <option value={1}>Без повреждений</option>
          <option value={2}>Небольшие повреждения</option>
          <option value={3}>Cредние повреждения</option>
          <option value={4}>Серьезные повреждения</option>
          <option value={5}>Тотальные повреждения</option>
        </select>
        <div className="" style={{ fontSize: 20 }}>Стоимость работ: {selectedElements[index].variableCoin} р.</div>
      </div>
    )
  }


  return (
    <div>
      {Object.keys(selectedElements).map((key, index) => selectedElements[key].selected ? <Element item={selectedElements[key]} index={key} /> : null)}
    </div>
  )
}
