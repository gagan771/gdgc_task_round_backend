# Hono.js Shopping API

This is a simple Shopping API built using Hono.js, designed to manage a list of items with CRUD (Create, Read, Update, Delete) operations. The API is structured to allow users to create, retrieve, update, and delete items in an in-memory data store.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Testing the API](#testing-the-api)
- [Deployment](#deployment)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14 or later): [Download Node.js](https://nodejs.org/en)
- **npm** (comes with Node.js)
- **Postman** or any other API testing tool.

## Installation

1. **Clone the repository** (or create a new directory):

   ```bash
   mkdir hono-shopping-api
   cd hono-shopping-api

Initialize a new Node.js project:
bash
npm init -y

Install Hono:
bash
npm install hono
node index.js

The server will start listening on port 3000.
Project Structure
text
hono-shopping-api/
├── index.js          # Main application file
├── package.json      # Node.js project metadata and dependencies
└── README.md         # Project documentation

API Endpoints
1. GET All Listed Items
Endpoint: /listing
Method: GET
Response:
json
{
  "data": []
}

2. GET One Listed Item by ID
Endpoint: /listing/:id
Method: GET
Response:
json
{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "seller": "string",
    "rating": number
  }
}

3. CREATE a Listing
Endpoint: /listing
Method: POST
Request Body:
json
{
  "title": "string",
  "description": "string",
  "seller": "string",
  "rating": number // optional
}

Response:
json
{
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "seller": "string",
    "rating": number
  }
}

4. UPDATE Listed Item
Endpoint: /listing/:id
Method: PUT
Request Body:
json
{
    "title": "string", // optional
    "description": "string", // optional
    "rating": number // optional
}

Response:
json
{
    "data": {
        ...
        // Updated fields will be reflected here.
    }
}

5. DELETE Listed Item
Endpoint: /listing/:id
Method: DELETE
Response:
text
204 No Content

or
json
{
    "message": 'Item deleted successfully'
}

Testing the API
You can test this API using Postman or any other API testing tool by following these steps:
Open Postman.
Create requests for each endpoint as described in the API Endpoints section above.
Use appropriate HTTP methods and request bodies as needed.
Example Requests in Postman:
GET All Listings
POST Create a Listing
GET One Listing by ID
PUT Update a Listing
DELETE a Listing

urls
  https://shopping-api.bhardwajlaughterclub.workers.dev/listing

  GET One Listed Item using ID [GET /listing/:id]

  FOR PUT /listing/:id
  FOR DELETE /listing/:id
  
