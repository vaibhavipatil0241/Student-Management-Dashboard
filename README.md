Student Management Dashboard

A React single-page application that allows adding, editing, and viewing students. Each student has a name, email, enrolled course, and profile image.

## Project Overview
This Student Management Dashboard is a React single-page application designed to make managing student records intuitive and efficient. It features:

Student Cards displaying profile initials or images, name, email, enrolled course, enrollment date, and status badge (active/inactive)

Statistics Cards showing total students, active students, and total courses at a glance

Search Bar with live filtering by name, email, or course, plus a prominent Add Student button

Modals for viewing detailed student information, editing existing records, and adding new students

Persistent Storage using localStorage so all additions, updates, and deletions survive page reloads

The UI is fully responsive, adapting seamlessly between desktop and mobile layouts, and uses modern CSS for smooth hover effects, card layouts, and form validation feedback.

## Architecture and Data Flow

The application’s architecture centers on functional React components with unidirectional data flow:

1.useStudentManager Hook

 Manages the students state array

 Initializes from localStorage or fallback sample data

 Provides addStudent, updateStudent, and deleteStudent functions that update state and persist changes

2.App Component

 Fetches course list asynchronously via coursesService

 Tracks students, editingStudent, searchTerm, and showModal state

 Filters students for display based on searchTerm

 Computes derived values like activeStudents for stats cards

 Handles opening/closing modals for add, edit, and view operations

3.StatsCards Component

 Receives totalStudents, activeStudents, and totalCourses as props

 Renders three cards with icons and gradient backgrounds

4.SearchBar Component

 Receives searchValue, onSearchChange, and onAddClick props

 Renders a text input for live filtering and an Add Student button

5.StudentList & StudentCard Components

 StudentList maps over filtered students and renders StudentCard

 Each card shows key details and action buttons for View, Edit, and Delete

 Clicking View opens StudentDetailsModal; Edit and Delete invoke handler props

6.StudentModal & StudentDetailsModal Components

 StudentModal is used for both adding and editing, with form validation and status/course dropdowns

 StudentDetailsModal displays read-only student info with a prominent Edit button

 All components communicate via props and callbacks, maintaining a clear separation of concerns. State updates occur only in the custom hook, ensuring predictable, testable  data flow and easy persistence via localStorage.

## Features

- Add new students via a validated form
- List all students
- Edit existing student details
- Responsive, attractive UI for desktop and mobile
- Fetches courses list from mock API using async/await

## Installation

1. Clone the repository:
git clone https://github.com/vaibhavipatil0241/student-management-dashboard.git

2. Navigate into the project folder:
cd student-management-dashboard


3. Install dependencies:
npm install


4. Start the development server:
npm start


## Usage

1. Fill out the form on the left to add or edit student details.  
2. View and edit existing students in the table on the right.  
3. The UI adapts to mobile and desktop screens.

## Technologies

- React (Hooks, Functional Components)  
- CSS Grid and Flexbox for layout  
- Custom CSS for styling  
- Async/Await for API calls  

## Contributing

Feel free to submit issues or pull requests.

## License

MIT License
