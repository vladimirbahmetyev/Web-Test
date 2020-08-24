import React from "react"
import "./UserItem.css"

export default function UserItem(props) {
    const {username, first_name, last_name, id, is_active} = props
    return(
    <div className="user-item">
        <div className="user-item__name-container">
            <div className="user-item__user-name">{username}</div>
            <div className="user-item__full-name">{`${first_name} ${last_name}`}</div>
        </div>
        <div className="user-item__additional-container">
            <div className={`user-item__is-activ ${is_active? "green-text":"gray-text"}`}>
                {is_active? "Active" : "Not Active"}
            </div>
            <div className="user-item__id">
                {`id: ${id}`}
            </div>
        </div>
    </div>)
}