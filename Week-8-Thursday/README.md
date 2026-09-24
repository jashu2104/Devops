# BookNest - Production-Quality Online Book Store

![BookNest Store Banner](https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80)

A polished, modern, production-quality **Online Book Store React Application** built with React 18, Vite, React Router DOM v6, and Lucide React. 

While designed to demonstrate essential frontend concepts (React Router, dynamic routing, `useParams`, `useEffect` lifecycle behavior, cleanup functions, local storage persistence, state management), BookNest looks and behaves like a real modern e-commerce product.

---

## 🚀 Key Features

- 📱 **Responsive Design System**: Seamless mobile, tablet, laptop, and desktop layouts with glassmorphism sticky navbar and mobile menu drawer.
- 🛣️ **Declarative & Dynamic Routing**: Full routing via React Router DOM (`/`, `/books`, `/books/:id`, `/cart`, `/about`, wildcard `*`).
- ⚡ **Dynamic Book Details (`/books/:id`)**: Uses `useParams()` to fetch dynamic book records, simulating async data fetching with loading states and cleanup.
- 🔍 **Real-Time Search & Filtering**: Case-insensitive instant search by title/author/category, category pill filter tabs, and multi-option sorting (Price, Rating, Title).
- 🛒 **Persistent Shopping Cart**: Global state using React Context API with automatic `localStorage` synchronization, quantity adjustments, item subtotals, and toast notifications.
- 🛡️ **Robust Error Handling**: Dedicated 404 Page Not Found view for invalid routes and "Book Not Found" fallback for non-existent book IDs (e.g., `/books/999`).
- 🎨 **Rich Micro-Interactions**: Hover elevation, image loading fallback handlers, toast feedback alerts, and rating badges.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM 6
- **Icons**: Lucide React
- **Styling**: Modern CSS Design Tokens (Variables, Flexbox, Grid, Glassmorphism, Keyframe Animations)
- **State & Persistence**: React Context API (`CartContext`) + Browser `localStorage`

---

## 📦 Installation & Setup

1. **Clone or Navigate to Project Directory**:
   ```bash
   cd Week-8-Thursday
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   The application will start locally at `http://localhost:3000`.

---

## 🗺️ Application Routes

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Landing hero, featured books, category tiles, platform features, CTA banner. |
| `/books` | `Books.jsx` | Full catalog grid, live search bar, category pills filter, and sorting. |
| `/books/:id` | `BookDetails.jsx` | Dynamic detail view using `useParams()`, `useEffect([id])` with cleanup. |
| `/cart` | `Cart.jsx` | Shopping cart list, item quantity controls, subtotals, and order summary. |
| `/about` | `About.jsx` | Mission statement, statistics counters, platform advantages. |
| `*` | `NotFound.jsx` | Wildcard route handling 404 errors with navigation back to home. |

---

## 🎓 React Concepts Demonstrated

### 1. `useParams()` - Dynamic Route Parameters
In `src/pages/BookDetails.jsx`, the dynamic ID is extracted directly from the URL:
```jsx
// useParams reads dynamic :id parameter from /books/:id route
const { id } = useParams();
```

### 2. `useEffect()` with Dependency Array `[id]`
To demonstrate lifecycle behavior when navigating between routes (e.g. `/books/101` to `/books/102`) without a page reload:
```jsx
useEffect(() => {
  let isCancelled = false;
  setLoading(true);

  const timer = setTimeout(() => {
    if (!isCancelled) {
      const bookId = parseInt(id, 10);
      const found = books.find((b) => b.id === bookId);
      setBook(found);
      setLoading(false);
    }
  }, 450);

  // Cleanup function prevents race conditions and stale updates
  return () => {
    isCancelled = true;
    clearTimeout(timer);
  };
}, [id]);
```

### 3. Cleanup Functions
The return statement inside `useEffect` cancels active timers and sets an `isCancelled` flag. This prevents updating state on an unmounted component or updating stale data when the route parameter changes rapidly.

### 4. `useNavigate()` - Programmatic Navigation
Used for the "← Go Back" functionality to return the user to their exact previous browser history location:
```jsx
const navigate = useNavigate();
navigate(-1); // Returns to previous page
```

### 5. React Context & `localStorage` Persistence
In `src/context/CartContext.jsx`, cart items are hydrated safely from `localStorage` on initial mount and kept synchronized whenever cart state updates:
```jsx
const [cart, setCart] = useState(() => {
  try {
    const savedCart = localStorage.getItem('booknest_cart_v1');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (err) {
    return [];
  }
});
```

---

## 🎨 Design Palette

- **Primary**: `#4F46E5` (Indigo)
- **Secondary**: `#7C3AED` (Purple)
- **Background**: `#F8FAFC` (Slate)
- **Text Main**: `#0F172A` (Dark Slate)
- **Muted Text**: `#64748B` (Cool Gray)
- **Success**: `#16A34A` (Green)
- **Error**: `#DC2626` (Red)

---

## 🧪 Verification Checklist

- [x] Home page loads hero section & featured books.
- [x] Client-side navigation (`NavLink`) updates routes without full page reload.
- [x] `/books` search filter filters by title, author, and category in real time.
- [x] Navigating directly to `/books/101`, `/books/102`, `/books/103` displays distinct book data.
- [x] Route change from `/books/101` to `/books/102` triggers `useEffect([id])` and displays simulated loading spinner.
- [x] Navigating to `/books/999` renders "Book Not Found" error view.
- [x] Navigating to `/invalid-url` renders 404 NotFound page.
- [x] Add to cart increases quantity, updates navbar badge count, triggers toast notification, and persists across browser refresh (`localStorage`).
- [x] Mobile responsive drawer menu works on 375px+ screens.
