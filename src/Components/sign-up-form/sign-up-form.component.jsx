import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import './sign-up-form.styles.scss'

import { createAuthUserWithEmailAndPassword ,
createUserDocumentFromAuth,} from "../../firebase/firebase.utils";

const defaultFormFields ={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUpForm =()=>{
    const [formFields, setFormFields]=useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} =formFields;

    const resetFormFields= () =>{
        setFormFields(defaultFormFields);
    };

const handleSubmt= async(event)=>{
    event.preventDefault();

    if(password !== confirmPassword){
        alert("password do not match");
        return ;
    }
    try{
        const response= await createAuthUserWithEmailAndPassword(email, password);
console.log(response);
     
    }catch(error){
       if(error.code==='auth/email-already-in-use'){
        alert('Cannot create user, email already in use.');
       }else if(error.code==='auth/weak-password'){
       alert('Password should be at least 6 characters')
       }
        else{
        console.log("user creation encounteres  an error" ,error);
    }
}
}
    const handleChange = (event)=>{
        const {name, value}=event.target;
        setFormFields ({ ...formFields,[name]:value});

    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmt} >
                
                <FormInput 
                label="Display Name" 
                required
                type="text" 
                onChange={handleChange} 
                name="displayName" 
                value={displayName} />

             
                <FormInput  
                  label="Email"
                required type="email" 
                onChange={handleChange} 
                name="email"   
                value={email}/>

       
                <FormInput  
                  label="Password"
                required type="password" 
                onChange={handleChange} 
                name="password"  
                value={password} />

                <FormInput  
                label="Confirm Password"
                required type="password" 
                onChange={handleChange}
                 name="confirmPassword" 
                  value={confirmPassword} />
                <Button buttonType='inverted' type='submit'>Sign Up </Button>
            </form>
        </div>
    )
}
export default SignUpForm ;