Features
View a paginated list of products
Add a new product
Edit product details
Delete a product
Pagination with left and right arrows
Prerequisites
Before running the project, ensure that you have the following installed:

Node.js (v14 or later)
npm (v6 or later)
Redux Toolkit for state management
React and related dependencies
SweetAlert2 for alerts
Tailwind CSS for styling (if applicable)
Setting Up the Project
Follow these steps to set up the project:

1. Clone the Repository
First, clone the repository to your local machine:

bash
Copy code
git clone https://github.com/Sachinthakur147/ProductList.git
cd client
cd product-management
2. Install Dependencies
Once inside the project folder, run the following command to install the dependencies:

bash
Copy code
npm install
This will install all the necessary packages required to run the application.

3. Configure Redux Store

4. Set Up Environment Variables

5. Run the Application
After installing the dependencies and setting up the environment variables, start the development server:

bash
Copy code
npm start
This will run the application locally at http://localhost:3000.

6. Open the Application
Once the server is running, open your browser and navigate to:

arduino
Copy code
http://localhost:3000
The app should be live and accessible.

Project Structure
Here's an overview of the project structure:

bash
Copy code
/src
  /components
    - ProductList.js            # Product list component with pagination
    - ProductModal.js           # Modal to add/edit products
  /redux
    - productSlice.js           # Redux slice for products
  /assets
    - (optional, for images)
  /styles
    - (optional, if not using Tailwind CSS)
  /App.js                       # Main app component
  /index.js                     # Entry point for the React app
How to Contribute
If you'd like to contribute to the project, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
