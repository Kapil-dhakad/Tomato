import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { food_list, addToCart, removeFromCart, cartItems } = useContext(StoreContext);

  const food = food_list.find(item => item._id === id);

  const [selectedImage, setSelectedImage] = useState(food ? food.image : '');

  if (!food) return <p>Loading...</p>;

  const images = food.images || [food.image];

  return (
    <div className="food-details-container">
      
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>

      <div className="food-details-inner">
        <div className="food-images-section">
          <img src={selectedImage} alt={food.name} className="food-main-image" />

          <div className="food-thumbnails">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${food.name}-${idx}`}
                className={`thumbnail ${img === selectedImage ? 'selected' : ''}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="food-info-section">
          <h1>{food.name}</h1>
          <p className="food-description">{food.description}</p>
          <p className="food-price">${food.price}</p>

          <div className="food-details-cart">
            {!cartItems[id] ? (
              <button className="add-btn" onClick={() => addToCart(id)}>
                Add to Cart
              </button>
            ) : (
              <div className="counter">
                <button className="minus-btn" onClick={() => removeFromCart(id)}>-</button>
                <span>{cartItems[id]}</span>
                <button className="plus-btn" onClick={() => addToCart(id)}>+</button>
              </div>
            )}

            {/* Buy Now Button */}
            <button
              className="buy-now-btn"
              onClick={() => {
                if (!cartItems[id]) addToCart(id);
                navigate('/cart');
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
