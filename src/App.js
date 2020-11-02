import React from 'react'
import {Route,useHistory} from 'react-router-dom'

import {useLocalStorage} from "./utils/useLocalStorage";
import Users from "./components/Users/Users";
import Profile from "./components/Profile/Profile";
import User from "./components/Users/User";
import SortPopup from "./components/SortPopup/SortPopup";

function App() {
    /*save users in localstoredge*/
    const [users, setUsers] = useLocalStorage("users", []);
    /*activeItem is choosen and displaed in Profile component*/
    const [activeItem,setActiveItem] = React.useState(null)
    /*propertie of object history. If userId is changed we have render other profile*/
    const [userId,setUserId] = React.useState('')
    const sortItems = [{name:'Random',type:'random'},{name:'Alphabet',type:'name'},{name:'By first char',type:'firstChar'}]

    const [activeSortType,setActiveSortType] = React.useState(sortItems[0].type)
    const history = useHistory()
    /*get array of users*/
    React.useEffect(() => {
        fetch('http://demo.sibers.com/users')
            .then(response => response.json())
            .then(data => {
                    setUsers(data)
                }
            )
    }, [])
        /*If userId or users were changed, set new profile for render*/
    React.useEffect(() => {
        if (users) {
            const user = users.find(user => user.id === Number(userId))
            setActiveItem(user)
        }
    },[userId,users])
        /*Change user in dependent of properties were changed */
    const editeData = (data) => {
        console.log(data)
        const newUsers = users.map(user => {
            if (user.id === activeItem.id){
                if (data.hasOwnProperty("city")){
                    const address = {...user.address,...data}
                    user = {...user,address}
                    console.log(user)
                } else if (data.hasOwnProperty("catchPhrase")){
                    const company = {...user.company,...data}
                    user = {...user,company}
                    console.log(user)
                } else{
                    user = {...user,...data}
                }
            }
            return user
        })
        setUsers(newUsers)
    }
/*Change seperatly block of user*/
    const editeDataContacts = (data) => {editeData(data)}
    const editeDataAddress = (data) => {editeData(data)}
    const editeDataCompany = (data) => {editeData(data)}
/*Chose user and set this info in history obj. In order to start up useEffect set id in userId*/
    const onClickUser = (id) => {
        history.push(`/users/${id}`)
        setUserId(history.location.pathname.split('users/')[1])
    }
/*useCallback in order to prevent excess rerenders*/
    const onSelectSort = React.useCallback((obj) => {
        if (obj.type === 'name') {
            const newUsers = [...users.sort(function (a,b) {
                let aname = a.name.toLowerCase()
                let bname = b.name.toLowerCase()
                if (aname > bname){
                    return 1
                } else if (aname < bname){
                    return -1
                }
            })]
            setActiveSortType(obj.type)
            setUsers(newUsers)
        }
    },[])


    return (
        <div className="book">
            <div className="book__sidebar">
                <Users
                    onClickItem={profile => {
                        history.push('/')
                        setUserId(history.location.pathname.split('/')[1])
                    }
                    }
                    ///*if pathname equal '/' , active is true*/
                    items={[{
                        active: history.location.pathname === '/',
                        icon: (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                                    fill="black"
                                />
                            </svg>
                        ),
                        name: 'All users'
                    }
                    ]}
                />
                {users ? (
                    <Users
                        items={users}
                        onClickItem={profile => {
                            history.push(`/users/${profile.id}`)
                            setUserId(history.location.pathname.split('users/')[1])
                            //setUserId(profile.id)
                        }}
                        activeItem={activeItem}
                    />
                )
                : 'Загрузка...'
                }

            </div>
            {/*Display Component in dependent of url*/}
            <div className="book__profile">
                <Route path={"/users/:id"}>
                    {users && activeItem && <Profile
                        profile={activeItem}
                        onEditeDataContacts={editeDataContacts}
                        onEditeDataAddress={editeDataAddress}
                        onEditeDataCompany={editeDataCompany}
                    />
                    }
                </Route>
                <Route exact path={"/"}>
                    <div className="book__top">
                        {/*Use popup for choose method of sort*/}
                        <SortPopup items={sortItems} onClickSortType={onSelectSort}
                                   activeSortType={activeSortType}/>
                    </div>
                    <div className="book__content">
                    {users &&
                    users.map((user,index) =>
                    <User key={index}
                          onClickItem={onClickUser}
                          {...user}/>)}
                    </div>
                </Route>
            </div>
        </div>
    );
}

export default App;
