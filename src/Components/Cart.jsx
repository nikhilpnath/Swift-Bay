import React, { useContext } from "react";
import { Link } from "react-router-dom";

import {dataContext, NavHead, Footer} from './'


function Cart() {

  const { addToCart, setAddToCart } = useContext(dataContext);


  
   // Function to remove commas from a string and convert it to a number
   const removeCommas = (price) => 
       price && parseFloat(price.replace(/,/g, ""));


  //handle the quantity
  function handleQuantity(e,id){


    const updatedQty = parseInt(e.target.value)

    const newQty = addToCart.map((item)=>{
      return item.id === id ? {...item,qty:updatedQty} : item
    })

    setAddToCart(newQty)
  }

  const preventLink = (event)=>{
    event.preventDefault();
  }

 

  // Calculate the total amount
  const totalAmount = addToCart.reduce(
    (total, item) => total + (item.qty * removeCommas(item.price)),
    0
    //the zero is the starting value, thats is at the begging the total === 0 and it gets increased
  );

  function removeItem(index) {
    const removeConfirm = window.confirm(
      "Are you sure you want to remove this item ?"
    );

    if (removeConfirm) {
      const removedItem = addToCart.filter((item) => {
        return item.id !== index;
      });

      setAddToCart(removedItem);
     
    }
  }

  //calculate total items

  const  totalItems = addToCart.reduce((total, item) =>  total + item.qty, 0)

  return (
    <div className="cartContainer">
      <NavHead />

      <p className="cartCount"> {addToCart.length}</p>

      {addToCart && addToCart.length > 0 ? (

        <div className="cards cartCards ">
          {addToCart.map((item) => (

            <div key={item.id} className="Productcard">
              <Link 
               to={item.id && `/home/${item.id}`} 
               className="text-dark text-decoration-none">


              <div  className="text-danger close-btn-icon">
                <span className="bi bi-x-circle-fill " onClick={() => removeItem(item.id)}></span>
              </div> 


              <div className="cardImg">
                <img src={item.img} alt={item.name} loading="lazy"/>
              </div>

              <p id="cartName" className="mb-2 font-monospace fs-5">{item.name}</p>

              <div className="details d-sm-flex flex-wrap justify-content-around text-center pb-sm-0 pb-2">
                <div className="price">
                  <p>₹ {item.price}</p>
                </div>

                <div className="Quantity mb-3 mb-sm-0" >
                  <label htmlFor="quantity">Qty</label>

                  <select name="quantity" id="quantity"

                   onChange={(e) => {handleQuantity(e,item.id) }} 
                   onClick={preventLink} >


                    <option value="1"></option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>

            <p className="text-success">Amount : {removeCommas(item.price) * item.qty}</p>
              </div>
              </Link>
             
            </div>
          ))}
        </div>
      ) : (
        <div className="d-block text-center mt-3">
          <h1>Your SwiftBay Cart is empty.</h1>
          <img
            src="/Images/EmptyCart.png"
            alt="cart is empty"
            className="img-fluid"
            width={700}
          />
        </div>
      )}

      <div className="bottom text-center mb-4">
        <p className="fs-4">
          Subtotal ({totalItems}) : ₹ {totalAmount.toFixed(2)}
        </p>
        <button className="btn btn-warning fs-5">Proceed To Buy</button>
      </div>

      <Footer />

    </div>
  );
}

export default Cart;
