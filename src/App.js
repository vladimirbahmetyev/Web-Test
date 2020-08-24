import React, {useState} from 'react';
import Login from "./Components/Login/Login"
import UserList from "./Components/UsersList/UsersList"
import Edit from "./Components/Edit/Edit"

import './App.css';

function App() {

  const [ApiKey, setApiKey] = useState("");
  const [userList, setUserList] = useState([])
  const [currentTask, setCurrentTask] = useState("first")

  const clickTaskHandler = (e) =>{
    let clickedTask = e.target.value
    if(clickedTask === currentTask){
        return
    }
    
    let navPanelNodes = document.querySelector(".app__task-nav").childNodes
    navPanelNodes.forEach(node => node.classList.remove("active_button"))
    navPanelNodes.forEach(node => {
        if(node.value === clickedTask){
            node.classList.add("active_button")
        }
    })
    
    let carusel = document.querySelector(".app__carusel")
    
    if(clickedTask === "first"){
      carusel.classList.remove("shift")
    }

    if(clickedTask === "second"){
      carusel.classList.add("shift")
    }
    
    setCurrentTask(clickedTask)
}

  const onGetKey = (key)=>{
    loadUserList(key)
    setApiKey(key)     
  }

  const loadUserList = (key = ApiKey) =>{
    fetch("https://emphasoft-test-assignment.herokuapp.com/api/v1/users/",{
      headers:{
        'Authorization': `Token ${key}`
      }
    })
    .then(response => {
      if( response.status === 200){
        return response.json()
      }
      else{
        console.log(`Error: ${response.status}`)
      }
    })
    .then(userList => {
      console.log("Подгружаю список")
      setUserList(userList) 
    })
  }

  return (
    <div className="App">
      {userList.length === 0?
      <Login setKey={onGetKey}/>
      :
      <div className="app__task-container">
          <div className="app__task-nav" onClick={clickTaskHandler}>
            <button value="first" className="edit__button login__button active_button">
              Задание 1
            </button>
            <button value="second" className="edit__button login__button">
              Задание 2
            </button>
          </div>
          <div className="app__carusel">
            <div className="app__carusel__item">
              <UserList user_list={userList}/>
            </div>
            <div className="app__carusel__item">
              <Edit apiKey={ApiKey} userList={userList} reloadList={loadUserList}/>
            </div>
          </div>
      </div>}      
    </div>
  );
}

export default App;
