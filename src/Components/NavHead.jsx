import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {dataContext} from "./";


function NavHead() {

  const {addToCart} = useContext(dataContext)
  

  const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
  //registred user data

  const StoredLoggedData =  JSON.parse(localStorage.getItem("loggedData")) || [];

  //logged user data 

  const { email: currentEmail, pass: currentPass } = StoredLoggedData[0] || {};
  //destructuring

  
  const loggedUserName =  storedUserData.find(
    (data) => data.email === currentEmail && data.pass === currentPass
  );

      let userName = "";

  if (loggedUserName) {
    userName = loggedUserName.name;

  }
 
 


  const twoWay = useNavigate();

  function logOut() {
    
    localStorage.setItem("loggedData", JSON.stringify({}));

    twoWay("../LogIn");
  }

  function logIn(){
    twoWay("../LogIn")
  }


  return (

    <div className=" text-white flex-wrap flex-md-nowrap sticky-top " style={{zIndex:'10'}}>

      <div className="container-fluid navbar-container py-3">
        <ul className="d-flex align-items-center mt-2 fs-5">
          <li className="mt-1">
            <Link to="/Home" className="text-decoration-none text-white d-none d-md-inline">
              Home
            </Link>
            <Link to="/Home" className=" d-inline d-md-none">
              <img src="/Images/logo.png" alt="site logo" width={45} style={{filter: "invert(1)"}}/>
            </Link>
          </li>
          <li>
            <Link to="/Cart" className="mx-3 text-decoration-none text-white position-relative">

       {/*Cart Count */}

            <p className="cartCount">   
            {
            ( addToCart && addToCart.length !== 0 ) ? addToCart.length : null
            }
           </p> 


              <span className="d-none d-sm-inline">Cart</span>
             <span style={{fontSize:"28px"}} className="bi bi-cart"></span>

            

            </Link>
          </li>
        </ul>
        
        
            <div>
        <h3 className=" d-none d-md-inline " style={{letterSpacing:"9px"}}>SWIFTBAY</h3>
            </div>
        
            
            {
              (userName) ?
          
        <>
            <div className="border border-info rounded-1 me-4 py-1 px-3 ">
              <img src="/Images/user.png" alt="Logged user" width={40}/>
              <span className="text-capitalize d-inline-block text-truncate align-middle" style={{maxWidth:'65px'}}> {userName.toLowerCase()}</span>
              <span className="bi bi-box-arrow-left ms-2 fs-4" style={{verticalAlign: "top"}} onClick={logOut} title="logout"></span>
        
            </div>
            </>
            :
            (<button onClick={logIn} className="btn btn-primary me-4">
            LogIn
            </button>)
             }
      </div>

    
        

          </div>

        

  );
}

export default NavHead;
