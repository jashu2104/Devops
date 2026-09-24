// Realistic mock database for BookNest online bookstore (500 Books Dataset)

const handCraftedBooks = [
  {
    id: 101,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    price: 499,
    category: "Programming",
    rating: 4.8,
    reviews: 342,
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way. Noted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code.",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
    pages: 464,
    publisher: "Prentice Hall",
    publishedYear: 2008,
    isbn: "978-0132350884",
    language: "English",
    stock: 12
  },
  {
    id: 102,
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas, Andrew Hunt",
    price: 599,
    category: "Technology",
    rating: 4.9,
    reviews: 512,
    description: "The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process—taking a requirement and producing working, maintainable code that delights its users. It covers topics ranging from personal responsibility and career development to architectural techniques.",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    pages: 352,
    publisher: "Addison-Wesley Professional",
    publishedYear: 2019,
    isbn: "978-0135957059",
    language: "English",
    stock: 8
  },
  {
    id: 103,
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    author: "James Clear",
    price: 449,
    category: "Self Development",
    rating: 4.9,
    reviews: 1420,
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    pages: 320,
    publisher: "Avery",
    publishedYear: 2018,
    isbn: "978-0735211292",
    language: "English",
    stock: 25
  },
  {
    id: 104,
    title: "Psychology of Money: Timeless Lessons on Wealth",
    author: "Morgan Housel",
    price: 399,
    category: "Business",
    rating: 4.7,
    reviews: 890,
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people. Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do.",
    cover: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=600&q=80",
    pages: 252,
    publisher: "Harriman House",
    publishedYear: 2020,
    isbn: "978-0857197689",
    language: "English",
    stock: 15
  },
  {
    id: 105,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    price: 699,
    category: "Programming",
    rating: 4.6,
    reviews: 280,
    description: "Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems.",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
    pages: 416,
    publisher: "Addison-Wesley Professional",
    publishedYear: 1994,
    isbn: "978-0201633610",
    language: "English",
    stock: 5
  },
  {
    id: 106,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 549,
    category: "Science",
    rating: 4.8,
    reviews: 1105,
    description: "One hundred thousand years ago, at least six human species inhabited the earth. Today there is only one. Us. Homo sapiens. How did our species succeed in the battle for dominance?",
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
    pages: 448,
    publisher: "Harper",
    publishedYear: 2015,
    isbn: "978-0062316097",
    language: "English",
    stock: 18
  },
  {
    id: 107,
    title: "The Silent Patient: A Mind-Bending Psychological Thriller",
    author: "Alex Michaelides",
    price: 379,
    category: "Mystery",
    rating: 4.5,
    reviews: 640,
    description: "Alicia Berenson’s life is seemingly perfect. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    pages: 336,
    publisher: "Celadon Books",
    publishedYear: 2019,
    isbn: "978-1250301697",
    language: "English",
    stock: 9
  },
  {
    id: 108,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 499,
    category: "Psychology",
    rating: 4.6,
    reviews: 930,
    description: "In his mega-bestseller, Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast; System 2 is slower and logical.",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    pages: 512,
    publisher: "Farrar, Straus and Giroux",
    publishedYear: 2011,
    isbn: "978-0374533557",
    language: "English",
    stock: 14
  },
  {
    id: 109,
    title: "Zero to One: Notes on Startups, or How to Build the Future",
    author: "Peter Thiel, Blake Masters",
    price: 429,
    category: "Business",
    rating: 4.7,
    reviews: 740,
    description: "The great secret of our time is that there are still uncharted frontiers to explore and new inventions to create. Peter Thiel shows how we can find singular ways to create those new things.",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    pages: 224,
    publisher: "Crown Business",
    publishedYear: 2014,
    isbn: "978-0804139298",
    language: "English",
    stock: 11
  },
  {
    id: 110,
    title: "Dune: Masterpiece of Speculative Fiction",
    author: "Frank Herbert",
    price: 529,
    category: "Fiction",
    rating: 4.8,
    reviews: 1250,
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    pages: 688,
    publisher: "Ace Books",
    publishedYear: 1965,
    isbn: "978-0441172719",
    language: "English",
    stock: 20
  },
  {
    id: 111,
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    price: 459,
    category: "Self Development",
    rating: 4.7,
    reviews: 610,
    description: "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results.",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
    pages: 304,
    publisher: "Grand Central Publishing",
    publishedYear: 2016,
    isbn: "978-1455586691",
    language: "English",
    stock: 16
  },
  {
    id: 112,
    title: "Refactoring: Improving the Design of Existing Code",
    author: "Martin Fowler",
    price: 749,
    category: "Programming",
    rating: 4.9,
    reviews: 310,
    description: "For more than twenty years, serious programmers have relied on Martin Fowler's Refactoring to improve the design of existing code and to enhance software maintainability.",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    pages: 448,
    publisher: "Addison-Wesley Professional",
    publishedYear: 2018,
    isbn: "978-0134757599",
    language: "English",
    stock: 7
  }
];

