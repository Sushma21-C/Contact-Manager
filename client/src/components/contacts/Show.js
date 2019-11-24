import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'


class ContactShow extends React.Component{
    constructor(){
        super()
        this.state={
            contact: {}
        }
    }

    handleRemove =()=>{
        const id = this.props.match.params.id
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove){
            axios.delete(`http://localhost:3020/contacts/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response.data)
            this.props.history.push('/contacts')
            })
        }
        
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/contacts/${id}`,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const contact = response.data
            console.log(contact)
            this.setState({contact})
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        //console.log(this.props.match.params.id)
        const id = this.props.match.params.id
        return(
            <div>
                <h3>Contact Show Page</h3>
                <p>{this.state.contact.name},
                {this.state.contact.email},
                {this.state.contact.mobile}</p>
                
                
                <Link to={`/contacts/edit/${id}`}>Edit</Link> |
                <button onClick={this.handleRemove}>Delete </button>
                <Link to="/contact">back</Link>
                
            </div>
        )
    }
}

export default ContactShow