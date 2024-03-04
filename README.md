# HomeStays

## Overview

This project is a full-stack web application developed using MERN stack (MongoDB, Express.js, React.js, Node.js). It provides the core functionality of a hotel booking website like aibnb or similar, allowing users to browse for accommodations, view details, make bookings, and manage their listings.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Vipu97/HomeStays.git

   ```

2. **Install dependencies:**

   Navigate to client directory and install frontend dependencies using npm

   ```
   npm install
   ```

   Similary navigate to api folder and install backend dependencies

   ```
   npm install
   ```

3. **ENV variables:**

   - create .env file in the client folder and add these variables

     #### VITE_BASE_URL= http://localhost:4000


   - create .env file in the api folder and add these variables

     #### PORT= port number

     #### MONGO_URL= your db url

     #### JWT_SECRET= your secret (string)

     #### BUCKET_NAME = your S3 bucket name

     #### S3_ACCESS_KEY = your S3 bucket key

     #### CS3_SECRET_ACCESS_KEY = your S3 bucket secret access key

     #### CLIENT_URL= http://localhost:5173

4. **Run project:**
   - Open terminal, navigate to client directory and run below command to start frontend
   ```
       npm run dev
   ```
   - Open another terminal, navigate to api directory and run this command to start backend server
   ```
       nodemon index.js
   ```

## Features

- **User Authentication:** Users can sign up, log in, and log out securely. Passwords are hashed for security.

- **View Listings:** Users can view detailed information about each accommodation, including photos, descriptions, amenities.

- **Make Bookings:** Authenticated users can book accommodations for specific dates.

- **Manage Listings:** Hosts can create, edit, and delete their listings.

- **Responsive Design:** The application is designed to be responsive and work seamlessly across different devices.

## Technologies Used

- **MongoDB:** NoSQL database for storing user data, listings.
- **Express.js:** Web application framework for building the backend server.
- **React.js:** JavaScript library for building the user interface.
- **Node.js:** JavaScript runtime environment for executing server-side code.
- **Tailwind CSS:** A utility-first CSS framework
- **JWT:** JSON Web Tokens for secure user authentication.
- **AWS S3:** Cloud-based image management for storing and serving images.