// Available categories for filtering
export const categories = [
  "All",
  "Programming",
  "Technology",
  "Self Development",
  "Business",
  "Science",
  "Mystery",
  "Psychology",
  "Fiction"
];

export const fallbackCover = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80";

// Curated high quality cover image collection
const bookCovers = [
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80"
];

const authorsPool = [
  "Robert C. Martin", "Martin Fowler", "Kent Beck", "Eric Evans", "Donald Knuth",
  "Linus Torvalds", "Ada Lovelace", "Alan Turing", "Grace Hopper", "Dennis Ritchie",
  "Brian Kernighan", "Bjarne Stroustrup", "Guido van Rossum", "Brendan Eich", "James Gosling",
  "Malcolm Gladwell", "Yuval Noah Harari", "Cal Newport", "James Clear", "Morgan Housel",
  "Daniel Kahneman", "Carol Dweck", "Simon Sinek", "Seth Godin", "Tim Ferriss",
  "Peter Thiel", "Ray Dalio", "Satya Nadella", "Walter Isaacson", "Stephen Hawking",
  "Richard Feynman", "Carl Sagan", "Neil deGrasse Tyson", "Michio Kaku", "Brian Greene",
  "Agatha Christie", "Arthur Conan Doyle", "Stephen King", "J.K. Rowling", "George R.R. Martin",
  "J.R.R. Tolkien", "Isaac Asimov", "Philip K. Dick", "Arthur C. Clarke", "Frank Herbert",
  "Dan Brown", "Gillian Flynn", "Paula Hawkins", "Alex Michaelides", "Shari Lapena"
];

const publishersPool = [
  "O'Reilly Media", "Addison-Wesley", "Prentice Hall", "Manning Publications",
  "Pragmatic Bookshelf", "HarperCollins", "Penguin Random House", "Simon & Schuster",
  "Hachette Book Group", "Macmillan Publishers", "Oxford University Press", "MIT Press",
  "Cambridge University Press", "Wiley", "Avery", "Crown Publishing"
];

