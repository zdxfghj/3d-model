import React, { useState,Suspense, useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
import { Center,Bounds,AccumulativeShadows,RandomizedLight, Environment, OrbitControls } from "@react-three/drei"
import { EffectComposer, Selection, Outline } from "@react-three/postprocessing"
import { VolkswagenCanvas } from "./components/Volkswagen_golf1"
import { Leva} from 'leva'
import SelectedElements from './SelecredElements'


export default function App() {
  const [selectedElements,setSelectedElements] = useState({
     front_bumper:{selected:  false, baseCost: 100, damage: 1, coin: 130,variableCoin: 130, name:"Передний бампер"} ,
     hood:{selected:  false, damage: 1, coin: 130,variableCoin: 130, name:"Капот"},
     back_bumper:{selected: false, damage: 1, coin: 130,variableCoin: 130, name:"Задний бампер"},
     front_fender_left:{selected:  false, damage: 1, coin: 130,variableCoin: 130, name:"Переднее левое крыло"},
     front_fender_rigth:{selected: false, damage: 1, coin: 130,variableCoin: 130, name:"Переднее правое крыло"},
     roof:{selected:  false, damage: 1, coin: 130,variableCoin: 130, name:"Крыша"},
     front_door_left:{selected: false, damage: 1, coin: 130,variableCoin: 130, name:"Переднея левая дверь"},
     front_door_rigth:{selected:  false, damage: 1, coin: 130,variableCoin: 130, name:"Переднея правая дверь"},
     back_door_left:{selected: false, damage: 1, coin: 130,variableCoin: 130, name:"Задняя левая дверь"},
     back_door_rigth:{selected:  false, damage: 1, coin: 130,variableCoin: 130, name:"Задняя правая дверь"},
     trunk_lid:{selected:  false, damage: 1, coin: 130,variableCoin: 130, name:"Крышка багажника "},
     back_fender_left:{selected: false, damage: 1, coin: 130,variableCoin: 130, name:"Заднее левое крыло"},
     back_fender_rigth:{selected:  false, damage: 1, coin: 130,variableCoin: 130, name:"Задднее правое крыло"},
  }
)
 const [allCoin,setAllCoin] = useState(0)

useEffect(()=>{
  ///Problem
  Object.keys(selectedElements).map((key, index) =>selectedElements[key].selected ? setAllCoin(allCoin+selectedElements[key].variableCoin) : null)
},[selectedElements])
 


  return (
    <div className="modul">
    <Leva/> 
  <Canvas gl={{ antialias: false, preserveDrawingBuffer: true }} shadows camera={{ position: [100, 50, 200], fov: 35 }}  style={{ width: 1000, height: 700, borderTopLeftRadius: 40,borderBottomLeftRadius:40}}>
  <Suspense>
    <group position={[0, -0.75, 0]}>
      <Center top>
      <Selection>
          <EffectComposer multisampling={0} autoClear={false}>
            <Outline visibleEdgeColor="white" hiddenEdgeColor="white"  width={1000} edgeStrength={5} />
          </EffectComposer>
        <Bounds fit clip margin={1.2} damping={0}>
          <VolkswagenCanvas  setSelectedElements={setSelectedElements} selectedElements = {selectedElements} />
        </Bounds>
        </Selection>
      </Center>
      <AccumulativeShadows>
        <RandomizedLight position={[2, 5, 5]} />
      </AccumulativeShadows>
    </group>

    <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
    
    <Environment preset="dawn" background blur={1} />
    </Suspense>
  </Canvas>
  <div className="calc">
    <h1 className="calc__title">Калькулятор кузовных работ</h1>
    <SelectedElements selectedElements={selectedElements} setSelectedElements ={setSelectedElements} />
    <div className="coin">Стоимость работ: {allCoin} р.</div>
  </div>
 
  </div>
  )
}
