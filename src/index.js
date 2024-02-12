import { createRoot } from "react-dom/client"
import "./styles.css"
import App from "./App"
import store from './app/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")).render( <Provider store={store}><App /></Provider>)