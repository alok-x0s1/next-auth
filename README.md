# Next Auth

Next Auth is a Next.js project designed to demonstrate essential backend functionalities such as user authentication, email verification, and profile management. This project focuses on leveraging Next.js built-in features to manage both frontend and backend processes seamlessly.

## Features

-   **User Authentication**: Secure user registration, login, and logout using NextAuth.js.
-   **Email Verification**: Send verification emails to users after registration to confirm their email addresses.
-   **Profile Management**: Allow users to view and update their profile details securely.

## Tech Stack

-   **Next.js**: React framework with full-stack capabilities.
-   **MongoDB**: NoSQL database for storing user data.
-   **Mongoose**: ODM for MongoDB to model application data.
-   **Nodemailer**: Node.js library for sending emails from Next.js API routes.
-   **Tailwind CSS**: Utility-first CSS framework for styling the application.
-   **BcryptJs**: For password hashing and generating some hash.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/alok-x0s1/next-auth.git
    cd next-auth
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```plaintext
        MONGO_URI=your_mongodb_connection_string
        DOMAIN=http://localhost:3000
        ACCESS_TOKEN_SECRET=your secret token
        ACCESS_TOKEN_EXPIRY= your secret token expiry time
        NEXTAUTH_SECRET=your_nextauth_secret
        USER_MAIL=your_email_address
        MAIL_HOST=your smtp_host
        MAIL_PORT=your smtp_port
        MAIL_USER=your smtp_email_user
        MAIL_PASS=your smtp_email_password
    ```    

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### 1. User Registration and Login

Users can register by providing their email and password. They will receive a verification email to confirm their email address. After verification, they can log in and access their profile.

### 2. Email Verification

Upon registration, a verification link is sent to the user's email. The account becomes active only after the email is verified.

### 3. Profile Management

Authenticated users can view and update their profile information such as name and email from the profile section.

## Contributing

If you'd like to contribute, feel free to fork the repository and submit a pull request.
