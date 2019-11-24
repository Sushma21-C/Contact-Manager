import React from 'react' 
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component {
    constructor() {
        super() 
        this.state = {
            username: '',
            email: '', 
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username, 
            email: this.state.email, 
            password: this.state.password
        }
       axios.post('http://localhost:3020/users/register',formData)
            .then(response =>{
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.message)
                }else{
                    this.props.history.push('/users/login')
                }
            })
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6 mb-4">
                    <div className="card">
                            <div className="card-body">                        
                                <h2 className="text-center default-text py-3"><i className="fa fa-lock"></i>Register</h2>
                                <form onSubmit={this.handleSubmit}>

                                    <div className="md-form"> 
                                    <i className="fa fa-user prefix grey-text"></i> 
                                    <input type="text" id="defaultForm-username" className="form-comntrol" value={this.state.username} onChange={this.handleChange} name="username" /> <br/>
                                    <label html-for="defaultForm-username">Username</label>
                                    </div>

                                    <div className="md-form">
                                        <i className="fa fa-envelope prefix grey-text"></i>
                                        <input type="text" id="defaultForm-email" className="form-control" value={this.state.email} onChange={this.handleChange} name="email" />
                                        <label html-for="delaultForm-email">Your email</label>
                                    </div>
                                    
                                    <div className="md-form">
                                        <i className="fa fa-lock prefix blue=text"></i>
                                        <input type="password" id="defaultForm-pass1" className="form-control" value={this.state.password} onChange={this.handleChange} name="password" />
                                        <label html-for="defaultForm-pass1">Your password</label>
                                    </div>
                                    <div className="text-center">
                                    <button onClick={this.handleClick}className="btn btn-primary">Next</button>
                                    </div>    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register