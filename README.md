# User Management App

This is a React-based User Management App that allows users to view a list of users, search by name, filter by city, and view detailed information about each user. The app is built using React, Redux Toolkit, React Router, TypeScript, and Tailwind CSS.

---

## Features

### 1. User List Display
- Displays a list of users in a card layout.
- Each card contains the user's name, address, email, and phone number.

### 2. Search Functionality
- Search users by their name using the search bar in the navbar.

### 3. City Filter
- Filter users based on their city using a dropdown menu.

### 4. Responsive Design
- The application is fully responsive, with a mobile-friendly menu toggle for smaller screens.

### 5. User Details View
- Clicking on a user's "View Details" button navigates to a detailed view containing additional information like username, website, and company details.

### 6. Redux State Management
- Global state management using Redux Toolkit for handling user data and filters.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- npm or yarn package manager installed.

---

## Instructions to Run the Project

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

4. **Run Tests**
   To run the unit tests for the application:
   ```bash
   npm run test
   ```

5. **Build for Production**
   To create a production build of the app:
   ```bash
   npm run build
   ```

6. **Serve the Production Build**
   To preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Technologies Used

- **Frontend Framework**: React with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Unit Testing**: React Testing Library, Jest

---
