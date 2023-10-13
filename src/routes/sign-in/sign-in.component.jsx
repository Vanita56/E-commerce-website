// import { useEffect } from 'react';
// import { getRedirectResult} from 'firebase/auth';
// import Button from 

import {
    auth,
    signInWithGooglePopup,
    // signInWithGoogleRedirect,
    createUserDocumentFromAuth,
  } from '../../firebase/firebase.utils';
  
  import SignUpForm from '../../Components/sign-up-form/sign-up-form.component';

  const SignIn = () => {

    // useEffect(async ()=>{
    //   const response = await getRedirectResult(auth) ;
    //   if(response){
    //     const userDocRef = await createUserDocumentFromAuth(response.user);
    // };
      
    // });

    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    };

    // const logGoogleRedirectUser = async () => {
    //   const { user } = await signInWithGoogleRedirect();
    //   console.log(user);
    // };

  
    return (
      <div>
        <h1>Sign In Page</h1>
        <button buttonType='google-sign-in' onClick={logGoogleUser}>Sign in with Google Popup</button>
        {/* <button onClick={signInWithGoogleRedirect}>Sign in with google redirect </button> */}
        <SignUpForm />
      </div>
    );
  };
  
  export default SignIn;