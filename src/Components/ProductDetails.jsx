import { useContext } from "react";
import { useParams } from "react-router-dom";

import { Footer, NavHead, dataContext } from "./";

const ProductDetails = () => {
  const { id } = useParams();

  const { updatedProducts, addToCart, setAddToCart } = useContext(dataContext);

  const filtredProduct = updatedProducts.filter((item) => item.id === id);

  //get data as array of object,

  const [{ name, description, img, addonImgs, price, rating }] = filtredProduct; //destructuring array of objects

  // Function to remove commas from a string and convert it to a number
  const removeCommas = (price) => parseInt(price.replace(/,/g, ""));

  let EMI = (removeCommas(price) + 1000) / 12;

  const deliveryDate = () => {
    const currentDate = new Date();

    // Adding 8 days to the current date
    currentDate.setDate(currentDate.getDate() + 8);

    return currentDate.toDateString().slice(0, -4); // delivery date (excluding year)
  };

  const handleAddToCart = () => {
    //finding our single product from the group of array

    const cartProduct = updatedProducts.find((item) => {
      return item.id === id;
    });

    setAddToCart((prev) => [...prev, cartProduct]);
  };

  return (
    <>
      <NavHead />

      <div className="container my-5">
        <div className=" row">
          <div className="col-12 col-md-6 text-center">
            <img
              src={img}
              alt={name}
              loading="lazy"
              className="img-fluid"
              style={{ width: "430px" }}
            />
          </div>

          <div className="col-12 col-md-6">
            <h2>{`${name} - ${description}`}</h2>

            <div className="d-flex mt-3 ">
              <p className="me-5">
                <span className="bi bi-star-fill text-warning me-1"></span>
                {rating}
              </p>
              <p>
                <span className="text-primary">128 reviews </span>
                <span className="bi bi-patch-check-fill text-success"></span>
              </p>
            </div>

            <h4>
              ₹ {price}{" "}
              <span className="h6">
                ( {EMI.toFixed(2)} / M ) - Inclusive of all taxes.
              </span>{" "}
            </h4>

            <p>
              <span className="text-primary">Free Delivery</span>{" "}
              {deliveryDate()}, order within 12 hrs.
              <span className="text-primary">Details</span>
            </p>
            <h2 className="text-success">In Stock</h2>

            {/* add to cart className=" pb-2 pb-sm-0 mx-4 mx-sm-0"*/}
            {addToCart.includes(filtredProduct[0]) ? (
              <div className=" text-md-center ">
                <p className="text-success fs-4">
                  Added To Cart{" "}
                  <span className="bi bi-check-circle-fill"></span>
                </p>
              </div>
            ) : (
              <div>
                <button
                  className="btn btn-warning px-4 w-100 w-sm-50"
                  style={{ fontSize: "18px" }}
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* policy */}

        <div className="row justify-content-around  my-5">
          <div className="col-6 col-sm-3">
            <div className="icon text-center">
              <img
                loading="lazy"
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334305_small.svg?v=1682336123"
                alt="1 year Warranty"
              />
            </div>

            <div className="text-center">
              <p>
                <span className="fw-bold">1 Year</span> Warranty
              </p>
            </div>
          </div>
          <div className="col-6 col-sm-3">
            <div className="icon text-center">
              <img
                loading="lazy"
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334304_small.svg?v=1682336123"
                alt="7-Day Replacement"
              />
            </div>

            <div className="text-center">
              <p>
                <span className="fw-bold">7-Day</span> Replacement
              </p>
            </div>
          </div>
          <div className="col-6 col-sm-3">
            <div className="icon text-center">
              <img
                loading="lazy"
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334303_small.svg?v=1682336123"
                alt="Free Shipping"
              />
            </div>

            <div className="text-center">
              <p>
                <span className="fw-bold">Free</span> Shipping
              </p>
            </div>
          </div>
          <div className="col-6  col-sm-3">
            <div className="icon text-center">
              <img
                loading="lazy"
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Group_334302_small.svg?v=1682336123"
                alt="GST Billing"
              />
            </div>

            <div className="text-center">
              <p>
                <span className="fw-bold">GST</span> Billing
              </p>
            </div>
          </div>
        </div>

        {/* additional Images */}

        <div className=" row g-3 g-sm-4 g-xxl-5 align-content-center">
          {addonImgs.map((item, index) => (
            <div
              className="image col-12 col-sm-6 col-md-4 col-xxl-4"
              key={index}
            >
              <img src={item} alt={name} className="w-100 img-fluid" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
