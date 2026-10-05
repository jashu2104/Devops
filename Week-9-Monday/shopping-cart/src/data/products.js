/**
 * Sample Product Catalog Dataset
 * Course: DevOps and Fullstack - Assignment 9.1
 * 
 * Each product object contains:
 * - id: Unique string identifier
 * - name: Display name of the product
 * - category: Classification category for filtering
 * - price: Product price in INR (Indian Rupee)
 * - quantity: Base quantity multiplier (default 1)
 * - image: High-quality image URL with un-cropped aspect ratios
 * - badge: Optional promotional tag (e.g., "Bestseller", "Hot Deal")
 * - description: Detailed product overview
 * - rating: Customer star rating (out of 5)
 * - reviewsCount: Number of customer reviews
 * - specs: Key technical features array
 */

export const INITIAL_PRODUCTS = [
  {
    id: "P101",
    name: "Laptop",
    category: "Electronics",
    price: 60000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    badge: "Bestseller",
    description: "High-performance laptop equipped with 16GB RAM, 512GB NVMe SSD, and Intel Core i7 processor. Designed for seamless multitasking, coding, and content creation.",
    rating: 4.8,
    reviewsCount: 342,
    specs: ["15.6\" FHD IPS Display", "Intel Core i7 12th Gen", "16GB DDR4 RAM", "512GB NVMe SSD", "Backlit Keyboard"]
  },
  {
    id: "P102",
    name: "Headphones",
    category: "Electronics",
    price: 2000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    badge: "Popular",
    description: "Immersive sound wireless over-ear headphones featuring 40mm dynamic drivers, deep bass boost, soft memory-protein ear cushions, and 30-hour playback.",
    rating: 4.5,
    reviewsCount: 819,
    specs: ["Bluetooth 5.2 Wireless", "40mm Dynamic Drivers", "30-Hour Battery Life", "Built-in Microphone", "Foldable Design"]
  },
  {
    id: "P103",
    name: "Backpack",
    category: "Accessories",
    price: 1500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    badge: "Essential",
    description: "Water-resistant commuter backpack with a dedicated padded 15.6-inch laptop compartment, anti-theft hidden pocket, and ergonomic shoulder straps.",
    rating: 4.6,
    reviewsCount: 512,
    specs: ["Waterproof Polyester Fabric", "Padded Laptop Compartment", "USB Charging Pass-through", "25L Storage Capacity"]
  },
  {
    id: "P104",
    name: "Wireless Mouse",
    category: "Electronics",
    price: 1200,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
    badge: null,
    description: "Ergonomic 2.4GHz wireless optical mouse with quiet click buttons, adjustable DPI sensitivity (800/1200/1600), and up to 18-month battery life.",
    rating: 4.4,
    reviewsCount: 290,
    specs: ["2.4GHz Wireless Nano Receiver", "Adjustable DPI (800-1600)", "Silent Micro-switches", "Auto-Sleep Power Saving"]
  },
  {
    id: "P105",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 3500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    badge: "Hot Deal",
    description: "Tactile RGB mechanical gaming keyboard with hot-swappable switches, customizable backlight modes, durable PBT keycaps, and detachable Type-C cable.",
    rating: 4.7,
    reviewsCount: 654,
    specs: ["Tactile Mechanical Switches", "RGB Per-Key Backlighting", "Double-Shot PBT Keycaps", "N-Key Rollover Anti-Ghosting"]
  },
  {
    id: "P106",
    name: "Smart Watch",
    category: "Wearables",
    price: 4999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    description: "Fitness tracker smart watch with 1.4-inch AMOLED touch display, continuous heart rate & SpO2 tracking, 100+ sports modes, and 5ATM water resistance.",
    rating: 4.5,
    reviewsCount: 410,
    specs: ["1.4\" Always-On AMOLED", "SpO2 & HR Health Monitoring", "100+ Fitness Workout Modes", "7-Day Battery Backup"]
  },
  {
    id: "P107",
    name: "USB-C Multiport Hub",
    category: "Accessories",
    price: 2499,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80",
    badge: null,
    description: "7-in-1 aluminum USB-C hub with 4K@60Hz HDMI output, 100W Power Delivery pass-through charging, 3× USB 3.0 ports, and SD/TF card readers.",
    rating: 4.6,
    reviewsCount: 388,
    specs: ["4K HDMI Video Output", "100W USB-C Power Delivery", "3× USB 3.0 SuperSpeed", "SD & MicroSD Card Readers"]
  },
  {
    id: "P108",
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 3200,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    badge: "Popular",
    description: "Portable IPX7 waterproof speaker delivering 360-degree surrounding stereo audio, dual passive radiators, and 24-hour continuous playtime.",
    rating: 4.7,
    reviewsCount: 920,
    specs: ["20W Crisp Stereo Drivers", "IPX7 Full Waterproofing", "24-Hour Continuous Battery", "TWS Dual Speaker Pairing"]
  },
  {
    id: "P109",
    name: "Noise Cancelling Earbuds",
    category: "Audio",
    price: 5499,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    badge: "Top Rated",
    description: "Active Noise Cancellation (ANC) wireless earbuds engineered with hybrid ANC tech, transparency audio mode, touch controls, and wireless charging case.",
    rating: 4.8,
    reviewsCount: 1140,
    specs: ["Active Noise Cancellation (-35dB)", "Transparency Ambient Mode", "Qi Wireless Charging Case", "Quad-Mic Environmental Noise Cancellation"]
  },
  {
    id: "P110",
    name: "4K Ultra HD Monitor",
    category: "Electronics",
    price: 24999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    badge: "Premium",
    description: "27-inch 4K IPS display featuring 99% sRGB color gamut, ultra-thin borderless frame, HDR10 support, and USB-C connectivity with 65W charging.",
    rating: 4.9,
    reviewsCount: 275,
    specs: ["27\" 3840×2160 4K UHD IPS", "99% sRGB Color Accuracy", "HDR10 & Flicker-Free", "USB-C 65W Laptop Charging"]
  },
  {
    id: "P111",
    name: "Ergonomic Gaming Chair",
    category: "Furniture",
    price: 14500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80",
    badge: null,
    description: "High-back gaming and office chair with adjustable lumbar support, 4D armrests, 135-degree tilt recline, and high-density memory foam padding.",
    rating: 4.6,
    reviewsCount: 310,
    specs: ["High-Density Molded Foam", "135-Degree Recline Tilt", "4D Adjustable Armrests", "Class-4 Gas Lift Cylinder"]
  },
  {
    id: "P112",
    name: "Full HD Desk Webcam",
    category: "Electronics",
    price: 3800,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=600&q=80",
    badge: null,
    description: "1080p 60fps streaming webcam featuring autofocused glass lens, dual noise-reducing stereo microphones, and physical privacy shutter.",
    rating: 4.5,
    reviewsCount: 430,
    specs: ["1080p @ 60fps Video Stream", "Fast Autofocus & Light Correction", "Dual Stereo Microphones", "Integrated Privacy Cover"]
  },
  {
    id: "P113",
    name: "Wireless Power Bank",
    category: "Accessories",
    price: 1999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=600&q=80",
    badge: "Essential",
    description: "10,000mAh magnetic wireless charging power bank with 22.5W USB-C PD fast output, digital LED power indicator, and slim pocketable design.",
    rating: 4.4,
    reviewsCount: 610,
    specs: ["10,000mAh Battery Capacity", "15W Magnetic Wireless Charging", "22.5W USB-C PD Fast Charge", "Digital LED Battery Status"]
  },
  {
    id: "P114",
    name: "Aluminum Laptop Stand",
    category: "Accessories",
    price: 1299,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    badge: null,
    description: "Ventilated ergonomic height-adjustable aluminum laptop riser supporting up to 17-inch laptops. Prevents neck strain and enhances heat dissipation.",
    rating: 4.7,
    reviewsCount: 540,
    specs: ["Premium Aircraft Aluminum", "6 Adjustable Height Angles", "Non-Slip Silicone Pads", "Foldable Travel Design"]
  },
  {
    id: "P115",
    name: "Smart LED Desk Lamp",
    category: "Lighting",
    price: 2199,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    description: "Dimmable eye-care LED desk lamp featuring 5 color temperature modes, touch slider control, timer shutdown, and integrated 10W wireless charger base.",
    rating: 4.6,
    reviewsCount: 280,
    specs: ["Flicker-Free Eye Care LED", "5 Color Modes & 10 Brightness Levels", "10W Wireless Charging Pad", "Auto Shutdown Timer"]
  },
  {
    id: "P116",
    name: "Ergonomic Vertical Mouse",
    category: "Electronics",
    price: 2499,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    badge: "Recommended",
    description: "Scientific ergonomic vertical mouse designed to promote natural handshake wrist position, reducing forearm strain and repetitive motion fatigue.",
    rating: 4.6,
    reviewsCount: 195,
    specs: ["57-Degree Ergonomic Angle", "Dual Mode (Bluetooth + 2.4G)", "Rechargeable 500mAh Battery", "Silent Click Switches"]
  },
  {
    id: "P117",
    name: "Studio Headphones",
    category: "Audio",
    price: 8999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    badge: "Pro",
    description: "Professional reference monitor studio headphones delivering transparent frequency response, neodymium magnet drivers, and detachable coiled cable.",
    rating: 4.9,
    reviewsCount: 480,
    specs: ["45mm Large-Aperture Drivers", "Flat Tuning for Audio Mixing", "90-Degree Swiveling Earcups", "Detachable Coiled Cable"]
  },
  {
    id: "P118",
    name: "Smart Fitness Band",
    category: "Wearables",
    price: 2799,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80",
    badge: "Bestseller",
    description: "Lightweight smart tracker with color OLED touch panel, 24/7 heart rate monitor, sleep stage analyzer, and 14-day battery life.",
    rating: 4.5,
    reviewsCount: 890,
    specs: ["1.1\" Color Touch Screen", "24/7 Heart & Sleep Tracking", "50m Water Resistance", "14-Day Ultra Battery"]
  },
  {
    id: "P119",
    name: "Dual Monitor Arm Stand",
    category: "Accessories",
    price: 4500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?auto=format&fit=crop&w=600&q=80",
    badge: null,
    description: "Heavy-duty gas spring dual monitor desk mount fitting screens 17-32 inch with 360-degree rotation, cable management channel, and C-clamp mount.",
    rating: 4.7,
    reviewsCount: 310,
    specs: ["Gas Spring Counterbalance", "Supports Screens up to 9kg", "VESA 75x75 & 100x100", "Integrated Cable Channels"]
  },
  {
    id: "P120",
    name: "Extended RGB Desk Mat",
    category: "Accessories",
    price: 999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    badge: "Hot Deal",
    description: "XXL 800×300mm gaming desk pad with 14 customizable RGB lighting modes, non-slip rubber base, and water-resistant micro-woven cloth surface.",
    rating: 4.6,
    reviewsCount: 740,
    specs: ["800×300×4mm XXL Dimensions", "14 Spectrum RGB Light Modes", "Micro-Woven Waterproof Cloth", "Heavy-Duty Anti-Slip Rubber Base"]
  },
  {
    id: "P121",
    name: "Smart Mini WiFi Projector",
    category: "Electronics",
    price: 18499,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80",
    badge: "New",
    description: "Compact HD smart projector featuring built-in Android OS, 400 ANSI lumens brightness, 200-inch projection display, and wireless screen mirroring.",
    rating: 4.7,
    reviewsCount: 215,
    specs: ["Native 1080p Resolution", "400 ANSI Lumens Brightness", "Built-in Android Apps & WiFi", "Automatic Keystone Correction"]
  },
  {
    id: "P122",
    name: "Desktop Soundbar",
    category: "Audio",
    price: 4299,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    badge: null,
    description: "Sleek under-monitor stereo desktop soundbar featuring dual full-range drivers, bass diaphragm, Bluetooth 5.3, and AUX/USB wired modes.",
    rating: 4.5,
    reviewsCount: 360,
    specs: ["Under-Monitor Space Saver", "Dual 5W Full-Range Drivers", "Bluetooth 5.3 + AUX Input", "Rotary Volume Control Knob"]
  }
];

/**
 * Utility function to format any number into Indian Rupee (INR) currency format.
 * Example: 60000 -> ₹60,000
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};
