export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: '🍽️' },
  { id: 'burgers', name: 'Gourmet Burgers', icon: '🍔' },
  { id: 'pizza', name: 'Artisan Pizza', icon: '🍕' },
  { id: 'asian', name: 'Asian Fusion', icon: '🍜' },
  { id: 'italian', name: 'Pasta & Italian', icon: '🍝' },
  { id: 'salads', name: 'Fresh Salads', icon: '🥗' },
  { id: 'desserts', name: 'Sweets & Bakery', icon: '🍰' },
  { id: 'drinks', name: 'Beverages', icon: '🥤' }
];

export const RESTAURANTS = [
  {
    id: 1,
    name: 'Burger & Co. Craft House',
    cuisine: 'American • Gourmet Burgers • Wings',
    rating: 4.8,
    reviewsCount: 340,
    prepTime: '20-30 min',
    deliveryFee: 2.99,
    minOrder: 15,
    tag: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Bella Italia Woodfire',
    cuisine: 'Italian • Neapolitan Pizza • Pasta',
    rating: 4.9,
    reviewsCount: 520,
    prepTime: '25-35 min',
    deliveryFee: 1.99,
    minOrder: 20,
    tag: 'Free Delivery $30+',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Sakura Noodle & Ramen Bar',
    cuisine: 'Japanese • Ramen • Gyoza • Sushi',
    rating: 4.7,
    reviewsCount: 290,
    prepTime: '15-25 min',
    deliveryFee: 3.49,
    minOrder: 18,
    tag: 'Fastest Delivery',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Verde Green Healthy Eats',
    cuisine: 'Healthy • Organic Bowls • Smoothies',
    rating: 4.6,
    reviewsCount: 180,
    prepTime: '15-20 min',
    deliveryFee: 2.49,
    minOrder: 12,
    tag: 'Chef Special',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
  }
];

export const FOOD_ITEMS = [
  // Burgers
  {
    id: 101,
    restaurantId: 1,
    name: 'The Ultimate Truffle Bacon Burger',
    category: 'burgers',
    price: 14.99,
    rating: 4.9,
    calories: '850 kcal',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Double Angus beef patty, smoked bacon, black truffle aioli, aged cheddar, crisp arugula on brioche.'
  },
  {
    id: 102,
    restaurantId: 1,
    name: 'Smokey BBQ Chipotle Cheeseburger',
    category: 'burgers',
    price: 12.49,
    rating: 4.7,
    calories: '720 kcal',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    description: 'Grilled beef patty, crispy onion rings, house BBQ glaze, melted pepper jack cheese.'
  },
  {
    id: 103,
    restaurantId: 1,
    name: 'Garden Avocado Beyond Burger',
    category: 'burgers',
    price: 13.50,
    rating: 4.8,
    calories: '610 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=800&q=80',
    description: '100% plant-based patty, fresh sliced avocado, vegan garlic mayo, romaine lettuce, tomato.'
  },

  // Pizza
  {
    id: 201,
    restaurantId: 2,
    name: 'Classic Margherita Supreme Pizza',
    category: 'pizza',
    price: 16.99,
    rating: 4.9,
    calories: '980 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, aromatic sweet basil, extra virgin olive oil.'
  },
  {
    id: 202,
    restaurantId: 2,
    name: 'Spicy Pepperoni & Honey Pizza',
    category: 'pizza',
    price: 18.50,
    rating: 4.8,
    calories: '1150 kcal',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    description: 'Crispy cup pepperoni, sliced jalapeños, mozzarella, finished with a drizzle of hot chili honey.'
  },
  {
    id: 203,
    restaurantId: 2,
    name: 'Quattro Formaggi & Garlic Oil',
    category: 'pizza',
    price: 17.25,
    rating: 4.7,
    calories: '1080 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80',
    description: 'Blend of gorgonzola, fontina, mozzarella, parmesan, roasted garlic flakes, and rosemary.'
  },

  // Asian Fusion
  {
    id: 301,
    restaurantId: 3,
    name: 'Rich Tonkotsu Black Garlic Ramen',
    category: 'asian',
    price: 15.99,
    rating: 4.9,
    calories: '780 kcal',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    description: 'Slow-simmered pork bone broth, tender chashu pork belly, ajitsuke egg, wood ear mushrooms, black garlic oil.'
  },
  {
    id: 302,
    restaurantId: 3,
    name: 'Pan-Seared Pork Gyoza (6 pcs)',
    category: 'asian',
    price: 7.99,
    rating: 4.6,
    calories: '340 kcal',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
    description: 'Handmade Japanese dumplings stuffed with seasoned pork, scallions, served with spicy ponzu dip.'
  },
  {
    id: 303,
    restaurantId: 3,
    name: 'Spicy Veggie Tofu Pad Thai',
    category: 'asian',
    price: 13.99,
    rating: 4.7,
    calories: '590 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    description: 'Stir-fried rice noodles, crispy tofu, bean sprouts, crushed peanuts, tamarind chili glaze, lime wheel.'
  },

  // Italian
  {
    id: 401,
    restaurantId: 2,
    name: 'Creamy Truffle Mushroom Fettuccine',
    category: 'italian',
    price: 16.50,
    rating: 4.8,
    calories: '740 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3def6164286?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh handmade fettuccine pasta tossed in wild forest mushrooms, garlic cream sauce, parmesan.'
  },

  // Salads
  {
    id: 501,
    restaurantId: 4,
    name: 'Avocado Quinoa Power Bowl',
    category: 'salads',
    price: 12.99,
    rating: 4.7,
    calories: '420 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Tri-color quinoa, ripe avocado, roasted sweet potato, edamame, kale, lemon tahini dressing.'
  },
  {
    id: 502,
    restaurantId: 4,
    name: 'Mediterranean Grilled Chicken Salad',
    category: 'salads',
    price: 13.75,
    rating: 4.8,
    calories: '480 kcal',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'Herb marinaded chicken breast, kalamata olives, feta cheese, cucumber, cherry tomatoes, oregano vinaigrette.'
  },

  // Desserts
  {
    id: 601,
    restaurantId: 1,
    name: 'Molten Belgian Chocolate Lava Cake',
    category: 'desserts',
    price: 8.50,
    rating: 4.9,
    calories: '520 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'Warm chocolate cake with oozing Belgian ganache center, served with vanilla bean ice cream scoop.'
  },
  {
    id: 602,
    restaurantId: 2,
    name: 'Classic Espresso Tiramisu',
    category: 'desserts',
    price: 7.95,
    rating: 4.8,
    calories: '440 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    description: 'Italian ladyfingers soaked in dark espresso & Kahlua, layered with mascarpone cream & cocoa powder.'
  },

  // Drinks
  {
    id: 701,
    restaurantId: 4,
    name: 'Fresh Mango Passionfruit Smoothie',
    category: 'drinks',
    price: 5.99,
    rating: 4.8,
    calories: '210 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80',
    description: 'Blend of Alphonso mangoes, passionfruit pulp, coconut water, chia seeds.'
  },
  {
    id: 702,
    restaurantId: 1,
    name: 'Iced Vanilla Salted Caramel Latte',
    category: 'drinks',
    price: 4.99,
    rating: 4.7,
    calories: '280 kcal',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    description: 'Cold brewed arabica espresso with Madagascar vanilla, house salted caramel drizzle, whole milk.'
  }
];
