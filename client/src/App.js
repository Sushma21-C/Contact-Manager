import React from 'react'
import axios from './config/axios'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/users/Login'
import Register from './components/users/Register'

import ContactsList from './components/contacts/List'
import ContactForm from './components/contacts/Form'
import ContactEdit from './components/contacts/Edit'
import ContactShow from './components/contacts/Show'


function App(){
    function handleClick(){
        // console.log('clicked')
        axios.delete('http://localstorage:3020/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response)
            alert(response.data.notice)
            localStorage.removeItem('authToken')
            window.location.reload()
            window.location.href="/"
        })
    }
    return(
        <BrowserRouter>
        <div>
            <h1>Contact Manager</h1>
            <ul>
                {/* <li><Link to="/">Home</Link></li> */}
                <li><Link to="/Home">Home</Link></li>
                {
                    localStorage.getItem('authToken') ? (
                        <div>
                            <li><Link to="/contacts">Contacts</Link></li>
                            <li><Link to="#" onClick={handleClick}>Logout</Link></li>
                        </div>
                    ) : (
                        <div>
                            <li><Link to="/users/login">login</Link></li>
                            <li><Link to="/users/register">register</Link></li>
                        </div>
                    )
                }
                
            </ul>

            
            <Route path="/" component={Home}/> 
            <Route path="/users/register" component={Register} />
            <Route path="/users/login" component={Login} />
            <Route path="/contacts" component={ContactsList}/>
            <Route path="/contacts/form" component={ContactForm} exact={true}/>
            <Route path="/contacts/edit/:id" component={ContactEdit}/>
            <Route path="/contacts/show/:id" component={ContactShow}/>
        </div>  
        </BrowserRouter>  
    )
}

export default App;