import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Curated plant inventory organized by functional categories
  const plantsArray = [
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://images.unsplash.com/photo-1593482877647-7c08a90ec4f4?auto=format&fit=crop&w=600&q=80',
          description: 'Releases oxygen at night and purifies air by eliminating harmful toxins like formaldehyde.',
          cost: '$15',
        },
        {
          name: 'Spider Plant',
          image: 'https://images.unsplash.com/photo-1572688484437-31820e394186?auto=format&fit=crop&w=600&q=80',
          description: 'Incredibly adaptable plant known for clearing carbon monoxide and indoor airborne allergens.',
          cost: '$12',
        },
        {
          name: 'Peace Lily',
          image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=600&q=80',
          description: 'Graceful white blooms that cleanse the air, absorb mould spores, and boost room humidity.',
          cost: '$18',
        },
        {
          name: 'Boston Fern',
          image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80',
          description: 'Lush feathery fronds functioning as a natural humidifier and organic air scrubber.',
          cost: '$14',
        },
        {
          name: 'Rubber Plant',
          image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=600&q=80',
          description: 'Glossy broad leaves that excel at absorbing airborne pollutants and carbon dioxide.',
          cost: '$20',
        },
        {
          name: 'Aloe Vera',
          image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80',
          description: 'Cleans air pollutants and provides natural cooling gel packed with soothing nutrients.',
          cost: '$10',
        },
      ],
    },
    {
      category: 'Aromatic & Fragrant Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80',
          description: 'Soothing floral scent known to reduce stress, anxiety, and encourage restorative sleep.',
          cost: '$18',
        },
        {
          name: 'Jasmine',
          image: 'https://images.unsplash.com/photo-1592729986777-448ff6544214?auto=format&fit=crop&w=600&q=80',
          description: 'Intoxicating sweet perfume with delicate star blooms that elevate mood and atmosphere.',
          cost: '$22',
        },
        {
          name: 'Rosemary',
          image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=600&q=80',
          description: 'Invigorating herbal pine scent known to enhance memory focus and culinary flavors.',
          cost: '$15',
        },
        {
          name: 'Mint',
          image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
          description: 'Crisp refreshing fragrance that deters household insects and provides fresh garnish.',
          cost: '$10',
        },
        {
          name: 'Lemon Balm',
          image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
          description: 'Zesty citrus aroma that naturally soothes tension and brightens home spaces.',
          cost: '$12',
        },
        {
          name: 'Hyacinth',
          image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80',
          description: 'Vibrant spring blossom clusters delivering a rich, captivating floral bouquet.',
          cost: '$16',
        },
      ],
    },
    {
      category: 'Medicinal & Wellness Plants',
      plants: [
        {
          name: 'Holy Basil (Tulsi)',
          image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
          description: 'Revered Ayurvedic adaptogen that supports immune health and relieves daily stress.',
          cost: '$14',
        },
        {
          name: 'Echinacea',
          image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
          description: 'Traditional wellness flower celebrated for boosting natural defense against seasonal illness.',
          cost: '$16',
        },
        {
          name: 'Peppermint',
          image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80',
          description: 'Menthol-rich herbal staple providing digestive support and respiratory clarity.',
          cost: '$12',
        },
        {
          name: 'Chamomile',
          image: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?auto=format&fit=crop&w=600&q=80',
          description: 'Delicate blossom used for centuries to brew calming infusions and soothe headaches.',
          cost: '$13',
        },
        {
          name: 'Calendula',
          image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
          description: 'Golden petals packed with gentle antioxidants and natural restorative skin remedies.',
          cost: '$15',
        },
        {
          name: 'Ashwagandha',
          image: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=600&q=80',
          description: 'Potent restorative root known to promote endurance, stamina, and restful sleep.',
          cost: '$19',
        },
      ],
    },
    {
      category: 'Low Maintenance & Succulents',
      plants: [
        {
          name: 'ZZ Plant',
          image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=600&q=80',
          description: 'Virtually indestructible indoor plant that thrives on low light and infrequent watering.',
          cost: '$24',
        },
        {
          name: 'Golden Pothos',
          image: 'https://images.unsplash.com/photo-1596724855427-4638a531d041?auto=format&fit=crop&w=600&q=80',
          description: 'Vigorous trailing vine with golden-splashed leaves, forgiving to new plant owners.',
          cost: '$14',
        },
        {
          name: 'Cast Iron Plant',
          image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80',
          description: 'Earned its name from extreme durability against shade, low humidity, and missed waterings.',
          cost: '$26',
        },
        {
          name: 'Jade Plant',
          image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80',
          description: 'Fleshy-leaved succulent symbolizing prosperity and longevity, requiring minimal care.',
          cost: '$16',
        },
        {
          name: 'Succulent Trio',
          image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80',
          description: 'Curated mix of hardy miniature succulents, ideal for windowsills and home desks.',
          cost: '$18',
        },
        {
          name: 'Chinese Evergreen',
          image: 'https://images.unsplash.com/photo-1604762524889-3e2fccbc2c08?auto=format&fit=crop&w=600&q=80',
          description: 'Striking patterned leaves that effortlessly endure dim corners and dry indoor air.',
          cost: '$22',
        },
      ],
    },
  ];

  // Helper to verify if plant is currently in cart
  const isPlantInCart = (plantName) => {
    return cartItems.some((item) => item.name === plantName) || addedToCart[plantName];
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setShowCart(false);
  };

  return (
    <div className="product-page-wrapper">
      {/* Universal Top Navigation Bar */}
      <nav className="navbar" aria-label="Main Navigation">
        <div className="navbar-brand-section" onClick={onHomeClick || handlePlantsClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && (onHomeClick ? onHomeClick() : handlePlantsClick(e))}>
          <div className="navbar-logo-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z"/>
            </svg>
          </div>
          <div className="navbar-title-group">
            <h1 className="navbar-brand-title">Paradise Nursery</h1>
            <span className="navbar-brand-tagline">Where Green Meets Serenity</span>
          </div>
        </div>

        <div className="navbar-links-section">
          <button
            type="button"
            className={`nav-link-btn ${!showCart ? 'active' : ''}`}
            onClick={handlePlantsClick}
          >
            Plants
          </button>

          <button
            type="button"
            className={`nav-cart-btn ${showCart ? 'active' : ''}`}
            onClick={handleCartClick}
            aria-label={`Shopping cart with ${totalCartQuantity} items`}
          >
            <div className="cart-icon-wrapper">
              <svg className="cart-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalCartQuantity > 0 && (
                <span className="cart-badge-count" aria-live="polite">
                  {totalCartQuantity}
                </span>
              )}
            </div>
            <span className="cart-text-label">Cart</span>
          </button>
        </div>
      </nav>

      {/* Main Content: Switches between Catalog and Shopping Cart */}
      <main className="product-main-content">
        {showCart ? (
          <CartItem onContinueShopping={handleContinueShopping} />
        ) : (
          <div className="plants-catalog-container">
            <header className="catalog-header-banner">
              <h2>Discover Our Living Plant Collection</h2>
              <p>Hand-nurtured botanical selections to clean your air, refresh your senses, and bring natural balance home.</p>
            </header>

            {plantsArray.map((categoryObj) => (
              <section key={categoryObj.category} className="plant-category-section">
                <div className="category-header-row">
                  <h3 className="category-title">{categoryObj.category}</h3>
                  <div className="category-title-line"></div>
                </div>

                <div className="plants-grid">
                  {categoryObj.plants.map((plant) => {
                    const alreadyInCart = isPlantInCart(plant.name);
                    return (
                      <article className="plant-card" key={plant.name}>
                        <div className="plant-card-image-wrap">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="plant-card-image"
                            loading="lazy"
                          />
                          <span className="plant-price-pill">{plant.cost}</span>
                        </div>

                        <div className="plant-card-body">
                          <h4 className="plant-card-name">{plant.name}</h4>
                          <p className="plant-card-description">{plant.description}</p>
                          
                          <div className="plant-card-footer">
                            <button
                              type="button"
                              className={`add-to-cart-btn ${alreadyInCart ? 'added' : ''}`}
                              disabled={alreadyInCart}
                              onClick={() => handleAddToCart(plant)}
                              aria-label={alreadyInCart ? `${plant.name} added to cart` : `Add ${plant.name} to cart`}
                            >
                              {alreadyInCart ? (
                                <>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                  Added to Cart
                                </>
                              ) : (
                                <>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                  Add to Cart
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductList;
