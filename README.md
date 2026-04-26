# Luiz's Integrating With HubSpot I: Foundations Practicum

This project is a Node.js application built with Express, Axios, and Pug for the Integrating With HubSpot I: Foundations practicum.

The application connects to the HubSpot CRM API using a private app access token. It retrieves records from a custom object and displays them in a table. It also includes a form that creates new custom object records in HubSpot.

## Custom Object

Custom object used: Books

Properties:

- Name
- Author
- Genre

## HubSpot Custom Object List View

https://app.hubspot.com/contacts/SEU_ID_DA_CONTA/objects/2-61499335/views/all/list

## Routes

- GET `/` - Retrieves custom object records from HubSpot and displays them in a table.
- GET `/update-cobj` - Renders a form to create a new custom object record.
- POST `/update-cobj` - Sends form data to HubSpot and creates a new custom object record.

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

PRIVATE_APP_ACCESS_TOKEN=your-private-app-access-token  
HUBSPOT_OBJECT_TYPE=your-custom-object-type-id  
PORT=3000

## Running the Project Locally

Install dependencies:

npm install

Run the project:

node index.js

Open:

http://localhost:3000