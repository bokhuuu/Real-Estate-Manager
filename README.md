# Real Estate Manager

This is a **real estate listing application** built with **React**. It allows users to browse, filter, add, and manage real estate properties. The app also includes agent management features with form validation and data persistence. The application interacts with a backend to store and fetch property and agent data.

## Features

### 1. Listings Page

- **Displays a list of real estate listings** from the backend.
- Each listing includes:
  - Image, address, city, ZIP code, price, area, number of bedrooms, and sale/rent tag.
- **Filtering functionality** by:
  - Price range
  - Area range
  - Region (select)
  - Number of bedrooms
- Filters persist across refreshes and provide validation.
- **Clear all filters** button to reset all active filters.

### 2. Add Agent Modal

- Allows the user to **add a new real estate agent**.
- Includes the following fields:
  - Name (min 2 characters)
  - Surname (min 2 characters)
  - Email (must end with `@redberry.ge`)
  - Avatar (with preview and delete option)
  - Phone number (format: `5XXXXXXXXX`)
- The form includes **validation** and is submitted to the backend with a bearer token.

### 3. Add Listing Modal

- Allows the user to **add a new real estate listing**.
- Fields include:
  - Address
  - Image (file upload with size limit of 1MB)
  - Region and City (City is dynamically filtered based on selected region)
  - Postal code, price, area, number of bedrooms, description, and sale/rent tag.
  - Agent selection (dropdown of available agents)
- Form submission includes **validations** and sends data to the backend using a bearer token.

### 4. Internal Listing Page

- Displays all the details of a selected listing, including:
  - Full property details
  - Agent information (picture, name, email, phone number)
  - Date of publication and description
- **Delete functionality**: Users can delete a listing with a confirmation modal.
- Includes a **slider of related listings** from the same region, excluding the current listing.

### 5. Data Persistence

- Input data and validation error messages **persist across page refreshes**.
- Filtered listings and form inputs are saved in **localStorage** for a smooth user experience.

## Technologies Used

- **Vite**: As the project build tool.
- **Axios**: For making HTTP requests to the backend.
- **React Router DOM**: For managing routes and navigation.
- **React-Bootstrap**: For styling and responsive design.
- **Styled-Components**: For writing component-level CSS, including using **props**.
- **React Hook Form**: For handling forms and form validation.
- **Yup**: For validation schemas.
- **React Slick**: For building slider on the internal listing page.
- **localStorage**: For persisting filter selections, form inputs, and error messages across page refreshes.

## Folder Structure

- **components**:
  - buttons, cards, filters, forms, modals
- **pages**: Contains different pages (ListingsPage, InternalListingPage, etc.)
- **styles**: Global styles and styled-components definitions.
- **AppRouter.jsx**: Manages application routing.

## Resolution and Responsiveness

- The project is **designed for a resolution of 1920x1080**.
- **Note:** The project is **not responsive**, meaning it is optimized for desktop viewing only.

## Deployment

The project is deployed via **Netlify** and can be viewed at: [Real Estate Manager App](https://real-estate-manager-app.netlify.app/).

## API Documentation

The application interacts with a backend API for managing real estate listings and agents. You can view the full API documentation [here](https://api.real-estate-manager.redberryinternship.ge/swagger).

### Token Authentication

For certain endpoints, a token must be included in the request headers as a **Bearer Token**.
