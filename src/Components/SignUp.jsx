import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';


function SignUp() {


    const [name,setName] = useState("");

    const [phone,setPhone] =  useState("");
    const [email,setEmail] =  useState("");
    const [pass,setPass] = useState("");


    const [phoneWarning, setPhoneWarning] = useState("")
    const [emailWarning, setEmailWarning] = useState("")
    const [passwWarning, setPassWarning] = useState("")

    const [passwordVisible, setPasswordVisible] = useState(false);
  

    const  toLogin = useNavigate();

    const register = async (e) => {
        e.preventDefault();
      
        let datas = { name };
        let hasError = false;
      
        try {
          if (!name || !phone || !email || !pass) {
            alert('Please Fill every column');
            return;
          } else {
            if (phone) {
              if (phone.length !== 10 || isNaN(phone)) {
                setPhoneWarning('Enter a valid Number');
                hasError = true;
                setPhone('')
              } else {
                datas = { ...datas, phone };
              }
            }
      
            if (email) {
              if (!email.includes('@gmail.com')) {
                setEmailWarning('Enter a valid Email');
                setEmail("")
                hasError = true;
              } else {
                datas = { ...datas, email };
              }
            }
      
            if (pass) {
              if (pass.length < 6) {
                setPassWarning('At least 6 characters');
                hasError = true;
                setPass('')
              } else {
                datas = { ...datas, pass };
              }
            }
      
            if (!hasError) {
        
              
              const userData = JSON.parse(localStorage.getItem('userData')) || [];
              localStorage.setItem('userData', JSON.stringify([...userData, datas]));
    
              toLogin('/LogIN');
            }
          }
        } catch (err) {
          console.log('Error Occurred: ' + err);
        }
      };


       //  password show and hide 

  function passworsVisibility(){
    setPasswordVisible((prevVisibility) => !prevVisibility);
  }

  return (
    <div className="signUpContainer">
        <div className='signUp'>
            <h2 className="text-center text-sm-start">Create Account</h2>
            <form onSubmit={register} autoComplete='off'>

        <div>
            <label htmlFor="inputName">
                Name
            </label>
                <input type="text"
                placeholder='First and last name'
                id='inputName'
                value={name}
              
                onChange={(e)=>setName(e.target.value)}
                // required
                />
        </div>

<div>
    
            <label htmlFor="inputNum">
                Phone
            </label>
                <input type="tel"
                placeholder='Ten Digits'
                id="inputNum"
                maxLength={10}
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                // required
                />
                 <p className='mt-1 text-danger'>{phoneWarning}</p>
</div>

        <div>
            <label htmlFor='inputEmail'>
                Email
            </label>
                <input type="email"
                value={email}
                id='inputEmail'
                onChange={(e)=>setEmail(e.target.value)}
                // required
                />
                <p className='mt-1 text-danger'>{emailWarning}</p>
        </div>

        <div  className='password-input-container'>
            <label htmlFor='inputPass'>
                Password
            </label>
                <input type={passwordVisible ?  'text' : 'password'}
               placeholder='Atleast 6 characters'
                id='inputPass'
                value={pass}
                onChange={(e)=>setPass(e.target.value)}
                // required
                />
                {
                  pass ? (
                    <span 
                    className={`bi ${passwordVisible ? "bi-eye-slash" : "bi-eye"} signupShowPass`}
                    onClick={passworsVisibility}></span>

                  ) : null
                }
                <p className='mt-1 text-danger'>{passwWarning}</p>
        </div>

        <button type='submit' className='btn btn-warning w-100'>Register</button>
            </form>
        <p className='mt-2'> 
            Already Have An Account? <Link to='../LogIn' id='toLogin'>LogIn</Link>
        </p>

       

        </div>
    </div>
  )
}

export default SignUp