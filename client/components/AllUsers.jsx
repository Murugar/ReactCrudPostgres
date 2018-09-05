import React, { Component } from 'react'
import axios from 'axios'
import SingleUser from './SingleUser.jsx'

export default class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({searchInput: event.target.value})
    }

    render() {
        const users = this.props.users.filter(user => {
            return user.name.toLowerCase().match(this.state.searchInput.toLowerCase())
        })

        const removeFromContactList = this.props.removeFromContactList
        const editContact = this.props.editContact
        return (
            <div>
                <form>
            <input 
                onChange={this.handleChange}
                value={this.state.searchInput}
                placeholder="Search for a contact"
            />
        </form>
                <div>
                    {users.map(user =>
                            <div>
                                <SingleUser user={user} 
                                removeFromContactList={removeFromContactList} 
                                editContact={editContact}
                                />
                            </div>
                        )}
                </div>
            </div>
        )
    }
}