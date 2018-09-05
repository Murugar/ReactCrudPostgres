import React, { Component } from 'react'
import axios from 'axios'
import AllUsers from './AllUsers.jsx'
import AddUserForm from './AddUserForm.jsx'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedUser: {}
        }
        this.addToContactList = this.addToContactList.bind(this)
        this.removeFromContactList = this.removeFromContactList.bind(this)
        this.editContact = this.editContact.bind(this)
    }
    componentDidMount() {
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => {
                this.setState({ users })
            })
    }

    addToContactList(contact) {
        return axios.post('/api/users', contact)
            .then(res => res.data)
            .then(newUser => {
                const contactList = this.state.users
                const newContactList = [...contactList, newUser]
                this.setState({ users: newContactList })
            })
    }

    removeFromContactList(contactId) {
        axios.delete(`/api/users/${contactId}`)
            .then(res => res.data)
            .then(() => {
                const updatedContactList = this.state.users.filter(user => {
                    return user.id !== contactId
                })
                this.setState({ users: updatedContactList })
            })
    }

    editContact(contactId, contactInfo) {
        axios.put(`/api/users/${contactId}`, contactInfo)
            .then(res => res.data)
            .then(updatedUser => {
                let newestContactList = this.state.users.map(user => {
                    if (user.id === contactId) {
                        user = updatedUser[0]
                    }
                    return user
                })
                this.setState({ users: newestContactList })
            })
    }

    render() {
        return (
            <div>
                <h2>Contact List</h2>
                <AllUsers
                    users={this.state.users}
                    removeFromContactList={this.removeFromContactList}
                    editContact={this.editContact}
                />
                <AddUserForm addToContactList={this.addToContactList} />
            </div>
        )
    }
}