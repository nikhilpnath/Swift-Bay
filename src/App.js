import React,{useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import {dataContext, SignUp,LogIn,Home,ProductDetails,Cart,Admin,Products} from './Components'



function App() {

  const [adminPass, setAdminPass] = useState(false)  


  const [addToCart,setAddToCart] = useState([])

  const [products,setProducts] = useState(Products)  // our data 
  const [updatedProducts, setUpdatedProducts] = useState(products)

 

  const values = {
    products,
    setProducts, // to the admin

    updatedProducts, 
    setUpdatedProducts,  // to pass the  products (updated and not updated ones to home)

    
    addToCart,
    setAddToCart,  // for the cart

    
  }


  return (
    <div >
     
     <BrowserRouter>


     <dataContext.Provider value={values}>
       <Routes>
       
          <Route path='/' element={<SignUp />}/>
          <Route path='/login' element={<LogIn setAdminPass={setAdminPass}/>}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/home/:id' element={<ProductDetails />}/>
          <Route path='/Cart' element={<Cart />}/>
          
          <Route path='/admin' element={adminPass ? <Admin /> : <LogIn setAdminPass={setAdminPass}/>}/>
       </Routes>
     </dataContext.Provider>

     </BrowserRouter>
    </div>
  );
}

export default App;
