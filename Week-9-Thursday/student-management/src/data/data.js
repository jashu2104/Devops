// src/data/data.js
// Local dataset simulating backend database for Students and Courses

export const students = [
  { id: 101, name: "Rahul Sharma", branch: "CSE", year: "III", email: "rahul.sharma@college.edu", phone: "9876543210", cgpa: "8.9", section: "A", status: "Active" },
  { id: 102, name: "Priya Reddy", branch: "CSE", year: "IV", email: "priya.reddy@college.edu", phone: "9876543211", cgpa: "9.2", section: "B", status: "Active" },
  { id: 103, name: "Arjun Verma", branch: "ECE", year: "III", email: "arjun.verma@college.edu", phone: "9876543212", cgpa: "8.4", section: "A", status: "Active" },
  { id: 104, name: "Sneha Patel", branch: "AIML", year: "II", email: "sneha.patel@college.edu", phone: "9876543213", cgpa: "9.5", section: "A", status: "Active" },
  { id: 105, name: "Kiran Kumar", branch: "IT", year: "IV", email: "kiran.kumar@college.edu", phone: "9876543214", cgpa: "7.8", section: "C", status: "Active" },
  { id: 106, name: "Anjali Gupta", branch: "CSE", year: "II", email: "anjali.gupta@college.edu", phone: "9876543215", cgpa: "8.7", section: "B", status: "Active" },
  { id: 107, name: "Vikram Singh", branch: "MECH", year: "IV", email: "vikram.singh@college.edu", phone: "9876543216", cgpa: "8.1", section: "A", status: "Active" },
  { id: 108, name: "Divya Joshi", branch: "ECE", year: "II", email: "divya.joshi@college.edu", phone: "9876543217", cgpa: "9.0", section: "B", status: "Active" },
  { id: 109, name: "Aditya Roy", branch: "AIML", year: "III", email: "aditya.roy@college.edu", phone: "9876543218", cgpa: "8.6", section: "A", status: "Active" },
  { id: 110, name: "Pooja Hegde", branch: "CSE", year: "I", email: "pooja.hegde@college.edu", phone: "9876543219", cgpa: "9.3", section: "C", status: "Active" },
  { id: 111, name: "Manish Nambiar", branch: "EEE", year: "III", email: "manish.nambiar@college.edu", phone: "9876543220", cgpa: "7.9", section: "A", status: "Active" },
  { id: 112, name: "Kavya Nair", branch: "IT", year: "II", email: "kavya.nair@college.edu", phone: "9876543221", cgpa: "8.8", section: "B", status: "Active" },
  { id: 113, name: "Rohan Das", branch: "CIVIL", year: "IV", email: "rohan.das@college.edu", phone: "9876543222", cgpa: "7.5", section: "A", status: "Active" },
  { id: 114, name: "Swati Mishra", branch: "CSE", year: "III", email: "swati.mishra@college.edu", phone: "9876543223", cgpa: "9.1", section: "A", status: "Active" },
  { id: 115, name: "Deepak Rao", branch: "ECE", year: "IV", email: "deepak.rao@college.edu", phone: "9876543224", cgpa: "8.3", section: "C", status: "Active" },
  { id: 116, name: "Ritu Saxena", branch: "AIML", year: "I", email: "ritu.saxena@college.edu", phone: "9876543225", cgpa: "8.7", section: "B", status: "Active" },
  { id: 117, name: "Sandeep Choudhury", branch: "CSE", year: "II", email: "sandeep.c@college.edu", phone: "9876543226", cgpa: "8.0", section: "A", status: "Active" },
  { id: 118, name: "Ananya Iyer", branch: "DATA SCIENCE", year: "III", email: "ananya.iyer@college.edu", phone: "9876543227", cgpa: "9.6", section: "A", status: "Active" },
  { id: 119, name: "Varun Kapoor", branch: "MECH", year: "III", email: "varun.kapoor@college.edu", phone: "9876543228", cgpa: "7.6", section: "B", status: "Active" },
  { id: 120, name: "Neha Sharma", branch: "IT", year: "IV", email: "neha.sharma@college.edu", phone: "9876543229", cgpa: "9.4", section: "A", status: "Active" },
  { id: 121, name: "Siddharth Malhotra", branch: "CSE", year: "IV", email: "siddharth.m@college.edu", phone: "9876543230", cgpa: "8.8", section: "B", status: "Active" },
  { id: 122, name: "Ishita Agarwal", branch: "ECE", year: "I", email: "ishita.a@college.edu", phone: "9876543231", cgpa: "9.0", section: "A", status: "Active" },
  { id: 123, name: "Nikhil Bhatt", branch: "EEE", year: "II", email: "nikhil.b@college.edu", phone: "9876543232", cgpa: "8.2", section: "B", status: "Active" },
  { id: 124, name: "Megha Kulkarni", branch: "AIML", year: "III", email: "megha.k@college.edu", phone: "9876543233", cgpa: "9.2", section: "A", status: "Active" },
  { id: 125, name: "Suresh Pillai", branch: "CIVIL", year: "III", email: "suresh.p@college.edu", phone: "9876543234", cgpa: "7.7", section: "C", status: "Active" },
  { id: 126, name: "Shreya Ghoshal", branch: "CSE", year: "II", email: "shreya.g@college.edu", phone: "9876543235", cgpa: "9.7", section: "A", status: "Active" },
  { id: 127, name: "Akash Deshmukh", branch: "IT", year: "III", email: "akash.d@college.edu", phone: "9876543236", cgpa: "8.5", section: "B", status: "Active" },
  { id: 128, name: "Trisha Krishnan", branch: "ECE", year: "IV", email: "trisha.k@college.edu", phone: "9876543237", cgpa: "8.9", section: "A", status: "Active" },
  { id: 129, name: "Karthik Raja", branch: "MECH", year: "II", email: "karthik.r@college.edu", phone: "9876543238", cgpa: "7.9", section: "B", status: "Active" },
  { id: 130, name: "Rashmika Sen", branch: "DATA SCIENCE", year: "I", email: "rashmika.s@college.edu", phone: "9876543239", cgpa: "9.1", section: "A", status: "Active" },
  { id: 131, name: "Harish Kalyan", branch: "AIML", year: "IV", email: "harish.k@college.edu", phone: "9876543240", cgpa: "8.4", section: "C", status: "Active" },
  { id: 132, name: "Pavithra Lokesh", branch: "CSE", year: "III", email: "pavithra.l@college.edu", phone: "9876543241", cgpa: "9.0", section: "B", status: "Active" },
  { id: 133, name: "Naveen Patnaik", branch: "EEE", year: "IV", email: "naveen.p@college.edu", phone: "9876543242", cgpa: "8.1", section: "A", status: "Active" },
  { id: 134, name: "Bhuvaneshwari M", branch: "IT", year: "I", email: "bhuvaneshwari.m@college.edu", phone: "9876543243", cgpa: "8.8", section: "A", status: "Active" },
  { id: 135, name: "Chetan Bhagat", branch: "CSE", year: "II", email: "chetan.b@college.edu", phone: "9876543244", cgpa: "7.4", section: "C", status: "Active" },
  { id: 136, name: "Jyothi Rai", branch: "ECE", year: "III", email: "jyothi.r@college.edu", phone: "9876543245", cgpa: "8.7", section: "A", status: "Active" },
  { id: 137, name: "Tarun Tej", branch: "MECH", year: "IV", email: "tarun.t@college.edu", phone: "9876543246", cgpa: "8.2", section: "B", status: "Active" },
  { id: 138, name: "Shruti Haasan", branch: "AIML", year: "II", email: "shruti.h@college.edu", phone: "9876543247", cgpa: "9.3", section: "A", status: "Active" },
  { id: 139, name: "Gautham Menon", branch: "CSE", year: "IV", email: "gautham.m@college.edu", phone: "9876543248", cgpa: "8.6", section: "B", status: "Active" },
  { id: 140, name: "Preeti Zinta", branch: "DATA SCIENCE", year: "II", email: "preeti.z@college.edu", phone: "9876543249", cgpa: "8.9", section: "A", status: "Active" },
  { id: 141, name: "Yashwant Sinha", branch: "CIVIL", year: "II", email: "yashwant.s@college.edu", phone: "9876543250", cgpa: "7.8", section: "B", status: "Active" },
  { id: 142, name: "Vandana Shiva", branch: "ECE", year: "IV", email: "vandana.s@college.edu", phone: "9876543251", cgpa: "9.4", section: "A", status: "Active" },
  { id: 143, name: "Rajesh Hamal", branch: "IT", year: "III", email: "rajesh.h@college.edu", phone: "9876543252", cgpa: "8.3", section: "C", status: "Active" },
  { id: 144, name: "Lavanya Tripathi", branch: "AIML", year: "I", email: "lavanya.t@college.edu", phone: "9876543253", cgpa: "9.1", section: "A", status: "Active" },
  { id: 145, name: "Pradeep Rawat", branch: "EEE", year: "III", email: "pradeep.r@college.edu", phone: "9876543254", cgpa: "7.9", section: "B", status: "Active" },
  { id: 146, name: "Sowmya Swaminathan", branch: "CSE", year: "III", email: "sowmya.s@college.edu", phone: "9876543255", cgpa: "9.5", section: "A", status: "Active" },
  { id: 147, name: "Nitin Gadkari", branch: "CIVIL", year: "IV", email: "nitin.g@college.edu", phone: "9876543256", cgpa: "8.0", section: "A", status: "Active" },
  { id: 148, name: "Tanvi Ram", branch: "ECE", year: "II", email: "tanvi.r@college.edu", phone: "9876543257", cgpa: "8.8", section: "B", status: "Active" },
  { id: 149, name: "Abhinav Bindra", branch: "MECH", year: "I", email: "abhinav.b@college.edu", phone: "9876543258", cgpa: "8.5", section: "C", status: "Active" },
  { id: 150, name: "Archana Puran", branch: "DATA SCIENCE", year: "IV", email: "archana.p@college.edu", phone: "9876543259", cgpa: "9.2", section: "A", status: "Active" }
];

