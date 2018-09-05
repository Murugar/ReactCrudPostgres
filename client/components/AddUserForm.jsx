import React, { Component } from 'react'
import axios from 'axios'

export default class AddUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
        const target = event.target
        const name = target.name
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit (event) {
        event.preventDefault()
        const contact = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.addToContactList(contact)
        this.setState({
            name: '',
            email: '',
            phone: ''
        })
    }

    render () {
        const handleSubmit = this.handleSubmit
        const handleChange = this.handleChange

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-horizontal">
                    <label className="col-xs-2 control-label">Add a new contact</label>
                        <div className="col-xs-8">
                            <input 
                                className="form-control"
                                type="text"
                                placeholder="Contact name"
                                onChange={handleChange}
                                name="name"
                                value={this.state.name}
                            />
                        </div>
                        <div className="col-xs-8">
                            <input 
                                className="form-control"
                                type="text"
                                placeholder="Email address"
                                onChange={handleChange}
                                name="email"
                                value={this.state.email}
                            />
                        </div>
                        <div className="col-xs-8">
                            <input 
                                className="form-control"
                                type="text"
                                placeholder="Phone number"
                                onChange={handleChange}
                                name="phone"
                                value={this.state.phone}
                            />
                        </div>
                    <button type="Submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        )
    }
}
