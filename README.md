# PaisaPlanner

## Project Status: Completed

PaisaPlanner is a web application aimed at simplifying expense management. It provides users with tools to track income, categorize expenses, and visualize financial data through intuitive dashboards.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Work Done](#work-done)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Registration and Login
- Add Expenses
- Add Income
- Categorize Expenses
- Visualize Financial Data through Dashboards
- Dark Mode Support

## Technologies Used
- Node.js
- Express
- MongoDB
- RESTful APIs
- Tailwind CSS
- React (Frontend)


## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites
- Node.js and npm installed on your local machine.

### Installation

1. Clone the repo
   ```sh
   https://github.com/thegeek36/PaisaPlanner.git
   ```
2. Navigate to the project directory
   ```sh
   cd paisaplanner
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

### Running the Project

1. Set up environment variables (see [Environment Variables](#environment-variables) section).
2. Start the backend server
   ```sh
   npm start
   ```
3. Navigate to the frontend directory
   ```sh
   cd frontend
   ```
4. Install NPM packages for the frontend
   ```sh
   npm install
   ```
5. Start the frontend server
   ```sh
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
JWT_SECRET=A
JWT_RESET_SECRET=!^&P8J4M%R6%j9sA
SALT=10
EMAIL_PASSWORD=your_email_password
EMAIL=your_email@example.com
MONGO_URL=your_mongodb_url
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Link of the Project
- https://paisa-planner.vercel.app/