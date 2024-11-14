
# Qanda Project Plan

## 0. Change Log

N/A

## 1. Before You Start

### 1.1. Background & Motivation

As web-based applications become the mainstream form of digital products, understanding the underlying JavaScript technologies and architectures is essential. Even though modern tools (such as ReactJS) make it easier to build these applications, mastering fundamental JavaScript skills is beneficial for deeper understanding and skill enhancement. This project aims to build a frontend application with Vanilla JS and interact with a RESTful API using JavaScript. This helps build applications without high-level frameworks.

We will develop a single-page application (SPA) named Qanda, which mimics UNSW's EdStem forum, creating a web application with dynamic interactions. SPA is characterized by using AJAX/fetch to dynamically manipulate the DOM without reloading the page, allowing consistent user and application state. The entire application only uses one `index.html` page, and all "page transitions" will be implemented through JavaScript DOM manipulation.

### 1.2. Recommended Course Videos

To complete the project successfully, it is recommended to watch the following course videos:

- Assessment 2-related videos
- [CSS Frameworks](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/css-frameworks)
- [Local Storage](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-browser-localstorage)
- [Events & Callbacks](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-async-callbacks)
- [Promises](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-async-promises)
- [AJAX Introduction](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ajax-intro)
- [Fetch](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ajax-fetch)
- [UI Fundamentals](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ui-fundamentals)
- [Accessibility Topics](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility)

## 2. Project Tasks (Frontend)

### 2.1. Milestone 1 - User Registration & Login
... (task details as provided earlier)

### 2.2. Milestone 2 - Creating Threads
... (task details)

### 2.3. Milestone 3 - Thread Interactions
... (task details)

### 2.4. Milestone 4 - Commenting System
... (task details)

### 2.5. Milestone 5 - User Management
... (task details)

### 2.6. Milestone 6 - Challenge Tasks
... (task details)

### 2.7. Milestone 7 - Advanced Challenge Tasks
... (task details)

## 3. Getting Started

### 3.1. The Frontend

Stub code has been provided to help you get started in:
 * `frontend/index.html`
 * `frontend/styles/global.css`
 * `frontend/src/helpers.js`
 * `frontend/src/main.js`

To run the frontend locally, install a server:
```
$ npm install --global http-server
$ npx http-server frontend -c 1 -p [port]
```

### 3.2. The Backend

Clone and run:
```
$ git clone git@repo.git
$ npm install
$ npm start
```

Use `npm run reset` to reset data.

### 3.3. Taking the First Steps
- Read the entire spec
- Load `index.html` to test
- Load backend and make a sample API call
- Begin building each component iteratively

### 3.4. Making Fetch Requests
Example POST and GET requests:
```javascript
fetch('http://localhost:5005/path', { ... })
```

## 4. Constraints & Assumptions

### 4.1. Javascript
Implement this assignment in ES6-compliant Vanilla JavaScript without libraries like ReactJS.

### 4.2. CSS and Libraries
You may use external CSS libraries but avoid frameworks that modify JavaScript behavior.

### 4.3. Browser Compatibility
Test on Google Chrome and Chromium on CSE machines.

### 4.4. Other Requirements
Build as a single-page app; avoid multi-page approaches.

### 4.5. Static HTML & DOM Manipulation
Allowed to add static HTML/CSS to `index.html` and manipulate it via JavaScript.

### 4.6. Prohibited Usages
Avoid async/await syntax; use Promises. Avoid string-to-DOM parsers like `innerHTML`.
