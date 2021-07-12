import React, { Component } from 'react'
import axios from 'axios';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state = {
        users: [],
        selectedUser: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false,
        _id: ''
    }

    componentDidMount = async() =>{
        const res = await axios.get('http://localhost:4000/api/users')
        this.setState({users: res.data.map(user => user.username), userSelected: res.data[0].username})

        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
            this.setState ({
                title: res.data.title,
                content: res.data.content,
                selectedUser: res.data.author,
                date: new Date(res.data.date),
                editing: true,
                _id: this.props.match.params.id
            })
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.selectedUser
        };
        if (this.state.editing) { 
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote)
        } else {
            await axios.post('http://localhost:4000/api/notes', newNote)
        }
        window.location.href = '/';
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
        
    }

    onChangeDate = date => {
        this.setState({date})
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear Nota</h4>

                    {/* select user */}
                    <div className="form-group">
                        <select className= "form-control" name="selectedUser" 
                        onChange={this.onInputChange} value={this.state.selectedUser}>
                            {
                                this.state.users.map(user => 
                                <option key={user} value={user}>{user}</option>)
                            }
                        </select>
                    </div>
                    <br/>
                    
                    {/* Titulo */}
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Titulo:" 
                        name="title" onChange={this.onInputChange} value={this.state.title} required/>
                    </div>
                    <br/>
                    
                    {/* Contenido */}
                    <div className="form-group">
                        <textarea name="content" className="form-control" placeholder="Contenido:" 
                        onChange={this.onInputChange} value={this.state.content} required></textarea>
                    </div>
                    <br/>
                    
                    {/* Fecha */}
                    <div className="form-group">
                        <Datepicker className="form-control" selected={this.state.date} 
                        onChange={this.onChangeDate} value={this.state.date}/>
                    </div>
                    <br/>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Guardar Nota
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
