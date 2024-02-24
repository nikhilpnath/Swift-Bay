import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { NavHead, Products, dataContext, Footer } from "./";

function Home() {
  const { addToCart, setAddToCart, updatedProducts, setUpdatedProducts } =
    useContext(dataContext);

  const [search, setSearch] = useState("");

  // categorizing and searching

  const filtering = (categories) => {
    const filteredProducts = Products.filter(({ category }) => {
      return category.includes(categories.toLowerCase());
    });

    setUpdatedProducts(filteredProducts);
  };

  function searchedProduct(e) {
    e.preventDefault();

    try {
      if (search) {
        const result = Products.filter(({ name, category }) => {
          return (
            name.toLowerCase().includes(search.toLowerCase()) ||
            category.includes(search.toLowerCase())
          );
        });

        console.log(result);

        if (result.length === 0) {
          alert("No Product Found");
          setSearch("");
        } else {
          setUpdatedProducts(result);
          setSearch("");
        }
      } else {
        alert("Enter Something");
      }
    } catch (error) {
      console.log("error occurred" + error);
    }
  }

  // Add to cart

  const handleAddToCart = (event, index) => {

    event.preventDefault(); //it prevent  the links

    //finding our single product from the group of array

    const cartProduct = updatedProducts.find((item) => {
      return item.id === index;
    });

        setAddToCart((prev) => [...prev, cartProduct]);
    }


  return (
    <div className="homeContainer">
      <NavHead />

      {/* intro */}

      <div className="intro-content my-4 my-sm-5">
        <h2>Buy More</h2>
        <p className="fw-bold text-uppercase">" Save More "</p>
      </div>

      <div className="secondNav">
        <div className="btnGroup ">
          <button
            onClick={() => setUpdatedProducts(Products)}
            className="btn btn-dark"
          >
            All
          </button>

          <button
            onClick={() => filtering("Mobile")}
            className="btn btn-outline-primary"
          >
            Mobile
          </button>

          <button
            onClick={() => filtering("laptop")}
            className="btn btn-outline-danger"
          >
            Laptop
          </button>

          <button
            onClick={() => filtering("Headphone")}
            className="btn btn-outline-success"
          >
            Headphone
          </button>

          <button
            onClick={() => filtering("Smart watch")}
            className="btn btn-outline-warning"
          >
            Smart Watch
          </button>
        </div>

        <form
          className="SearchBar text-center w-100"
          autoComplete="off"
          onSubmit={(e) => searchedProduct(e)}
        >
          <input
            type="text"
            placeholder="Search Products"
            className="w-50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="btn btn-success">
            <span className="bi bi-search"></span>
          </button>
        </form>
      </div>

      <div className="cards">
        {updatedProducts.map((item) => (
          <div key={item.id} className="Productcard">
            <Link
              to={item.id && `/home/${item.id}`}
              className="text-dark text-decoration-none"
            >
              <div className="cardImg">
                <img src={item.img} alt={item.name} loading="lazy" />
              </div>
              <p id="name" className="mb-2 font-monospace fs-5">
                {item.name}
              </p>
              <div className="details d-sm-flex justify-content-around align-items-center">
                <div className="priceRating d-sm-block d-flex justify-content-around ">
                  <p>₹ {item.price}</p>
                  <p>
                    <span className="bi bi-star-fill text-warning me-1"></span>
                    {item.rating}
                  </p>
                </div>

                {addToCart.includes(item) ? (
                  <div className=" text-center pb-2 pb-sm-0">
                    <p className="text-success fs-5">Added To Cart <span className="bi bi-check-circle-fill"></span></p>
                  </div>
                ) : 
                (
                  <div className="addToCart  pb-2 pb-sm-0 mx-4 mx-sm-0">
                    <button
                      className="btn btn-warning px-4 w-100 w-sm-50"
                      style={{ fontSize: "18px" }}
                      onClick={(e) => handleAddToCart(e, item.id)}
                    >
                      Add To Cart
                    </button>
                  </div>
                )
                }
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