const titleTemplates = {
  Programming: [
    "Mastering {lang} Design Patterns", "Advanced {lang} Architecture", "Clean {lang} Microservices",
    "{lang} Systems Programming", "Building Scalable Applications with {lang}", "The Art of Functional {lang}",
    "High-Performance {lang} Techniques", "Test-Driven Development in {lang}", "{lang} Performance Tuning",
    "Domain-Driven Design with {lang}", "{lang} Concurrency & Parallelism", "Modern {lang} Best Practices",
    "Full-Stack Web Engineering with {lang}", "Refactoring Legacy {lang} Systems"
  ],
  Technology: [
    "The Future of Artificial Intelligence", "Understanding Cloud-Native Systems", "Cybersecurity Fundamentals for Engineers",
    "Distributed Systems at Scale", "Quantum Computing Essentials", "The DevOps Mindset and Automation",
    "Data Engineering Patterns", "Machine Learning Pipelines in Production", "Blockchain and Decentralized Networks",
    "API Design and Infrastructure", "Modern Networking & Protocols", "Edge Computing Architectures"
  ],
  "Self Development": [
    "The Art of Deep Concentration", "Unlocking Your Creative Potential", "Mindset: The Path to Constant Growth",
    "Building Unshakeable Confidence", "Mastering Daily Routines", "The Discipline of Great Achievers",
    "Emotional Intelligence at Work", "Overcoming Procrastination for Good", "The Science of Peak Performance",
    "Habits of Highly Effective Thinkers", "Strategic Time Management", "The Power of Intentional Living"
  ],
  Business: [
    "Product Strategy for Tech Leaders", "Scaling From Startup to Enterprise", "The Lean Entrepreneur Playbook",
    "Financial Freedom and Wealth Creation", "Modern Leadership in Tech", "The Art of Commercial Negotiation",
    "Growth Hacking and Digital Marketing", "Corporate Strategy and Innovation", "Venture Capital and Business Valuation",
    "Building High-Performing Teams", "The Agile Executive Guide", "Global Market Dynamics"
  ],
  Science: [
    "Cosmos: The Architecture of the Universe", "Quantum Physics for Curious Minds", "The History of Biological Evolution",
    "Astrophysics for Modern Thinkers", "Understanding Molecular Biology", "The Mysteries of Deep Space",
    "Climate Change and Future Energy Systems", "Neuroscience and Human Consciousness", "Genetics and the Future of Medicine",
    "The Elegant Laws of Thermodynamics", "Principles of Theoretical Physics", "The Origin of Chemical Elements"
  ],
  Mystery: [
    "The Midnight Investigation", "Shadows Over Blackwood Manor", "The Vanishing of Room 404",
    "Secrets of the Silent City", "The Cipher in the Fog", "A Cold Night in London",
    "The Whispering Gallery", "The Alchemist's Enigma", "Murder on the Midnight Express",
    "The Last Detective's Casebook", "Curse of the Crimson Diamond", "The Phantom of St. Jude"
  ],
  Psychology: [
    "The Hidden Mechanics of Human Behavior", "Cognitive Biases and Decision Making", "Understanding Social Psychology",
    "The Science of Happiness and Wellbeing", "Subconscious Drives and Motivations", "Psychology of Influence and Persuasion",
    "Memory, Perception, and Reality", "The Psychology of High Achievers", "Behavioral Economics Explained",
    "Empathy in the Modern World", "Neuroplasticity and Mind Rewiring", "Understanding Human Emotions"
  ],
  Fiction: [
    "Chronicles of the Starlight Realm", "The Last Horizon of Earth", "Echoes of Tomorrow",
    "The Garden of Forgotten Memories", "Voyage Beyond the Galaxy", "The Lost Empire of Atlantis",
    "Island of Whispering Pines", "The Clockwork Citadel", "Shadows of the Fallen Kingdom",
    "Beyond the Northern Lights", "The Silk Road Journey", "Tales of the Ancient Forest"
  ]
};

const languagesPool = ["C++", "Python", "Rust", "TypeScript", "Go", "Java", "Kotlin", "Swift", "JavaScript", "SQL"];

// Generate 488 additional books programmatically to reach exactly 500 books total
const generateBooks = () => {
  const generated = [...handCraftedBooks];
  const activeCategories = categories.filter((c) => c !== "All");
  
  let currentId = 113;
  const targetCount = 500;

  while (generated.length < targetCount) {
    const category = activeCategories[generated.length % activeCategories.length];
    const templates = titleTemplates[category];
    const rawTemplate = templates[generated.length % templates.length];
    
    // Replace language placeholder if present
    const lang = languagesPool[(generated.length * 7) % languagesPool.length];
    const title = rawTemplate.replace("{lang}", lang) + (generated.length > 80 ? ` (Vol. ${Math.floor(generated.length / 50) + 1})` : '');
    
    const author = authorsPool[generated.length % authorsPool.length];
    const publisher = publishersPool[generated.length % publishersPool.length];
    const cover = bookCovers[generated.length % bookCovers.length];
    
    const price = 299 + ((generated.length * 37) % 650);
    const rating = parseFloat((4.0 + ((generated.length * 13) % 11) / 10).toFixed(1));
    const reviews = 45 + ((generated.length * 53) % 1450);
    const pages = 180 + ((generated.length * 41) % 600);
    const publishedYear = 1990 + (generated.length % 35);
    const stock = 3 + ((generated.length * 9) % 30);
    const isbn = `978-${1000000000 + generated.length * 1234567}`;

    const description = `Discover comprehensive insights into ${category.toLowerCase()} with "${title}". Written by renowned expert ${author}, this landmark work provides authoritative guidance, clear examples, and timeless principles published by ${publisher}.`;

    generated.push({
      id: currentId,
      title,
      author,
      price,
      category,
      rating,
      reviews,
      description,
      cover,
      pages,
      publisher,
      publishedYear,
      isbn,
      language: "English",
      stock
    });

    currentId++;
  }

  return generated;
};

export const books = generateBooks();
