import React, { Fragment }from 'react'
import Helmet from 'react-helmet'
import { getFirebase } from "../../util/firebase-provider";
import {navigate} from 'gatsby'
import {email} from '../../../static/admin/email-templates/job-post'
import './content-form.scss'
import loadable from '@loadable/component'
const Fade = loadable(() => import('../transition/Fade'))

var axios = require('axios');


class Form extends React.Component {
    _isMounted = false;
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
        errors: {},
        disabled: false,
        submit: false,
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        available: '',
        jobKnowledge: '',
        referrer: '',
        workedBefore: '',
        discipline: '',
        workingStatus: '',
        preferredLocation: '',
        database: null,
        jobKownBy: '',
        resume: '',
        cover: '',
        position: this.props.position
      }
      
      handleValidation = () => {
        let errors = []
        let formValid = true;
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(this.state.email.length === 0){
            formValid = false;
            errors['email'] = 'Email Cannot be Empty'
        }else if (!emailPattern.test(this.state.email)) {
            formValid = false;
            errors['email'] = 'Please enter correct email id'
        }

        if(this.state.firstname.length === 0){
            formValid = false;
            errors['firstname'] = 'Firstname Cannot be Empty'
        }
        if(this.state.lastname.length === 0){
            formValid = false;
            errors['lastname'] = 'Lastname Cannot be Empty'
        }

        if(this.state.phone.length === 0){
            formValid = false;
            errors['phone'] = 'Phone Number Cannot be Empty'
        }
        
        if(this.state.location.length === 0){
            formValid = false;
            errors['location'] = 'Location Number Cannot be Empty'
        }

        if(this.state.available.length === 0){
            formValid = false;
            errors['available'] = 'Please let us know when are you available for the '
        }
        if(this.state.jobKnowledge.length === 0){
            formValid = false;
            errors['jobKnowledge'] = 'Please let us know how did you got to know about the job '
        }

        if(this.state.workedBefore.length === 0){
            formValid = false;
            errors['workedBefore'] = 'Please select yes or no '
        }

        if(this.state.workingStatus.length === 0){
            formValid = false;
            errors['workingStatus'] = 'Please select Working Status '
        }

        if(this.state.resume.length === 0){
            formValid = false;
            errors['resume'] = 'Please provide the link for your resume '
        }
        
        if(this.state.jobKownBy === "employee" && this.state.referrer.length === 0){
            formValid = false;
            errors['referrer'] = 'Please Provide Empoyee Name '
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

        if(name === 'jobKnowledge' && value === "Plastic Wax Employee") {
          this.setState({
            jobKownBy: "employee"
          })
        }
      }
    
      handleSubmit = async e => {
        e.preventDefault()
        if(this.handleValidation()) {
            return false;
        }
        if (this.state.disabled) return
      
        this.setState({ disabled: true })
        
        const { database } = this.state;
        const emailTemplate = email(this.state);
        if(database){
          await database.collection('jobPost').add({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            message: this.state.message,
            phone: this.state.phone,
            location: this.state.location,
            linkedin: this.state.linkedin,
            available: this.state.available,
            jobKnowledge: this.state.jobKnowledge,
            referrer: this.state.referrer,
            workedBefore: this.state.workingStatus,
            discipline: this.state.discipline,
            workingStatus: this.state.workingStatus,
            preferredLocation: this.state.preferredLocation,
            resume: this.state.resume,
            cover: this.state.cover,
          });
          axios.post('https://at54vnof8i.execute-api.us-east-2.amazonaws.com/staging',{
            headers: {
              'Content-Type' : 'application/json',
              "Accept": "application/json"
            },
            params: {
              subject: `Application for ${this.props.position}`,
              html: emailTemplate
            }
          });
          // this.setState({
          //   submit: true,
          //   alert: this.props.successMessage,
          //   firstname: '',
          //   lastname: '',
          //   email: '',
          //   phone: '',
          //   location: '',
          //   linkedin: '',
          //   available: '',
          //   jobKnowledge: '',
          //   referrer: '',
          //   workedBefore: '',
          //   discipline: '',
          //   workingStatus: '',
          //   preferredLocation: '',
          //   jobKownBy: '',
          //   resume: '',
          //   cover: ''
          // });
          navigate('/success')
          // addToMailchimp(this.state.emailAddress, {
          //   FNAME: this.state.firstname,
          //   LNAME: this.state.lastname,
          //   MESSAGE: this.state.message,
          //   GENDER: this.state.gender,
          // }).then(data => {
          // })
        }
      }
      
      componentDidUpdate() {
        this._isMounted = true;
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

      componentWillUnmount() {
        this._isMounted = false;
      }

      
      render() {
        const { name, subject, action } = this.props
    
        return (
          <Fragment>
            <Helmet>
              <script src="https://www.google.com/recaptcha/api.js" />
            </Helmet>
            <div className="form-main-container" id="common-px">
              <Fade timeout={3000}>
                <form
                  className="content-form-container"
                  name={name}
                  action={action}
                  onSubmit={this.handleSubmit}
                  data-netlify=""
                  netlify-recaptcha=""
                >
                  {this.state.alert && (
                    <div className="Form--Alert">{this.state.alert}</div>
                  )}

                  <p className="additional-text">Apply for this job</p>
                  <div className="input-container">
                    <label htmlFor="firstName" className="input-title">
                      First name <span className="label-star">*</span>
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Firstname"
                      id="firstName"
                      name="firstname"
                      value={this.state.firstname}
                      onChange={this.handleInputChange}
                      required
                    />
                    <div className="error-message">
                      {this.state.errors['firstname']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="lastName" className="input-title">
                      Last name <span className="label-star">*</span>
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Lastname"
                      id="lastName"
                      name="lastname"
                      value={this.state.lastname}
                      onChange={this.handleInputChange}
                      required
                    />
                    <div className="error-message">
                      {this.state.errors['lastname']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="emailId" className="input-title">
                      Email <span className="label-star">*</span>
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Enter Your Email"
                      id="emailId"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                      required
                    />
                    <div className="error-message">
                      {this.state.errors['email']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="phone" className="input-title">
                      Phone <span className="label-star">*</span>
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Enter Your phone"
                      id="phone"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleInputChange}
                      required
                    />
                    <div className="error-message">
                      {this.state.errors['phone']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="location" className="input-title">
                      Location <span className="label-star">*</span>
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Enter Your City"
                      name="location"
                      id="location"
                      value={this.state.location}
                      onChange={this.handleInputChange}
                      required
                    />
                    <div className="error-message">
                      {this.state.errors['phone']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="resume" className="input-title">
                      Resume/CV <span className="label-star">*</span>
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Paste Link Here"
                      id="resume"
                      name="resume"
                      value={this.state.resume}
                      onChange={this.handleInputChange}
                      required
                    />
                    <div className="error-message">
                      {this.state.errors['resume']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="cover" className="input-title">
                      Resume/CV <span className="label-star">*</span>
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Paste Link Array"
                      name="cover"
                      id="cover"
                      value={this.state.cover}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <p className="additional-text">ADDITIONAL INFORMATION</p>
                  <div className="input-container">
                    <label htmlFor="linkedin" className="input-title">
                      Linkedin Profile
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Paste Link Here"
                      id="linkedin"
                      name="linkedin"
                      value={this.state.linkedin}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="available" className="input-title">
                      When are you available to start work?{' '}
                      <span className="label-star">*</span>
                    </label>
                    <select
                      className="input-field"
                      name="available"
                      id="available"
                      value={this.state.startWork}
                      onBlur={this.handleInputChange}
                      required
                    >
                      <option>Select One</option>
                      <option value="immediate">Immediate</option>
                      <option value="15 days">15 days</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months">2 Months</option>
                      <option value="3 Months">3 Months</option>
                    </select>
                    <div className="error-message">
                      {this.state.errors['available']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="jobKnowledge" className="input-title">
                      How did you hear about this job?{' '}
                      <span className="label-star">*</span>
                    </label>
                    <select
                      className="input-field"
                      name="jobKnowledge"
                      id="jobKnowledge"
                      value={this.state.jobKnowledge}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option>Select One</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Job Portal">Job Portal</option>
                      <option value="Friend">Friend</option>
                      <option value="Plastic Wax Employee">
                        Plastic Wax Employee
                      </option>
                    </select>
                    <div className="error-message">
                      {this.state.errors['jobKnowledge']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="referrer" className="input-title">
                      If employee referral, which Plastic wax employee referred
                      you to this position?
                    </label>
                    <input
                      className="input-field"
                      type="text"
                      placeholder="Enter employee name and lastname"
                      id="referrer"
                      name="referrer"
                      value={this.state.referrer}
                      onChange={this.handleInputChange}
                    />
                    <div className="error-message">
                      {this.state.errors['referrer']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="workedBefore" className="input-title">
                      Have you worked at plastic wax before?{' '}
                      <span className="label-star">*</span>
                    </label>
                    <select
                      className="input-field"
                      id="workedBefore"
                      name="workedBefore"
                      value={this.state.workedBefore}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option>Select One</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <div className="error-message">
                      {this.state.errors['workedBefore']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="discipline" className="input-title">
                      Preferred Discipline 1
                    </label>
                    <select
                      className="input-field"
                      name="discipline"
                      id="discipline"
                      value={this.state.discipline}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option>Select One</option>
                      <option value="Discipline 1">Discipline 1</option>
                      <option value="Discipline 2">Discipline 2</option>
                      <option value="Discipline 3">Discipline 3</option>
                    </select>
                  </div>
                  <div className="input-container">
                    <label htmlFor="workingStatus" className="input-title">
                      {' '}
                      What is working status in{' '}
                      {this.props.location === 'Sydney'
                        ? 'Australia'
                        : 'USA'}{' '}
                      <span className="label-star">*</span>
                    </label>
                    <select
                      className="input-field"
                      name="workingStatus"
                      id="workingStatus"
                      value={this.state.workingStatus}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option>Select One</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                    </select>
                    <div className="error-message">
                      {this.state.errors['workingStatus']}
                    </div>
                  </div>
                  <div className="input-container">
                    <label htmlFor="preferredLocation" className="input-title">
                      If you are also interested in suitable future
                      opportunities, which is your preferred work location?{' '}
                    </label>
                    <select
                      className="input-field"
                      name="preferredLocation"
                      id="preferredLocation"
                      value={this.state.preferredLocation}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option>Select One</option>
                      <option value="Sydney">Sydney</option>
                      <option value="Los Angeles">Los Angeles</option>
                    </select>
                  </div>
                  <div className="input-container">
                    <label htmlFor="message" className="input-title">
                      Message
                    </label>
                    <textarea
                      className="input-field"
                      placeholder="Message"
                      name="message"
                      id="message"
                      rows="10"
                      required
                      value={this.state.message}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div
                    className="g-recaptcha"
                    data-sitekey="6Lfjni0aAAAAANeHNnhN8Uqi6e0YIUZuRp5zzsio"
                  />
                  {!!subject && (
                    <input type="hidden" name="subject" value={subject} />
                  )}
                  <input type="hidden" name="form-name" value={name} />
                  <input
                    className="project-btn"
                    type="submit"
                    value="Submit Application"
                    disabled={this.state.disabled}
                  />
                </form>
              </Fade>
            </div>
          </Fragment>
        )
      }
}

export default Form