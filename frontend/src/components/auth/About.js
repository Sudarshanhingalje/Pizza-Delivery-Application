import React from 'react';
import './About.css';

const AboutUs = () => {
  return (
    <div className="about">

      <div className="about-header">
        <h2>About Our Pizza Management System 🍕</h2>
      </div>


      <div className="content-container">
        <div className="text-content">
          <p>
            Welcome to Pizza House, your one-stop solution for managing and ordering your favorite pizzas.
            Our platform helps users easily log in, place orders, track delivery, and even become part of our
            exclusive pizza family! For restaurant owners, we offer admin features to manage orders, menus,
            and customer interactions efficiently.
          </p>
          <p>
            At Pizza House, we believe in the power of personalization. That's why we've introduced the
            Custom Pizza Maker feature! 🍕✨ With this, you can create your dream pizza by choosing from a
            variety of crusts, sauces, toppings, and cheeses. Whether you prefer a classic Margherita
            or a pizza loaded with exotic toppings, the choice is yours! Once your custom pizza is ready,
            you can easily place your order, and we'll deliver it fresh and hot to your doorstep.
          </p>
          <p>
            Join us on this delicious journey where you can customize, create, and savor the perfect pizza,
            tailored just the way you like it! 🍕🎉
          </p>
        </div>
        <div className="image-container">
          <img src="/images/about.png" alt="about pizza" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
