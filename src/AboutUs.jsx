import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <h2 className="about-us-heading">About Paradise Nursery</h2>
      <p className="about-us-tagline">
        Where Green Meets Serenity &mdash; Cultivating Happiness, One Leaf at a Time.
      </p>

      <p className="about-us-description">
        At Paradise Nursery, we believe that bringing nature indoors transforms living and working spaces into sanctuaries of calm, health, and vitality. Founded by passionate botanists and plant lovers, our mission is to make plant parenthood accessible, delightful, and rewarding for everyone.
      </p>

      <div className="about-us-highlights">
        <div className="highlight-card">
          <div className="highlight-icon">🌿</div>
          <h3>Premium Quality</h3>
          <p>Every plant is hand-selected and nurtured under optimal greenhouse conditions to arrive thriving and healthy.</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">💨</div>
          <h3>Air Purifying</h3>
          <p>Carefully curated species that naturally filter toxins, boost oxygen levels, and promote cleaner indoor air.</p>
        </div>
        <div className="highlight-card">
          <div className="highlight-icon">🪴</div>
          <h3>Expert Guidance</h3>
          <p>From low-light varieties to pet-safe selections, we provide simple care instructions tailored for every plant.</p>
        </div>
      </div>

      <p className="about-us-closing">
        Whether you are a seasoned gardener expanding your urban jungle or looking for your very first low-maintenance succulent, Paradise Nursery is here to help you grow. Explore our catalog and bring home the tranquility of nature today!
      </p>
    </div>
  );
}

export default AboutUs;
