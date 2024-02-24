import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";


import {dataContext} from "./";

function Admin() {
  const storedUserData = JSON.parse(localStorage.getItem("userData")) || []; //registered users

  const { products, setProducts , updatedProducts, setUpdatedProducts} = useContext(dataContext);
 

  const [userList, setUserList] = useState([]);

  const [editedPrice, setEditedPrice] = useState("");
  const [editedRating, setEditedRating] = useState("");

  const [editIndex, setEditIndex] = useState(null);


  

  function listUsers() {
    setUserList(storedUserData);
  }

  function removeUser(index) {
    let remove = window.confirm("Do you want to remove this user?");

    if (remove) {
      const usersToRemove = userList.filter((user, userIndex) => {
        return userIndex !== index;
      });
      setUserList(usersToRemove);
      localStorage.setItem("userData", JSON.stringify(usersToRemove));
    }
  }

  function handleSave(index) {
    const updatedOnes = [...products];
    updatedOnes[index] = {
      ...updatedOnes[index],
      price: editedPrice,
      rating: editedRating,
    };

    setProducts(updatedOnes);

    setEditIndex(null);

    setUpdatedProducts(updatedOnes);
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditedPrice(products[index].price);
    setEditedRating(products[index].rating);
  }

  function handleRemove(index) {
    const removeItem = products.filter((items) => items.id !== index);
    setProducts(removeItem);

    setUpdatedProducts([...removeItem, updatedProducts]);
  }

  return (
    <div>
      <div className="d-flex justify-content-between mx-3 mx-sm-5 my-3">
        <h1>Greetings Nikhil</h1>
        <Link to="/Home" className="fs-4 align-center align-sm-start">
          Home
        </Link>
      </div>

      <div className="text-center">
        <button onClick={() => listUsers()} className="btn btn-success">
          List Out The Users
        </button>
      </div>

      <div className="d-flex flex-wrap justify-content-around mx-2">
        {userList.map((item, index) => (
          <div
            key={index}
            className="border border-primary border-3 my-3 px-2 px-sm-5 py-3 text-center "
          >
            <h2 className="text-capitalize">Name : {(item.name)}</h2>
            <h2>Phone: {item.phone}</h2>
            <h2>Email : {item.email}</h2>

            <button
              className="btn btn-outline-danger my-3"
              onClick={() => removeUser(index)}
            >
              Remove User
            </button>
          </div>
        ))}
      </div>

      <div className="cards">
        {products.map((item, index) => (
          <div key={index} className="Productcard">
            {editIndex === index ? (
              <div className=" editproduct py-5 ps-5">
                <label>
                  Price :
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                </label>

                <label>
                  Rating :
                  <input
                    type="text"
                    placeholder="New Rating"
                    value={editedRating}
                    onChange={(e) => setEditedRating(e.target.value)}
                  />
                </label>

                <div className="d-flex justify-content-around my-3">
                  <button
                    onClick={() => handleSave(index)}
                    className="btn btn-danger me-2 me-md-0"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleSave(null)} // Using handleSave(null) to cancel edit mode.
                    className="btn btn-primary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="cardImg">
                  <img src={item.img} alt={item.name} loading="lazy" />
                </div>
                <p id="name" className="mb-2 font-monospace fs-5">{item.name}</p>

                <div className="details d-md-flex justify-content-around align-items-center pb-2 pb-md-0">
                  <div className="priceRating d-md-block d-flex justify-content-around">
                    <p>₹ {item.price}</p>
                    <p>
                      <span className="bi bi-star-fill text-warning"></span>
                      {item.rating}
                    </p>
                  </div>

                  <div className="d-md-block text-center ">
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn btn-primary me-3 "
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn btn-danger "
                    >
                      Remove
                    </button>


                  </div>

                   

                </div>
              </>
            )}
          </div>
        ))}
      </div>

 
    
    </div>
  );
}

export default Admin;
