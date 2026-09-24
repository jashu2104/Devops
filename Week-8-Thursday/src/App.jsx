import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

// Pages
import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { BookDetails } from './pages/BookDetails';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

/*
  Academic Requirement Demonstration: React Router DOM Configuration
  Routes mapping:
  - '/'          → Home Page
  - '/books'     → Catalog Page with Search, Filtering & Sorting
  - '/books/:id' → Dynamic Book Details (demonstrates useParams & useEffect with cleanup)
  - '/cart'      → Shopping Cart with localStorage synchronization
  - '/about'     → About BookNest
  - '*'          → Wildcard route for 404 Not Found handling
*/

function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 72px - 300px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          {/* Dynamic route parameter :id parsed via useParams inside BookDetails */}
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          {/* Wildcard 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  );
}

export default App;
