import React, {useState} from 'react'
import "./Edit.css"

import Input from "../Input/Input"

export default function Edit(props) {

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [oldUserName, setOldUsername] = useState("")

    const [currentMode, setCurrentMode] = useState("create")

    const {apiKey, userList, reloadList} = props 

    const passRegExp = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    const userNameRegExp = /^[\w.@+-]+$/

    let modeHandler = (e) =>{
        let clickedMode = e.target.value
        if(clickedMode === currentMode){
            return
        }
        
        let navPanelNodes = document.querySelector(".edit__nav-panel").childNodes
        navPanelNodes.forEach(node => node.classList.remove("active_button"))
        navPanelNodes.forEach(node => {
            if(node.value === clickedMode){
                node.classList.add("active_button")
            }
        })
        setCurrentMode(clickedMode)
    }

    let isFormValid = () => {
        if(password !== passwordCheck){
            alert("Пароли не совпадают!")
            return false
        }                
        
        if(passwordCheck.match(passRegExp) === null){
            alert("Пароль должен состоять минимум из 8 символов и включать одну заглавную, строчную букву и одну цифру")
            return false
        }

        if(passwordCheck.length === 0 || passwordCheck.length > 128){
            alert("Длина пароля должна быть от 1 до 128 символов")
            return false
        }

        if(currentMode==="create"){
            let userNameList = userList.map(user=> user.username)
            if(username.match(userNameRegExp) === null || userNameList.indexOf(username) !== -1){
                alert("Вы не можете выбрать данное имя")
                return false
            }
        }

        if( firstName.length > 30){
            alert("Имя не может быть длиннее 30 символов")
            return false
        }
        if( firstName.length > 150){
            alert("Фамилия не может быть длиннее 150 символов")
            return false
        }
        return true
    }

    let submitHandler = ()=>{
        if(currentMode==="create"){

            if(!isFormValid()){
                return
            }
            
            let newUser = {
                username: username,
                first_name: firstName,
                last_name: lastName,
                password: password,
                is_active: "true"
            }
        fetch("http://emphasoft-test-assignment.herokuapp.com/api/v1/users/", {
            method: "POST",
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${apiKey}`
            },
            body: JSON.stringify(newUser) 
        })
        .then(response =>{
            if(response.status ===201){
                reloadList()
                alert("Вы успешно создали пользователя")
                return response.json()
            }
        } )
        }

        if(currentMode==="edit"){
            let patchUser = userList.filter(user => user.username === oldUserName)[0]
            let patchedUserId = patchUser.id
            if(!isFormValid()){
                return
            }
            
            let tempUser = {
                username: username,
                first_name: firstName,
                last_name: lastName,
                password: password,
                is_active: "true"
            }
            fetch(`http://emphasoft-test-assignment.herokuapp.com/api/v1/users/${patchedUserId}/`, {
                method: "PATCH",
                credentials: 'same-origin',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${apiKey}`
                },
                body: JSON.stringify(tempUser) 
            })
            .then(response =>{
                if(response.status ===200){
                    reloadList()
                    alert("Вы успешно изменили пользователя")
                    return response.json()
                }
            } )
        }

        if(currentMode==="delete"){
            let deleteUser = userList.filter(user => user.username === oldUserName)[0]
            let deleteUserId = deleteUser.id

            let tempUser = {
                username: deleteUser.username,
                first_name: deleteUser.firstName,
                last_name: deleteUser.lastName,
                password: deleteUser.password,
                is_active: "false"
            }
            fetch(`http://emphasoft-test-assignment.herokuapp.com/api/v1/users/${deleteUserId}/`, {
                method: "PATCH",
                credentials: 'same-origin',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${apiKey}`
                },
                body: JSON.stringify(tempUser) 
            })
            .then(response =>{
                if(response.status ===200){
                    reloadList()
                    alert("Вы успешно удалили пользователя")
                    return response.json()
                }
            } )
        }
    }

    return(
    <div className="edit">
        <div className="edit__nav-panel" onClick={modeHandler}>
            <button value="create" className="edit__button login__button active_button">
                Создать пользователя
            </button>
            <button value="edit" className="edit__button login__button">
                Изменить пользователя
            </button>
            <button value="delete"className="edit__button login__button">
                Удалить пользователя
            </button>
        </div>
        {currentMode=== "create"? <div className="edit__form">            
            <Input type="text" name="edit__user-name" inputName="Username"onChange={setUsername} value={username}/>
            <Input type="text" name="edit__first-name" inputName="Имя"onChange={setFirstName} value={firstName}/>
            <Input type="text" name="edit__last-name" inputName="Фамилия"onChange={setLastName} value={lastName}/>
            <Input type="password" name="edit__password" inputName="Пароль"onChange={setPassword} value={password}/>
            <Input type="password" name="edit__password-check" inputName="Повторите пароль"onChange={setPasswordCheck} value={passwordCheck}/>
        </div>:
        currentMode==="edit" ?
         <div className="edit__form">            
            <Input type="text" name="edit__user-name" inputName="Старый username"onChange={setOldUsername} value={oldUserName}/>
            <Input type="text" name="edit__user-name" inputName="Новый username"onChange={setUsername} value={username}/>
            <Input type="text" name="edit__first-name" inputName="Новое Имя"onChange={setFirstName}value={firstName}/>
            <Input type="text" name="edit__last-name" inputName="Новая Фамилия"onChange={setLastName} value={lastName}/>
            <Input type="password" name="edit__password" inputName="Новый пароль"onChange={setPassword} value={password}/>
            <Input type="password" name="edit__password-check" inputName="Подтвердите новый пароль"onChange={setPasswordCheck} value={passwordCheck}/>
        </div>:
        currentMode ==="delete" ? 
        <div className="edit__form">            
            <Input type="text" name="edit__user-name" inputName="Пользователь, которого вы хотите удалить"onChange={setOldUsername} value={oldUserName}/>
        </div> : <></>}
        <button className="edit__button login__button" type="submit" onClick={submitHandler}>Подтвердить</button>
    </div>
    )    
}