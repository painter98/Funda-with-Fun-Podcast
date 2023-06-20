import React, { useState } from 'react';
import SignupForm from '../components/signupComponents/signUpForm';
import LoginForm from '../components/signupComponents/logInForm';

function Signup(){
    let [flag,setFlag] = useState(false);

    return (
        <div>
            <div className='input-wrapper'>
                {flag
                ?<>
                    <h1>Log In</h1>
                    <LoginForm/>
                    <p onClick={()=>setFlag(false)}>Don't have an Account? Signup</p>
                </>
                :<>
                    <h1>Sign Up</h1>
                    <SignupForm/>
                    <p onClick={()=>setFlag(true)}>Already have an Account? Login</p>
                </>}
            </div>
        </div>
    )
}
export default Signup;