import React, { useState,Suspense, useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
import { Center,Bounds,AccumulativeShadows,RandomizedLight, Environment, OrbitControls } from "@react-three/drei"
import { EffectComposer, Selection, Outline } from "@react-three/postprocessing"
import { VolkswagenCanvas } from "./components/Volkswagen_golf1"
import { Leva} from 'leva'
import SelectedElements from './SelecredElements'


export default function App() {
  const [selectedElements,setSelectedElements] = useState([])
  const [coin,setCoin] = useState(100)
 
  

  const [config,setConfig] = useState({
    all: false,
    front_bumper:  false ,
    hood:  false ,
    back_bumper: false,
    front_fender_left:  false,
    front_fender_rigth:  false,
    roof: false,
    front_door_left: false,
    front_door_rigth: false,
    back_door_left: false,
    back_door_rigth: false,
    trunk_lid:false,
    back_fender_left: false,
    back_fender_rigth: false,
}
)


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
          <VolkswagenCanvas config = {config}  setConfig = {setConfig} setSelectedElements={setSelectedElements} selectedElements = {selectedElements} />
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
    <SelectedElements selectedElements={selectedElements}  />
    <div className="coin">Стоимость работ: {coin} р.</div>
  </div>
 
  </div>
  )
}
