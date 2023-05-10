import Header from "./components/Header";
import Cards from "./components/Cards";
import { Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Detail from "./components/Detail";
import { createContext, useState } from "react";
import Login from "./components/Login";
import Singup from "./components/Singup";
const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false)
  const [username, setUserName] = useState('');

  
  return (
    <Appstate.Provider value = {{login,username, setLogin, setUserName}}>
      <div className="App relative">
        <Header />
        <Routes>
          <Route path='/' element={<Cards />}></Route>
          <Route path='/addmovie' element={<AddMovie />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Singup />}></Route>
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}
