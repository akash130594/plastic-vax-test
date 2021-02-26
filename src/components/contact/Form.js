import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { getFirebase } from "../../util/firebase-provider";
import {email} from '../../../static/admin/email-templates/contact-us'
import './Form.scss'
var axios = require('axios')

class Form extends React.Component {
    static defaultProps = {
      name: 'Simple Form Ajax',
      subject: '', // optional subject of the notification email
      action: '',
      successMessage: 'Thanks for your enquiry, we will get back to you soon',
      errorMessage:
        'There is a problem, your message has not been sent, please try contacting us via email'
    }
  
    state = {
      alert: '',
      disabled: false,
      submit: false,
      name: "",
      emailAddress: "",
      type: "",
      errors: {},
      message: "",
      database: null,
    }
  
    handleInputChange = event => {
      const target = event.target
      const value = target.value
      const name = target.name
      let errors = this.state.errors;
      errors[name] = "";
      this.setState({
        [name]: value,
        errors: errors
      })
    }

    handleValidation = () => {
      let errors = []
      let formValid = true;
      var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if(this.state.emailAddress.length === 0){
          formValid = false;
          errors['emailAddress'] = 'Email Cannot be Empty'
      }else if (!emailPattern.test(this.state.emailAddress)) {
          formValid = false;
          errors['emailAddress'] = 'Please enter correct email id'
      }

      if(this.state.name.length === 0){
          formValid = false;
          errors['name'] = 'Name Cannot be Empty'
      }

      if(this.state.type.length === 0){
          formValid = false;
          errors['type'] = 'Please select any topic'
      }
    

      if(this.state.message.length === 0){
        formValid = false;
        errors['message'] = 'Please provide any message'
      }else if(this.state.message.length < 30) {
        formValid = false;
        errors['message'] = 'Please provide message minimum with 30 characters'
      }
      
      
      if(formValid === false){
          this.setState({
              errors
          })
          return true
      }else{
          return false
      }
    }

  
    handleSubmit = async e => {
      e.preventDefault()
      if (this.state.disabled) return
      
      if(this.handleValidation()){
        return false;
      }

      this.setState({ disabled: true })
      const { database } = this.state;
      if(database){
        await database.collection('contact').add({
          name: this.state.name,
          email: this.state.emailAddress,
          message: this.state.message,
          enquiry: this.state.type
        });
        
        const emailTemplate = email(this.state);
        axios.post('https://at54vnof8i.execute-api.us-east-2.amazonaws.com/staging',{
          headers: {
            'Content-Type' : 'application/json',
            "Accept": "application/json"
          },
          params: {
            subject: "User Contact",
            html: emailTemplate
          }
        })
        
        // addToMailchimp(this.state.emailAddress, {
        //   FNAME: this.state.firstname,
        //   LNAME: this.state.lastname,
        //   MESSAGE: this.state.message
        // }).then(data => {
        // })
        this.setState({
          submit: true,
          alert: this.props.successMessage,
          name: "",
          emailAddress: "",
          type: "",
          message: "",
        });
      }
  
      // fetch(form.action + '?' + stringify(data), {
      //   method: 'POST'
      // })
      //   .then(res => {
      //     if (res.ok) {
      //       return res
      //     } else {
      //       throw new Error('Network error')
      //     }
      //   })
      //   .then(() => {
      //     form.reset()
      //     this.setState({
      //       alert: this.props.successMessage,
      //       disabled: false
      //     })
      //   })
      //   .catch(err => {
      //     console.error(err)
      //     this.setState({
      //       disabled: false,
      //       alert: this.props.errorMessage
      //     })
      //   })
    }
  
    componentDidUpdate() {
      const {database} = this.state
      if(!database) {
        const database = getFirebase()
        this.setState({ database: database })
      }
      const { submit } = this.state;
      if (submit) {
        setTimeout(() => {
          this.setState({ submit: !submit });
        }, 4000);
      }
  
    }
    render() {
      const { name, subject, action } = this.props
  
      return (
        <Fragment>
          <Helmet>
            <script src="https://www.google.com/recaptcha/api.js" />
          </Helmet>
          <form
            className="form-container"
            name={name}
            action={action}
            onSubmit={this.handleSubmit}
            data-netlify=""
            netlify-recaptcha=""
          >
            {this.state.alert && (
              <div className="Form--Alert">{this.state.alert}</div>
            )}
            <div className="input-container">
              <label htmlFor="name" className="input-title">Name
                </label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              <div className="error-message">{this.state.errors["name"]}</div>
            </div>
            <div className="input-container">
              <label htmlFor="email" className="input-title">Email
                </label>
                <input
                  className="input-field"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={this.state.email}
                  onBlur={this.handleInputChange}
                  name="emailAddress"
                  required
                />
              <div className="error-message">{this.state.errors["emailAddress"]}</div>
            </div>
            <div className="input-container">
              <label htmlFor="type" className="input-title">Topic
                </label>
                <select
                  className="select-input input-field"
                  name="type"
                  id="type"
                  defaultValue="Topic"
                  value={this.state.enquiry}
                  onBlur={this.handleInputChange}
                  required
                >
                  <option>
                    Select One Topic
                  </option>
                  <option>Trailer</option>
                  <option>Game</option>
                  <option>Want to say hello</option>
                </select>
              <div className="error-message">{this.state.errors["type"]}</div>
            </div>
            <div className="input-container">
              <label htmlFor="message" className="input-title">Message
                </label>
                <textarea
                  className="message-input input-field"
                  placeholder="Message"
                  name="message"
                  id="message"
                  rows="10"
                  required
                  value={this.state.message}
                  onChange={this.handleInputChange}
                />
              <div className="error-message">{this.state.errors["message"]}</div>
            </div>
            <div
              className="g-recaptcha"
              data-sitekey="6Lfjni0aAAAAANeHNnhN8Uqi6e0YIUZuRp5zzsio"
            />
            {!!subject && <input type="hidden" name="subject" value={subject} />}
            <input type="hidden" name="form-name" value={name} />
            <input
              className="project-btn"
              type="submit"
              value="SEND"
              disabled={this.state.disabled}
            />
          </form>
        </Fragment>
      )
    }
  }

export default Form
