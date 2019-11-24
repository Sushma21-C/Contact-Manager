import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom';

import ContactForm from '../contacts/Form'

class ContactsList extends React.Component{
    constructor(){
        super()
        this.state={
            contacts:[]
        }
    }
    componentDidMount(){
        axios.get('/contacts',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            const contacts = response.data
            this.setState({contacts})
        })
    }

    handleSubmit = (formData) => {
        axios.post('/contacts', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                // console.log(response.data)
                //     this.props.history.push('/contacts')

                const contact = response.data
                this.setState(prevState =>({
                    contacts:prevState.contacts.concat(contact)
                }))
            // .catch(err => {
            //     console.log(err)
            // })
    })
}

handleRemove =(id)=>{
    const confirmRemove=window.confirm("Are you sue?")
    if(confirmRemove){
        axios.delete(`/contacts/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            console.log(response.data)
            this.setState(prevState=>({
                contacts:prevState.contacts.filter(contact=>
                    contact._id != response.data._id)
            }))
        })
    }
}


render(){
        return(
            <div>
                <h1>Contact List - {this.state.contacts.length}</h1>
                <ul>
                    {this.state.contacts.map(contact=>{
                        return<li key={contact._id}><Link to={`/contacts/show/${contact._id}`}>{contact.name}</Link>
                        <button onClick={()=>{this.handleRemove(contact._id)}}>remove</button>
                        </li>
                    })}
                </ul>
                <div>
                <ContactForm handleSubmit={this.handleSubmit}/>
                </div>
            </div>    
        )
    }
}
export default ContactsList