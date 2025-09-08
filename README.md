## Student Management Dashboard

Efficiently manage and track student data with this responsive React dashboard featuring search, add, edit, delete, and data persistence.

---

The deployed project link : https://student-management-dashboard-five.vercel.app/

## Project Overview



This React-based dashboard simplifies student management by allowing you to:  
- View key statistics: total students, active students, and courses  
- Search students live by name, email, or course  
- Add, edit, and delete student entries with modals  
- View detailed student profiles  
- Persist data locally so changes survive page reloads  

![Dashboard Screenshot](dashboard-screenshot.png)



## Architecture and Data Flow

The architecture is composed of modular React components with a central custom hook managing state and persistence:

- **useStudentManager hook**: Handles student data state and saves to `localStorage`. Provides add, update, delete methods.  
- **App**: Fetches course data, manages search/filter state, and controls modal visibility.  
- **StatsCards**: Displays total student statistics.  
- **SearchBar**: Search input and add student button.  
- **StudentList**: Renders student cards with actions to view, edit, or delete.  
- **StudentModal**: Modal form for adding/editing students with validation.  
- **StudentDetailsModal**: Presents read-only detailed student info with edit shortcut.  

Data flows top-down via props; interactions bubble up through callbacks to keep consistent state and persistence.

---

## Screenshot

![Dashboard Screenshot](dashboard-screenshot.png)

### Add Student Form  
![Add Student](Add--Student.png)

### Edit Student Form  
![Edit Student](Edit_Student.png)

### Course List View  
![Course List](List--Courses.png)

### Student Details Modal  
![Student Profile](Student-profile.png)


## Project Structure

- **assets/**  
  Contains static image files and screenshots used in the project.  
  - `dashboard-screenshot.png` — Main dashboard overview screenshot.

- **components/**  
  Holds reusable React UI components organized by feature.  
  - `StatsCards.jsx` — Displays summary cards for total students, active students, and courses.  
  - `SearchBar.jsx` — Search input field and Add Student button.  
  - `StudentList.jsx` — Renders the list/grid of student cards.  
  - `StudentCard.jsx` — Represents individual student cards with actions.  
  - `StudentModal.jsx` — Form modal for adding and editing student details.  
  - `StudentDetailsModal.jsx` — Modal for viewing detailed student information.

- **hooks/**  
  Contains custom React hooks to encapsulate state logic.  
  - `useStudentManager.js` — Manages student data state with persistence to localStorage.

- **services/**  
  Services for data fetching and business logic.  
  - `coursesService.js` — Simulated API to fetch course-related data.

- **App.jsx**  
  The root React component integrating routing, state, and UI components.

- **App.css**  
  Contains global and component-specific styles.


## Getting Started

1. Clone the repo:  
git clone https://github.com/vaibhavipatil0241/Student-Management-Dashboard.git

2. Install dependencies:  
npm install

3. Run locally:  
npm start

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

This concise README highlights the core features, architecture, and provides a single key screenshot for a clear project introduction.
