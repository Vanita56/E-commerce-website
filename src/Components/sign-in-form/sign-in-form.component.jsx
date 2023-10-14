import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';
import './sign-in-form.styles.scss'

import { 
createUserDocumentFromAuth,
signInWithGooglePopup,
signInAuthUserWithEmailAndPassword,
} from "../../firebase/firebase.utils";

const defaultFormFields ={
    email:'',
    password:'',
}

const SignInForm =()=>{
    const [formFields, setFormFields]=useState(defaultFormFields);
    const { email, password} =formFields;

    const resetFormFields= () =>{
        setFormFields(defaultFormFields);
    };
const signInWithGoogle =async()=>{
  const {user} = await signInWithGooglePopup();
  await createUserDocumentFromAuth(user);
}

const handleSubmt= async(event)=>{
    event.preventDefault();

   
    try{
        const response= await signInAuthUserWithEmailAndPassword(email, password);
     console.log(response);
     resetFormFields();
    }catch(error){
      switch(error.code){
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/invalid-login-credentials':
          alert('Please type correct login-credentials');
          break;
        default:
          console.log(error);    
      }
}
};
    const handleChange = (event)=>{
        const {name, value}=event.target;
        setFormFields ({ ...formFields,[name]:value});

    }
    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmt} >
                     
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

                  <div className="buttons-container">
                    <Button type='submit'>Sign In </Button>
                    <Button type='button' buttonType='google-sign-in' onClick={signInWithGoogle}>
                      Google sign in
                    </Button>
                  </div>
   
            </form>
        </div>
    );
};
export default SignInForm ;