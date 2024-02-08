import React, { useState } from 'react'
import { Canvas } from "@react-three/fiber"
import { Center,Bounds,AccumulativeShadows,RandomizedLight, Environment, OrbitControls } from "@react-three/drei"
import { EffectComposer, Selection, Outline } from "@react-three/postprocessing"
import { Volkswagen } from "./components/Volkswagen_golf1"
import { Leva} from 'leva'

export default function App() {
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
    <group position={[0, -0.75, 0]}>
      <Center top>
      <Selection>
          <EffectComposer multisampling={0} autoClear={false}>
            <Outline visibleEdgeColor="white" hiddenEdgeColor="white"  width={1000} edgeStrength={5} />
          </EffectComposer>
        <Bounds fit clip margin={1.2} damping={0}>
          <Volkswagen config = {config}  setConfig = {setConfig}/>
        </Bounds>
        </Selection>
      </Center>
      <AccumulativeShadows>
        <RandomizedLight position={[2, 5, 5]} />
      </AccumulativeShadows>
    </group>
    <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
    
    <Environment preset="dawn" background blur={1} />
  </Canvas>
  <div className="calc">
    <h1 className="calc__title">Калькулятор кузовных работ</h1>
    <select className="calc_select">
      <option value={""}>Без повреждений</option>
      <option value={""}>Небольшие повреждения</option>
      <option value={""}>Cредние повреждения</option>
      <option value={""}>Серьезные повреждения</option>
      <option value={""}>Тотальные повреждения</option>
    </select>
    <div className="coin"></div>

  </div>
  </div>
  )
}
