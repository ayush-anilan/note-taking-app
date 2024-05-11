# Note Taking App

This app should allow new users to sign up using email with verification, and they must log in to create, view, update, and delete notes.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL
- Authentication: JSON Web Tokens (JWT)
- Password Encryption: bcrypt
- Frameworks: Tailwind CSS

## Features

- Users can sign up with a unique email address.
- Upon signup, an email is sent to the user's email address for verification.
- Users can verify their email address by clicking on a verification link.
- Once verified, users can log in with their email and password.
- After logging in, users can:
  - Create a new note with a title and content.
  - View a list of all notes.
  - View, edit, or delete a specific note.
- Error handling is implemented for invalid requests.
- Authentication is implemented using JWT tokens.
- Search functionality is added to search for notes.
- Pagination is implemented for the list of notes.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have Node.js and MongoDB installed on your local machine.

- Node.js: [Download](https://nodejs.org/)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ayush-anilan/note-taking-app.git
2. Navigate to the project directory:
   ```bash
   cd note-taking-app
3. Install dependencies
   ```bash
   npm install

### Configuration
1. Create a .env file in the backend directory with the following variables:
    PORT=3000
    // For SMTP
    GMAIL_USERNAME=your@gmail.com	
    GMAIL_PASSWORD=yourpassword
    DATABASE_URL=your-database-url
    SECRET_KEY=your-secret-key
2. Create a .env file in the frontend directory with the following variables:
    VITE_API_URL=http://localhost:3000/api

### Running the Application
1. Start the backend server:
   ```bash
   npm run start-server
2. Start the frontend development server:
   ```bash
   npm install vite --save-dev
   npm run start-client
   
3. Open your browser and go to http://localhost:3000 to see the application's backend running.

4. Open your browser and go to http://localhost:5173 to see the application's backend running.




## Screenshots

#### Home Page

[![home-page-note-taking.png](https://i.postimg.cc/nL5R7c2v/home-page-note-taking.png)](https://postimg.cc/67rfxKD3)

#### Login Page

[![login-page-note-taking.png](https://i.postimg.cc/FzxVP9yC/login-page-note-taking.png)](https://postimg.cc/wR7NMYbD)

#### Register Page

[![register-page-note-taking.png](https://i.postimg.cc/PfbyfMgb/register-page-note-taking.png)](https://postimg.cc/3WRmn2JW)

#### Note list

[![notelist.png](https://i.postimg.cc/RhPn6qQm/notelist.png)](https://postimg.cc/XBCvtjz1)

#### Create note

[![create-note-page.png](https://i.postimg.cc/653ZsLtp/create-note-page.png)](https://postimg.cc/kD0GKS20)

#### Search

[![search-page.png](https://i.postimg.cc/q78hc1Xj/search-page.png)](https://postimg.cc/d7VVwmfy)

#### Pagination

[![pagination.png](https://i.postimg.cc/cCJvS0qb/pagination.png)](https://postimg.cc/gXfzy92V)

### Author
Ayush Anilan
