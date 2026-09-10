# Student Marks & Grade Management System 🎓

A responsive, professional React-based Academic Management System built with **React.js**, **Vite**, and **Plain CSS**.

Developed for **ABC Institute of Technology** faculty members to view students, filter roster, update subject marks, validate inputs (0–100), and dynamically compute student performance metrics including Total Marks, Average Percentage, Letter Grade, Pass/Fail Status, and Overall Class Average.

---

## 🚀 Features

- **👨‍🎓 Student Roster Management**: View detailed student profiles (ID, Name, Department).
- **🔍 Dynamic Case-Insensitive Search**: Filter students in real time by name.
- **📝 Controlled Marks Entry Form**: Faculty can update marks for 5 core subjects:
  - Data Structures
  - Database Management Systems
  - Computer Networks
  - Operating Systems
  - Web Development
- **⚠️ Inline Mark Validation**: Ensures marks entered are valid numerical values strictly between `0` and `100`.
- **📊 Real-Time Dynamic Calculations**:
  - **Total Marks**: Automatically calculated across all subjects.
  - **Average Percentage**: Computed to 2 decimal places.
  - **Pass / Fail Status**: Displays `PASS` if average ≥ 40%, otherwise `FAIL`.
- **🏆 Conditional Letter Grading System**:
  - `90% – 100%`: **A+**
  - `80% – 89%`: **A**
  - `70% – 79%`: **B+**
  - `60% – 69%`: **B**
  - `50% – 59%`: **C**
  - `40% – 49%`: **D**
  - `Below 40%`: **F**
- **🏛️ Overall Class Average**: Dynamic metric calculating average performance across all enrolled students and subjects in real-time.
- **📱 Responsive Dashboard UI**: Modern card-based layout optimized for desktop, tablet, and mobile screens.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 (`useState`, props, controlled components)
- **Build Tool**: Vite
- **Language**: JavaScript (JSX)
- **Styling**: Plain CSS (CSS Variables, Flexbox, CSS Grid)
- **Fonts**: Google Fonts (*Outfit* & *Inter*)

---

## 📁 Project Structure

```
Devops_Week-6-Thursday/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── StudentList.jsx   # Roster listing & search bar
│   │   ├── Student.jsx       # Individual student card component
│   │   ├── MarksForm.jsx     # Subject marks input form with inline validation
│   │   ├── Result.jsx        # Total, average, pass/fail status & grade summary
│   │   └── Grade.jsx         # Dynamic grade badge pill component
│   ├── App.jsx               # Main container, state management & metrics
│   ├── App.css               # Dashboard layout styles & responsive queries
│   ├── index.css             # Theme variables, typography & resets
│   └── main.jsx              # React DOM root entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Quick Start & Setup

### 1. Clone the repository
```bash
git clone https://github.com/jashu2104/Devops_Week-6-Thursday.git
cd Devops_Week-6-Thursday
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 🧠 React Concepts Demonstrated

1. **State Management (`useState`)**: Single source of truth for students roster, selected student, and search filter in `App.jsx`.
2. **React Props**: Unidirectional data flow passing state and callback handlers to child components (`<StudentList />`, `<Student />`, `<MarksForm />`, `<Result />`, `<Grade />`).
3. **Controlled Inputs**: Binding mark inputs directly to React state with onChange handlers.
4. **Immutable State Updates**: Updating nested subject mark state immutably using array mapping and object spread syntax.
5. **Conditional Rendering**: Dynamic UI elements for PASS/FAIL badges, inline validation alerts, and letter grade themes.
