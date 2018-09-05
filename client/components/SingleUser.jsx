import React, { Component } from 'react'
import axios from 'axios'

export default class SingleUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            editMode: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.switchToEditMode = this.switchToEditMode.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.user.name,
            email: nextProps.user.email,
            phone: nextProps.user.phone
        })
    }

    handleChange(event) {
        const target = event.target
        const name = target.name
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit(user, event) {
        event.preventDefault()
        const contactInfo = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        }
        this.props.editContact(user.id, contactInfo)
        this.setState({
            editMode: false
        })
    }

    switchToEditMode(userId) {
        this.setState({ editMode: true })
    }

    render() {
        const user = this.props.user
        const removeFromContactList = this.props.removeFromContactList
        const handleChange = this.handleChange
        const handleSubmit = this.handleSubmit
        let contactDisplay

        if (this.state.editMode) {
            contactDisplay =
                <div>
                    <form className="form-horizontal" onSubmit={(event) => handleSubmit(user, event)}>
                        <label className="col-xs-2 control-label">Edit this contact</label>
                        <div className="col-xs-10">
                            <input
                                className="form-control"
                                type="text"
                                placeholder={user.name}
                                onChange={handleChange}
                                name="name"
                                value={this.state.name}
                            />
                        </div>
                        <div className="col-xs-10">
                            <input
                                className="form-control"
                                type="text"
                                placeholder={user.email}
                                onChange={handleChange}
                                name="email"
                                value={this.state.email}
                            />
                        </div>
                        <div className="col-xs-10">
                            <input
                                className="form-control"
                                type="text"
                                placeholder={user.phone}
                                onChange={handleChange}
                                name="phone"
                                value={this.state.phone}
                            />
                        </div>
                        <button type="Submit">Save</button>
                    </form>
                </div>
        } else {
            contactDisplay =
                <div>
                    <div className="contact-box">
                        <div>
                            <h2>{user.name}</h2>
                            <h4>{user.email}</h4>
                            <h4>{user.phone}</h4>
                            <button onClick={(event) => this.switchToEditMode(user.id, event)}>Edit</button>
                            <button onClick={(event) => removeFromContactList(user.id, event)}>Delete</button>
                        </div>
                    </div>
                </div>
        }
        return (
            contactDisplay
        )
    }
}