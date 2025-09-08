
## Student Management Dashboard

Manage and track student information efficiently with a modern, responsive React application.



## Project Overview

This dashboard allows you to:
- View key statistics at a glance (total students, active students, total courses)  
- Search, add, edit, and delete student records  
- Persist data in `localStorage` to survive page reloads  
- Present detailed student info in a modal  

![Dashboard Screenshot](dashboard-screenshot.png)



## Architecture and Data Flow

App
│
├── useStudentManager.js # Custom hook for state & persistence
│ ├─ students state
│ ├─ addStudent()
│ ├─ updateStudent()
│ └─ deleteStudent()
│
├── StatsCards.jsx # Total / Active / Courses cards
├── SearchBar.jsx # Search input + Add Student button
├── StudentList.jsx # Renders grid of StudentCard
│ └── StudentCard.jsx # Single student card with View/Edit/Delete
│ └── StudentDetailsModal.jsx
│
└── StudentModal.jsx # Add/Edit student form

text

Data flow:
1. **Initialization**  
   `useStudentManager` loads from `localStorage` or sample data.  
2. **User Actions**  
   - Add/Edit via `StudentModal` → calls hook → updates state & storage  
   - Delete via `StudentCard` → calls hook → updates state & storage  
   - View opens `StudentDetailsModal` (read-only)  
3. **Derived State**  
   `App` filters students by search term and computes active count.

![Flow Diagram](List--Courses.png)

---

## File Structure

student-management-dashboard/
├── public/
│ └── index.html
├── src/
│ ├── assets/
│ │ ├── dashboard-screenshot.png
│ │ ├── Add--Student.png
│ │ ├── Edit_Student.png
│ │ ├── List--Courses.png
│ │ └── Student-profile.png
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── StatsCards.jsx
│ │ ├── SearchBar.jsx
│ │ ├── StudentList.jsx
│ │ ├── StudentCard.jsx
│ │ ├── StudentDetailsModal.jsx
│ │ └── StudentModal.jsx
│ ├── hooks/
│ │ └── useStudentManager.js
│ ├── services/
│ │ └── coursesService.js
│ ├── App.jsx
│ ├── App.css
│ └── index.js
├── .gitignore
└── README.md

text

---

## Screenshots

### Add Student Form  
![Add Student](Add--Student.png)

### Edit Student Form  
![Edit Student](Edit_Student.png)

### Course List Card  
![Courses List](List--Courses.png)

### Student Profile Modal  
![Student Profile](Student-profile.png)

---

## Getting Started

1. Clone the repo  
git clone https://github.com/vaibhavipatil0241/Student-Management-Dashboard.git

text
2. Install dependencies  
npm install

text
3. Run development server  
npm start

text
4. Open [http://localhost:3000](http://localhost:3000)  

Your dashboard should now be up and running!
can you give complete code for readmi that show my all screenshot.png file and project overview completely

can you give complete code for readmi that show my all screenshot.png file and project overview completely
text
# Student Management Dashboard

Manage and track student information efficiently with a user-friendly React dashboard featuring responsive layout, persistent data, and essential student management functions.

---

## Project Overview

This Student Management Dashboard is a React-based single-page application designed to efficiently manage student data. It enables users to:

- View summary statistics: total students, active students, and total courses.  
- Search students by name, email, or course.  
- Add new students through a clean, validated modal form.  
- Edit existing student records with prefilled data in the modal.  
- View detailed student profiles in a read-only modal.  
- Delete students with confirmation and instant UI update.  
- Persist all data changes locally so information survives page refreshes.  

The UI is fully responsive and uses modern CSS for smooth transitions and clean layouts. The project includes practical React hooks, component modularization, and localStorage integration for persistence.

---

## Architecture and Data Flow

App
├── useStudentManager Hook
│ ├─ Manages students state and localStorage persistence
│ ├─ Supports addStudent, updateStudent, deleteStudent
├── StatsCards
│ ├─ Shows total students, active students, and total courses
├── SearchBar
│ ├─ Search input and Add Student button
├── StudentList
│ ├─ Maps filtered students to StudentCard
│ └── StudentCard
│ ├─ Display student's basic info and status
│ ├─ View Details button opens StudentDetailsModal
│ ├─ Edit button opens StudentModal with data
│ └─ Delete button removes a student after confirmation
├── StudentModal
│ ├─ Shows a form for Add/Edit student
│ └─ Handles form validation and submission
└── StudentDetailsModal
├─ Shows detailed info for selected student (read-only)
└─ Edit button opens StudentModal preloaded with data

text

Data flows from the `useStudentManager` hook through props to `App` and child components. Changes in student state trigger updates to localStorage, ensuring persistence. The UI reflects search filtering and component-level state for modals.

---

## Screenshots

### Dashboard Overview  
![Dashboard Screenshot](dashboard-screenshot.png)

### Add Student Form  
![Add Student](Add--Student.png)

### Edit Student Form  
![Edit Student](Edit_Student.png)

### Course List View  
![Course List](List--Courses.png)

### Student Details Modal  
![Student Profile](Student-profile.png)

---

## Project Structure

student-management-dashboard/
├── assets/
│ ├── dashboard-screenshot.png
│ ├── Add--Student.png
│ ├── Edit_Student.png
│ ├── List--Courses.png
│ └── Student-profile.png
├── components/
│ ├── Header.jsx
│ ├── StatsCards.jsx
│ ├── SearchBar.jsx
│ ├── StudentList.jsx
│ ├── StudentCard.jsx
│ ├── StudentDetailsModal.jsx
│ └── StudentModal.jsx
├── hooks/
│ └── useStudentManager.js
├── services/
│ └── coursesService.js
├── App.jsx
├── App.css
└── README.md

text

---

## Getting Started

1. **Clone the repository:**  
git clone https://github.com/vaibhavipatil0241/Student-Management-Dashboard.git

text

2. **Install dependencies:**  
npm install

text

3. **Run the application:**  
npm start

text

4. **Open in browser:**  
Visit `http://localhost:3000` to interact with the Student Management Dashboard.

---

## License

This project is licensed under the MIT License.

---

Thank you for checking out this project! Feel free to open issues or submit pull req
