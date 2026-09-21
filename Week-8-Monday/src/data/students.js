export const initialStudents = [
  {
    id: 1,
    name: "Rahul Kumar",
    rollNumber: "23CS001",
    branch: "CSE",
    semester: "4th Sem",
    email: "rahul.k@college.edu",
    phone: "+91 98765 43210",
    totalClasses: 50,
    attendedClasses: 42,
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "absent" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 2,
    name: "Anjali Reddy",
    rollNumber: "23CS002",
    branch: "CSE",
    semester: "4th Sem",
    email: "anjali.r@college.edu",
    phone: "+91 98765 43211",
    totalClasses: 50,
    attendedClasses: 47,
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 3,
    name: "Arjun Sharma",
    rollNumber: "23CS101",
    branch: "CSE",
    semester: "4th Sem",
    email: "arjun.s@college.edu",
    phone: "+91 98765 43212",
    totalClasses: 50,
    attendedClasses: 35, // 70% - Below threshold
    todayStatus: "absent",
    history: [
      { date: "Sep 20, 2026", status: "absent" },
      { date: "Sep 19, 2026", status: "absent" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "absent" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 4,
    name: "Sneha Patel",
    rollNumber: "23AI001",
    branch: "AIML",
    semester: "4th Sem",
    email: "sneha.p@college.edu",
    phone: "+91 98765 43213",
    totalClasses: 50,
    attendedClasses: 48, // 96%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 5,
    name: "Vikram Singh",
    rollNumber: "23AI012",
    branch: "AIML",
    semester: "4th Sem",
    email: "vikram.s@college.edu",
    phone: "+91 98765 43214",
    totalClasses: 50,
    attendedClasses: 32, // 64% - Below threshold
    todayStatus: "absent",
    history: [
      { date: "Sep 20, 2026", status: "absent" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "absent" },
      { date: "Sep 17, 2026", status: "absent" },
      { date: "Sep 16, 2026", status: "absent" },
    ]
  },
  {
    id: 6,
    name: "Priya Rao",
    rollNumber: "23EC005",
    branch: "ECE",
    semester: "4th Sem",
    email: "priya.rao@college.edu",
    phone: "+91 98765 43215",
    totalClasses: 50,
    attendedClasses: 41, // 82%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "absent" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 7,
    name: "Karthik Rao",
    rollNumber: "23EC044",
    branch: "ECE",
    semester: "4th Sem",
    email: "karthik.r@college.edu",
    phone: "+91 98765 43216",
    totalClasses: 50,
    attendedClasses: 36, // 72% - Below threshold
    todayStatus: "absent",
    history: [
      { date: "Sep 20, 2026", status: "absent" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "absent" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "absent" },
    ]
  },
  {
    id: 8,
    name: "Neha Verma",
    rollNumber: "23CY001",
    branch: "CSE-Cyber Security",
    semester: "4th Sem",
    email: "neha.v@college.edu",
    phone: "+91 98765 43217",
    totalClasses: 50,
    attendedClasses: 45, // 90%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "absent" },
    ]
  },
  {
    id: 9,
    name: "Rohit Kumar",
    rollNumber: "23CY009",
    branch: "CSE-Cyber Security",
    semester: "4th Sem",
    email: "rohit.k@college.edu",
    phone: "+91 98765 43218",
    totalClasses: 50,
    attendedClasses: 39, // 78%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "absent" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 10,
    name: "Divya Joshi",
    rollNumber: "23EE002",
    branch: "EEE",
    semester: "4th Sem",
    email: "divya.j@college.edu",
    phone: "+91 98765 43219",
    totalClasses: 50,
    attendedClasses: 44, // 88%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "absent" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 11,
    name: "Aarav Mehta",
    rollNumber: "23EE018",
    branch: "EEE",
    semester: "4th Sem",
    email: "aarav.m@college.edu",
    phone: "+91 98765 43220",
    totalClasses: 50,
    attendedClasses: 33, // 66% - Below threshold
    todayStatus: "absent",
    history: [
      { date: "Sep 20, 2026", status: "absent" },
      { date: "Sep 19, 2026", status: "absent" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "absent" },
      { date: "Sep 16, 2026", status: "absent" },
    ]
  },
  {
    id: 12,
    name: "Kavya Nair",
    rollNumber: "23ME001",
    branch: "MECH",
    semester: "4th Sem",
    email: "kavya.n@college.edu",
    phone: "+91 98765 43221",
    totalClasses: 50,
    attendedClasses: 46, // 92%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 13,
    name: "Siddharth Deshmukh",
    rollNumber: "23ME005",
    branch: "MECH",
    semester: "4th Sem",
    email: "sid.d@college.edu",
    phone: "+91 98765 43222",
    totalClasses: 50,
    attendedClasses: 40, // 80%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "absent" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 14,
    name: "Meera Gupta",
    rollNumber: "23CS050",
    branch: "CSE",
    semester: "4th Sem",
    email: "meera.g@college.edu",
    phone: "+91 98765 43223",
    totalClasses: 50,
    attendedClasses: 49, // 98%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 15,
    name: "Aditya Bhatt",
    rollNumber: "23AI025",
    branch: "AIML",
    semester: "4th Sem",
    email: "aditya.b@college.edu",
    phone: "+91 98765 43224",
    totalClasses: 50,
    attendedClasses: 38, // 76%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "absent" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "absent" },
    ]
  },
  {
    id: 16,
    name: "Ishita Saxena",
    rollNumber: "23EC030",
    branch: "ECE",
    semester: "4th Sem",
    email: "ishita.s@college.edu",
    phone: "+91 98765 43225",
    totalClasses: 50,
    attendedClasses: 31, // 62% - Below threshold
    todayStatus: "absent",
    history: [
      { date: "Sep 20, 2026", status: "absent" },
      { date: "Sep 19, 2026", status: "absent" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "absent" },
      { date: "Sep 16, 2026", status: "absent" },
    ]
  },
  {
    id: 17,
    name: "Yash Nambiar",
    rollNumber: "23CY015",
    branch: "CSE-Cyber Security",
    semester: "4th Sem",
    email: "yash.n@college.edu",
    phone: "+91 98765 43226",
    totalClasses: 50,
    attendedClasses: 43, // 86%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "absent" },
    ]
  },
  {
    id: 18,
    name: "Tara Choudhury",
    rollNumber: "23EE033",
    branch: "EEE",
    semester: "4th Sem",
    email: "tara.c@college.edu",
    phone: "+91 98765 43227",
    totalClasses: 50,
    attendedClasses: 41, // 82%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "absent" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 19,
    name: "Rohan Iyer",
    rollNumber: "23ME020",
    branch: "MECH",
    semester: "4th Sem",
    email: "rohan.i@college.edu",
    phone: "+91 98765 43228",
    totalClasses: 50,
    attendedClasses: 34, // 68% - Below threshold
    todayStatus: "absent",
    history: [
      { date: "Sep 20, 2026", status: "absent" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "absent" },
      { date: "Sep 17, 2026", status: "absent" },
      { date: "Sep 16, 2026", status: "absent" },
    ]
  },
  {
    id: 20,
    name: "Tanvi Kulkarni",
    rollNumber: "23CS088",
    branch: "CSE",
    semester: "4th Sem",
    email: "tanvi.k@college.edu",
    phone: "+91 98765 43229",
    totalClasses: 50,
    attendedClasses: 46, // 92%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 21,
    name: "Harsh Vardhan",
    rollNumber: "23AI040",
    branch: "AIML",
    semester: "4th Sem",
    email: "harsh.v@college.edu",
    phone: "+91 98765 43230",
    totalClasses: 50,
    attendedClasses: 42, // 84%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "absent" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  },
  {
    id: 22,
    name: "Bhavya Pillai",
    rollNumber: "23EC060",
    branch: "ECE",
    semester: "4th Sem",
    email: "bhavya.p@college.edu",
    phone: "+91 98765 43231",
    totalClasses: 50,
    attendedClasses: 48, // 96%
    todayStatus: "present",
    history: [
      { date: "Sep 20, 2026", status: "present" },
      { date: "Sep 19, 2026", status: "present" },
      { date: "Sep 18, 2026", status: "present" },
      { date: "Sep 17, 2026", status: "present" },
      { date: "Sep 16, 2026", status: "present" },
    ]
  }
];

export const branchesList = [
  "All Branches",
  "CSE",
  "CSE-Cyber Security",
  "AIML",
  "ECE",
  "EEE",
  "MECH"
];

export const initialActivities = [
  { id: 1, text: "Rahul Kumar marked Present", time: "2 minutes ago", type: "present" },
  { id: 2, text: "Arjun Sharma marked Absent", time: "5 minutes ago", type: "absent" },
  { id: 3, text: "Sneha Patel marked Present", time: "12 minutes ago", type: "present" },
  { id: 4, text: "Attendance session initialized for today", time: "1 hour ago", type: "system" },
];
