// TODO : this composant will be developed for the V2

import React from 'react';



// form function reusable

function Field ({name, value, placeholder, onChange, children})  {
    return <div className="form-group">
       <label htmlFor={name}>{children}</label>
       <input type="text" value={value} placeholder = {placeholder} onChange={onChange} id={name} name={name} className="form-control"/>
       </div>
}

function Checkbox ({name, value, onChange, children}) {
    return <div className = "form-check">
        <input type ="checkbox" onChange = {onChange} id = {name} className = "form-control"/>
        <label htmlFor= {name} className = "form-check-label">{children}</label> 
    </div>
}

// Using class 

class ContactForm extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            nom:'',
            prenom:'',
            newsletter:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


handleChange = (event) => {
    const name = event.target.name
    const type = event.target.type
    const value = type === 'checkbox' ? event.target.checked : event.target.value
    this.setState({
        [name]: value
    })
}

handleSubmit = (event) => {
    event.preventdefault()
    // const data = JSON.stringify(this.state)
    // console.log(data)
    this.setState({
        nom: '',
        prenom: '',
        courriel: ''
    })
}

// generating a form getting values for the different fields 

render() {
    return (
      <form className="contact-form">
         <Field 
         name="nom"
         placeholder ="nom"
         value={this.state.nom} 
         onChange={this.handleChange}>Nom</Field>

         <Field 
         name="prenom" 
         placeholder ="prenom"
         value={this.state.prenom} 
         onChange={this.handleChange}>Prémom</Field>

         <Field 
         name="courriel" 
         placeholder ="courriel"
         value={this.state.courriel} 
         onChange={this.handleChange}>Courriel</Field>

         <Checkbox 
         name="newsletter" 
         value ={this.state.newsletter} 
         onChange = {this.handleChange}>S'abonner à la newsletter de l'établissement
         </Checkbox>

         <div className ="form-group">   
         <button className ="btn btn-primary">Envoyer</button>
         </div>
         {JSON.stringify(this.state)}
      </form>
    )}
};


export default ContactForm;