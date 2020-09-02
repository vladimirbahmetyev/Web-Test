import React, {useState, useEffect} from "react"
import UserItem from "../UserItem/UserItem"
import "./UsersList.css"
import Input from "../Input/Input"

export default function UsersList(props) {
    const {user_list} = props
    const [List, setList] = useState(user_list)
    const [curFilter, setFilter] = useState("");
    const [curSort, setSort] = useState("none")

    useEffect(() => {
        let tempList = []
        Object.assign(tempList, user_list)
        if(curFilter.length !== 0){
            tempList = tempList.filter(item => item['username']
                                                .toLowerCase()
                                                .indexOf(curFilter.toLowerCase())
                                                !== -1)
        }
        if(curSort === 'inc'){
            tempList = tempList.sort((first,second) => first.id > second.id? 1 : -1)
        }
        if(curSort === 'decr'){
            tempList = tempList.sort((first,second) => first.id < second.id? 1 : -1)
        }
        setList(tempList)

    }, [user_list, curSort, curFilter]);

    let handleSortChange = (e) =>{
        let sortType = e.target.value
        setSort(sortType)
    }

    let handleFilterChange = (curFilter) =>{
        setFilter(curFilter)
    }

    return(
    <div className="users-list">
        <div className="show-option__containter">
            <Input type="text"name="filter" inputName="Поиск по username" onChange = {handleFilterChange}/>
            <div className="option__container">
                <div className="show-option__sort" >
                    <label> 
                        <input 
                        type="checkbox" 
                        value="inc" 
                        checked={curSort === "inc"}
                        onChange={handleSortChange}/>
                        Сортировать по возрастанию id
                    </label>
                </div>
                <div className="show-option__sort">
                    <label> 
                        <input 
                        type="checkbox"
                        value="decr"
                        checked={curSort === "decr"}
                        onChange={handleSortChange}/>
                        Сортировать по убыванию id
                    </label>
                </div>

                <div className="show-option__sort">
                    <label> 
                        <input 
                        type="checkbox"
                        value="none"
                        checked={curSort === "none"}
                        onChange={handleSortChange}/>
                        Не сортировать
                    </label>
                </div>
            </div>
        </div>
        <ul className="users-list__container">
            {List.map(item => <li key={item.id} className="users-list__item"><UserItem {...item}/></li>)}
        </ul>
    </div>)
}