export const courses = [
  {
    id: 201,
    name: "Data Structures & Algorithms",
    code: "CS201",
    credits: 4,
    department: "CSE",
    instructor: "Dr. V. Ramanujan",
    description: "Fundamental concepts of linear and non-linear data structures including trees, graphs, sorting, and algorithm complexity."
  },
  {
    id: 202,
    name: "Database Management Systems",
    code: "CS202",
    credits: 4,
    department: "CSE",
    instructor: "Prof. S. Nambiar",
    description: "Relational database concepts, SQL queries, normalization, transaction management, and indexing strategies."
  },
  {
    id: 203,
    name: "Operating Systems",
    code: "CS203",
    credits: 4,
    department: "CSE",
    instructor: "Dr. A. P. Rao",
    description: "Process management, CPU scheduling, concurrency, deadlock prevention, memory management, and file systems."
  },
  {
    id: 204,
    name: "Computer Networks",
    code: "CS204",
    credits: 3,
    department: "CSE",
    instructor: "Prof. Meera Sen",
    description: "Layered network architecture, OSI reference model, TCP/IP protocol suite, routing algorithms, and network security."
  },
  {
    id: 205,
    name: "Machine Learning Fundamentals",
    code: "AI301",
    credits: 4,
    department: "AIML",
    instructor: "Dr. R. K. Naidu",
    description: "Supervised and unsupervised learning, regression, classification models, neural networks, and model evaluation techniques."
  }
];
