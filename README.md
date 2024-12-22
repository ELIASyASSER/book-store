# Book-Store 

## Description:
mern stack book store website i make this website with admin dashboard to manage the content with awsome

stats for authentication i use google firebase  `https://console.firebase.google.com/?_gl=1*17i2nd3*_ga*OTU0MzkxMC4xNzMxMjQ5NTEx*_ga_CW55HF8NVT*MTczMzMxMTM5My4xMS4xLjE3MzMzMTE1MTIuNDYuMC4w`  

replace your variables in the `.env.example` file  for state management i use `Redux toolkit` and `RTK QUERY` It simplifies handling 

asynchronous data in Redux applications by providing a streamlined way to fetch, cache, update, and manage server state. finally i use `cloudinary service ` for storing, optimizing, and delivering images

## Table Of Contents

  - [Book Store](#Book-Store)
  - [Description](#description)
  - [Table Of Contents](#table-of-contents)
  - [Installation-and-Usage](#installation-and-usage)
  - [Used-Techs](#used-techs)
  - [Contribution](#contribution)

## Installation-and-Usage

To get the project up and running locally:
1. Install [Node.js](https://nodejs.org/en/)

2. clone this repository by running in your cmd `https://github.com/ELIASyASSER/book-store.git`
  
3. now you will find two directories `client` and `server` split your terminal and run `cd client` and in  second terminal run `cd server` now run `npm install` in both of `client and server directories`

4. create a fire base project from this link then select authenticate service 

(https://console.firebase.google.com/?_gl=1*17i2nd3*_ga*OTU0MzkxMC4xNzMxMjQ5NTEx*_ga_CW55HF8NVT*MTczMzMxMTM5My4xMS4xLjE3MzMzMTE1MTIuNDYuMC4w)

5. you will find .env.example rename it to .env and replace variables inside it from your firebase project

6.  now inside `server directory` you will find  `.env.example` for cloudinary service replace your own variables after creating account on cloudiary from this link
7.  
(https://console.cloudinary.com/pm/c-2a3df6e136b51a8752a7b47e355d78/getting-started) for mongodb replace your url connection 

8. finally in your termianl in `server ` run this script to create dummy data for you `npm run addBooks`  after that run `npm run dev` in both `server directory and client directory`
 open `http://localhost:5173/` in your favourite browser

 ## Used-Techs 
  - React
  - React-router-dom
  - react-icons
  - Redux Toolkit
  - Rtk Query
  - chart.js
  - firebase
  - Tailwind.css
  - Node.js
  - Express
  - mongooose
  - Cloudinary
  - [Vite Build Tool](https://vite.dev/guide/)
  
### Contribution
🤝
if there any issue or features leave an issue i will consider it [Issue Page]([issues/](https://github.com/ELIASyASSER/book-store/issues))
or make [pull request here ](https://github.com/ELIASyASSER/book-store/pulls)
