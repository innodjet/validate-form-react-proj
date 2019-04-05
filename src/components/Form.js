import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Message from './Message'

var emailvalidator = require("email-validator");
var phone = require('phone-regex');
var validator = require('validator');

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmailValid: false,
            isNameValid: false,
            isPhoneValid: false,
            isUrlValid: false,
            name: '',
            email: '',
            phone: '',
            url: '',
            message: 'Form is Incomplete!'
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    validation = (event) => {
        event.preventDefault();
        const nameValid = (this.state.name.length >= 3 && this.state.name.length <= 30) ? true : false; 
        this.setState({ isNameValid: nameValid });
        const emailValid = emailvalidator.validate(this.state.email) ? true: false;
        this.setState({ isEmailValid: emailValid });
        const phoneValid = phone().test(this.state.phone) ? true: false;
        this.setState({ isPhoneValid: phoneValid });
        const urlValid = validator.isURL(this.state.url) ? true: false;
        this.setState({ isUrlValid: urlValid });
        if (nameValid && emailValid && phoneValid && urlValid ) {
            this.setState({
                message: 'Form is Complete!'
            });
        } else {
            this.setState({
                message: 'Form is Incomplete!'
            });
        }
    }

    render() {
        return (
            <div className="row">
            <h1 className="text-center">Form Validation</h1>
            <form onSubmit={this.validation}>
                <h3>Name: 
                </h3>
                <input className="name" 
                       name="name"
                       placeholder="Enter your name" 
                       value={this.state.name}
                       onChange={this.handleInputChange}
                />
                <h3>Email: 
                </h3>
                <input  className="email" 
                        name="email" 
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                />
                <h3>Phone: 
                </h3>
                <input className="phone" 
                       name="phone" 
                       placeholder="Enter your phone"
                       value={this.state.phone}
                       onChange={this.handleInputChange}
                />
                <h3>Blog URL: 
                </h3>
                <input  className="url" 
                        name="url" 
                        placeholder="Enter your blog url"
                        value={this.state.url}
                        onChange={this.handleInputChange}      
                />
                <div className="small-6 small-centered text-center columns">
                    <a href="#" 
                       onClick={this.validation} 
                       className="button success expand round text-center">Verify</a>
                </div>
            </form>
            <Message message={this.state.message}></Message>
        </div>);
    }
}

export default Form;
