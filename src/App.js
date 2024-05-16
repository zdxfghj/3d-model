import React, { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import VolkswagenCanvas from "../src/components/Volkswagen_golf1.jsx"
import {
  Center,
  Bounds,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import {
  EffectComposer,
  Selection,
  Outline,
} from "@react-three/postprocessing";
import SelectedElements from "./SelecredElements";



export default function App() {
  const [selectedElements, setSelectedElements] = useState({
    front_bumper: {
      selected: false,
      baseCost: 100,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Передний бампер",
    },
    hood: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Капот",
    },
    back_bumper: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Задний бампер",
    },
    front_fender_left: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Переднее левое крыло",
    },
    front_fender_rigth: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Переднее правое крыло",
    },
    roof: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Крыша",
    },
    front_door_left: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Переднея левая дверь",
    },
    front_door_rigth: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Переднея правая дверь",
    },
    back_door_left: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Задняя левая дверь",
    },
    back_door_rigth: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Задняя правая дверь",
    },
    trunk_lid: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Крышка багажника ",
    },
    back_fender_left: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Заднее левое крыло",
    },
    back_fender_rigth: {
      selected: false,
      damage: 1,
      coin: 130,
      variableCoin: 130,
      name: "Задднее правое крыло",
    },
  });
  const [allCoin, setAllCoin] = useState(0);
  const [textField, setTextField] = useState('');
  const [modelCar, setModelCar] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [yearCar, setYearCar] = useState("2024");
  const [apiModelCar, setApiModelCar] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/cars/")
    .then(res => res.json())
    .then(result => setApiModelCar(result.results))
     
  },[])


  useEffect(() => {
    ///Problem
    setAllCoin(0)
    Object.keys(selectedElements).map((key, index) =>
      selectedElements[key].selected
        ? setAllCoin(allCoin + selectedElements[key].variableCoin)
        : null
    );
  }, [selectedElements]);

 const handleChangeYearCar = (event) => {
    setYearCar(event.target.value)
  }

  const handleChangeEmail = (event)=>{
    setEmail(event.target.value)
  }
  const handleChangePhoneNumber = (event)=>{
    setPhoneNumber(event.target.value)
  }
  

  const handleChangeModelCar = (event) => {
    setModelCar(event.target.value)
  }
  const handleSubmit=(event)=> {
    event.preventDefault();
    Object.keys(selectedElements).map((key, index) =>
      selectedElements[key].selected
        ? setTextField(textField + selectedElements[key].name+' '+ selectedElements[key].variableCoin)
        : null
    )

    console.log({
      "year": yearCar,
      "contact_info": phoneNumber,
      "email": email,
      "damage_description": textField,
      "car": modelCar
  })
    fetch('http://127.0.0.1:8000/api/feedbacks/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "year": yearCar,
      "contact_info": phoneNumber,
      "email": email,
      "damage_description": textField,
      "car": modelCar
  }),
    })
       
  }

  return (
    
    <div className="modul">
     
      <Canvas
        gl={{ antialias: false, preserveDrawingBuffer: true }}
        shadows
        camera={{ position: [100, 50, 200], fov: 35 }}
        style={{
          width: 1000,
          height: 700,
          borderTopLeftRadius: 40,
          borderBottomLeftRadius: 40,
        }}
      >
      
        <Suspense>
          <group position={[0, -0.75, 0]}>
            <Center top>
              <Selection>
                <EffectComposer multisampling={0} autoClear={false}>
                  <Outline
                    visibleEdgeColor="white"
                    hiddenEdgeColor="white"
                    width={1000}
                    edgeStrength={5}
                  />
                </EffectComposer>
                <Bounds fit clip margin={1.2} damping={0}>
                  <VolkswagenCanvas
                    setSelectedElements={setSelectedElements}
                    selectedElements={selectedElements}
                  />
                </Bounds>
              </Selection>
            </Center>
            <AccumulativeShadows>
              <RandomizedLight position={[2, 5, 5]} />
            </AccumulativeShadows>
          </group>

          <OrbitControls
            makeDefault
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />

          <Environment preset="dawn" background blur={1} />
        </Suspense>
      </Canvas>
      
      <div className="calc .bg-primary">
        <h1 className="calc__title">Калькулятор кузовных работ</h1>
       
          <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column">
            <label>
              Выберите модель:
              <select onChange={handleChangeModelCar} class="form-select">
              {apiModelCar.map(item=><option value={item.id}>{item.car_model}</option>
              )}
               
              </select>
            </label>
            <label >
                Выберите год авто:
                <select  onChange={handleChangeYearCar} class="form-select">
                <option value="2024" selected>2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
              </select>
            </label>
            <label>
               Email:
               <input name="email"  type="email" class="form-control"value={email} onChange={handleChangeEmail} />
            </label>
            <label>
               Контактные данные(номер телефона):
               <input name="phone"  type="name" class="form-control"  value={phoneNumber} onChange={handleChangePhoneNumber}/>
            </label>
            <br></br>
            <input type="submit" className="btn btn-outline-light" value="Отправить"  onChange={handleSubmit} />
            </div>
          </form>
         
        <SelectedElements
          selectedElements={selectedElements}
          setSelectedElements={setSelectedElements}
        />
        <div className="coin">Стоимость работ: {allCoin} р.</div>
      </div>
     
    </div>
  );
}
