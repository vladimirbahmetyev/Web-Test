import React, {useState} from "react"
import Input from "../Input/Input"

import "./Login.css"

export default function Login(props) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {setKey} = props

    let sendForm = ()=>{
        if(login.length === 0 || password.length ===0){
            alert("Логин или пароль не могут быть пустыми")
            return
        }
        fetch("http://emphasoft-test-assignment.herokuapp.com/api-token-auth/",{
            method: "POST",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: login,
                password: password
            })
        }
        )
        .then(response => response.json())
        .then(data => setKey(data.token))
    }

    return(
        <div className="login">
            <Input inputName="Login:" name="login" onChange={setLogin} type="login" value={login}/>
            <Input inputName="Password:" name="password" onChange={setPassword} type="password" value={password}/>
            <button type='submit' className="login__button" onClick={sendForm}>Войти</button>
        </div>
    )
}