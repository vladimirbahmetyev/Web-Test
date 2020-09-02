import React, {useState, useEffect, useCallback} from 'react';
import Login from "./Components/Login/Login"
import UserList from "./Components/UsersList/UsersList"
import Edit from "./Components/Edit/Edit"

import './App.css';

function App() {

  const [ApiKey, setApiKey] = useState("");
  const [userList, setUserList] = useState([])
  const [currentTask, setCurrentTask] = useState("first")
  const [isAuthorized, setIsAuthorized] = useState(false);

  const loadUserList = useCallback(
    async(key = ApiKey) =>{
      const data = await fetch("https://emphasoft-test-assignment.herokuapp.com/api/v1/users/",{
      headers:{
        'Authorization': `Token ${key}`
      }
    })
    let userList = []
    if( data.status === 200){
      userList = await data.json()
    }
    else{
      console.log(`Error: ${data.status}`)
    }
    setUserList(userList)
  },[ApiKey]
  )
  
  useEffect(() => {
    let key = getCookie("key")
    if(key){
      setApiKey(key)
      loadUserList(key)
      setIsAuthorized(true)
    }  
  }, [loadUserList]);

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

  const setKeyCookie = (key) =>{
      document.cookie = `key=${key}`
  }

  const getCookie = (name)=>{
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }


  const installApiKey = (key)=>{
    setIsAuthorized(true)
    setApiKey(key)   
    setKeyCookie(key)  
    loadUserList(key)
  }
  return (
    <div className="App">
      {!isAuthorized?
      <Login setKey={installApiKey}/>
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
