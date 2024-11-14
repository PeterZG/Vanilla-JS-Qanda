
# Vanilla JS: Qanda Project

## 0. Change Log

N/A

## 1. Before You Start

### 1.1. Background & Motivation

Web-based applications are becoming one of the most common ways to provide digital services to a large audience. While modern frameworks and libraries can simplify development, understanding the fundamentals of JavaScript and Single Page Applications (SPA) remains essential for well-rounded web development skills. This project, "Qanda," aims to build a frontend in Vanilla JavaScript that interacts with a RESTful API backend provided as a NodeJS express server.

In this project, I'll develop an SPA that maintains user and application state without full page reloads by dynamically manipulating the DOM with JavaScript.

### 1.2. Lectures to Watch

The following lectures will be useful:
- Everything from Assessment 2
- [CSS Frameworks](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/css-frameworks)

Additional lectures to help complete the project:
- [Local storage](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-browser-localstorage)
- [Events & Callbacks](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-async-callbacks)
- [Promises](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-async-promises)
- [AJAX Introduction](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ajax-intro)
- [Fetch](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ajax-fetch)
- Accessibility topics including [Perceivability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-perceivability), [Operability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-operability), [Understandability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-understandability), and [Robustness](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-robustness)

## 2. Task Details

This project is a simplified frontend replica of the forum "EdStem" used in UNSW courses. The backend is provided as a NodeJS express server, and the task is to build the frontend in Vanilla JavaScript without frameworks.

The project is organized into milestones, each focusing on a specific aspect of functionality.

### 2.1. Milestone 1 - Registration & Login

- Implement login and registration interfaces that interact with backend authentication endpoints.
- Display errors for invalid login or registration attempts.

### 2.2. Milestone 2 - Thread Creation and Listing

- Allow users to create new threads, with fields for title, content, and privacy settings.
- List all threads on the dashboard, displaying basic thread info.

### 2.3. Milestone 3 - Thread Interactions

- Enable editing, deleting, liking, and watching threads with user-friendly interactions.

### 2.4. Milestone 4 - Comments

- Implement threaded comments with nesting, sorting, and liking functionality.

### 2.5. Milestone 5 - User Profile Management

- Allow viewing and editing of user profiles. Admins can adjust user roles.

### 2.6. Milestone 6 - Challenge Components (Advanced)

#### 2.6.1. Infinite Scroll
Implement infinite scrolling for loading threads progressively.

#### 2.6.2. Live Update
Threads and comments update live without reloading the page, implemented using polling.

#### 2.6.3. Push Notifications
Push notifications for new watched threads, implemented via polling or browser notifications.

### 2.7. Milestone 7 - Very Challenge Components (Advanced *= 2)

#### 2.7.1. Static Feed Offline Access
Enable offline access to the latest feed by caching in local storage.

#### 2.7.2 Fragment-based URL Routing
Use URL fragments for different page views, enabling profile and feed navigation via URLs.

## 3. Getting Started

### 3.1. The Frontend

Stub code is available to help start development, including `index.html` and global CSS. Run a local server to work on the frontend.

#### Starting the Local Server
```bash
$ npm install --global http-server
$ npx http-server frontend -c 1 -p [port]
```

### 3.2. The Backend

Clone the backend server repository, install dependencies, and start the server:
```bash
$ git clone git@nw-syd-gitlab.cse.unsw.tech:COMP6080/24T1/ass3-backend.git
$ cd ass3-backend
$ npm install
$ npm start
```

## 4. Constraints & Assumptions

### 4.1. JavaScript

- Use Vanilla JS (ES6-compliant). Frameworks like ReactJS or Angular are prohibited.

### 4.2. CSS and Libraries

- External CSS libraries like Bootstrap are allowed with attribution.

### 4.3. Browser Compatibility

- Test on Google Chrome or Chromium.

### 4.4. Other Requirements

- This project is a single-page app, achieved through JavaScript DOM manipulation.

### 4.5. Static HTML, DOM Manipulation

- Use `insertAdjacentHTML` and `innerText` for DOM updates.

### 4.6. Prohibited Usages

- Only one HTML file (`index.html`) allowed.
- `async` and `await` syntax is not permitted; use Promises instead.
