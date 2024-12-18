
# Vanilla JS: Qanda Project


## 1. Before I Start

### 1.1. Background

Web-based applications are becoming the most common way to build a digital capability accessible to a mass audience. While there are modern tools that help us build these rapidly, it's important to understand the fundamental JavaScript-based technology and architectures that exist, both to gain a deeper understanding for when these skills may be needed, but also to simply understand the mechanics of fundamental JS. Even when working with a high-level framework like ReactJS, understanding (in-concept) the code that it is transpiled to will ensure you're a more well-rounded web-based engineer.

For this project, I need to build a **frontend** website using Vanilla JS (no ReactJS or other frameworks). This frontend will interact with a RESTful API HTTP backend built in JavaScript (NodeJS express server), which is provided to me.

A theoretical background on how to interface with this API can be found in the "promises & fetch" lecture from my undergraduate web development course.

The web-based application I will build must be a single page app (SPA). SPAs give websites an "app-like feeling," and are characterised by their use of a single full load of the initial HTML page, and then using AJAX/fetch to dynamically manipulate the DOM without requiring a full page reload. In this way, SPAs are generated, rendered, and updated using JavaScript. Since SPAs don’t require a user to navigate away from a page to perform actions, they retain a degree of user and application state. In essence, this means the website will only ever have an `index.html` file, and the concept of "moving between pages" will be achieved by modifying the DOM dynamically. If the site is not implemented as a single-page app, it will not align with the project's goals.

### 1.2. materials to watch

I watched the following lectures before starting (They helped me get started):
 * [CSS Frameworks](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/css-frameworks)

I watched the following lectures to finish the project completely:
 * [Local storage](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-browser-localstorage)
 * [Events & Callbacks](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-async-callbacks)
 * [Promises](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-async-promises)
 * [AJAX Introduction](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ajax-intro)
 * [Fetch](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ajax-fetch)
 * [UI Fundamentals](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ui-fundamentals)
 * [Perceivability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-perceivability)
 * [Operability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-operability)
 * [Understandability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-understandability)
 * [Robustness](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-robustness)

**Note:** You may need to log in with the UNSW student account and be enrolled in the Web Development course to access these materials. However, you can also find relevant topics on platforms like YouTube or Bilibili to supplement my learning.


## 2. The Task (Frontend)

My task is to build the frontend for a UNSW version of the popular forum [EdStem](https://edstem.com/). I'm of course already familiar with this application – it’s the forum we use for this course!

The UNSW version of the forum is called "Qanda". It is backed by a server built in NodeJS (express) (see section 3.2).

I have written out a set of clear and concise functional requirements and behavior expectations.

These requirements describe a series of **screens**. Screens can be popups/modals, or entire pages. The use of the term "screen" is meant to give me flexibility in how I display them. A screen essentially represents a certain state of my web-based application.

## 2.1. Milestone 1 - Registration & Login

Milestone 1 focuses on building the basic user interface for registering and logging in.

### 2.1.1. Login

* When not logged in, the site should display a login form that includes:
  * An email field (text)
  * A password field (password)
  * A submit button to perform the login
* When the submit button is pressed, the form data will be sent to `POST /auth/login` to verify the credentials. If there’s an error during the login process, an appropriate error message will be shown on the screen.

### 2.1.2. Registration

* When not logged in, the login form will provide a link/button that opens the registration form. The registration form will contain:
  * An email field (text)
  * A name field (text)
  * A password field (password)
  * A confirm password field (password) – this won't be sent to the backend, but if it doesn't match the password, an error should appear on submit.
  * A submit button to register
* When the submit button is pressed, if the two passwords don’t match, an error popup will be shown. If they do match, the form data will be sent to `POST /auth/register` to verify the credentials. If there’s an error during registration, an appropriate error message will be shown.

### 2.1.3. Error Popup

* Whenever there is an error on the frontend or backend, there should be an error popup on the screen with a message. This message can either come from the backend’s error response or be meaningfully generated on the frontend.
* The popup can be closed/removed by pressing an “x” or “close” button.

### 2.1.4. Dashboard

* Once the user has successfully registered or logged in, they should land on the dashboard page.
* Initially, the dashboard will be a blank screen containing only a “logout” button that is always visible.
* When the logout button is pressed, the token will be removed from the site’s state (e.g., local storage) and the user will be redirected back to the login screen.

### 2.2. Milestone 2 - Making Threads

Milestone 2 focuses on how to create a thread and then view that thread (along with others).

#### 2.2.1. Making a Thread

> **What is a fold?**  
> Above the fold content is the part of a web page shown before scrolling. Any content you'd need to scroll down to see, would be considered 'below the fold'. The 'fold' is where the browser window ends, but the content continues underneath ([source](https://www.optimizely.com/optimization-glossary/above-the-fold)).

* Somewhere above the fold, on every page, there should be a button that says "Create" that takes you to a new screen.
  * This new screen should occupy the entire page excluding any header or footers.
  * On this screen, there should be input fields for the title, content, and an option to mark the thread as private or not.
  * This screen should also have a submit button.
  * The new thread screen should have its own unique URL.
* The submit button will create a new thread via `POST /thread`. Once the request is successful, the user will be redirected to a new screen that displays the created thread (2.2.3).

#### 2.2.2. Getting a List of Threads

* When you are on the dashboard, a list of threads should appear (via `GET /threads`) on the left-hand side of the page.
  * The width of this list should be no more than `400px`.
* The list will contain thread boxes, each with a height no greater than `100px`.
  * Each box should display the thread title, post date, author, and the number of likes.

#### 2.2.3. Individual Thread Screen

* When a particular thread is clicked in the sidebar, or after creating a new thread, you are taken to an "individual thread screen" which has its own unique URL (to be chosen).
  * This URL should be parameterized based on the thread ID.
* This individual thread screen should include the list of threads on the left (2.2.2), but the main page body content should include:
  * Title
  * Body content
  * Number of likes
* This page will later include features such as edit, delete, like, watch, comments, etc., but these can be skipped for `2.2.3`.

### 2.3. Milestone 3 - Thread Interactions

Milestone 3 focuses on how to interact with threads once they've been made.

#### 2.3.1. Editing a thread

* On an individual thread screen, the user should see an "edit" button somewhere above the fold that allows them to edit the thread by taking them to a new unique route that is parameterized by the thread ID.
* On this screen, there should be input fields for title, content, and whether or not the thread is private. These fields should be pre-populated based on the current thread data.
* The screen should also contain a save button.
* This edit thread screen should have its own unique URL.
* When the save button is pressed, `PUT /thread` is called to update the details, and when that request returns, the user is taken back to the individual thread page.

#### 2.3.2. Deleting a thread

* On an individual thread screen, the user should see a "delete" button somewhere above the fold that allows them to delete the thread via `DELETE /thread`.
* The delete button only appears if the user is an admin or the owner of that thread.
* Once the thread delete request is returned, the screen should redirect to the latest individual thread post from the thread list.

#### 2.3.3. Liking a thread

* On an individual thread screen, the user should see a "like" action (button, icon) somewhere above the fold that allows them to like or unlike a thread via `PUT /thread/like`.
* If the thread is currently liked by this user, the button should visually indicate that clicking it will unlike the thread. If the thread is not liked by this user, the button should visually indicate that clicking it will like the thread.
* Any liking or unliking action should immediately reflect a change in the UI.

#### 2.3.4. Watching a thread

* On an individual thread screen, the user should see a "watch" action (button, icon) somewhere above the fold that allows them to watch or unwatch a thread via `PUT /thread/watch`.
* If the thread is currently watched by this user, the button should visually indicate that clicking it will unwatch the thread. If the thread is not watched by this user, the button should visually indicate that clicking it will start watching the thread.
* Any liking or unliking action should immediately reflect a change in the UI.

### 2.4. Milestone 4 - Comments

Milestone 4 focuses primarily on the display, creation, editing, and liking of comments.

#### 2.4.1. Showing Comments

* When the individual thread screen loads, it should load all relevant comments from `GET /comments` that apply to that particular thread.
* These comments should be displayed as a list on the page, with each comment containing the following:
  * The comment text
  * A profile picture of the user who commented
  * The time since the comment was posted, formatted as:
    * "Just now" if posted within a minute.
    * "[time] [denomination] ago" if posted more than a minute ago, e.g., "1 minute ago" or "7 hours ago". Time units progress as follows: 1-59 minutes, 1-23 hours, 1-6 days, and then 1-N weeks, where N can be any number.
  * The number of likes the comment has received.
* Some comments may be replies to other comments. These comments should be nested under their parent comment, with visual indentation to indicate the hierarchy for each level of nesting.
* Comments must be sorted in reverse chronological order (most recent comments at the top). Nested comments should be sorted within their respective nested areas.

#### 2.4.2. Making a Comment

* If there are no comments on the thread, an input/textarea box should appear below the thread information.
  * A "Comment" button should exist below this input box.
  * When the "Comment" button is pressed, the text inside the comment box should be posted as a new comment for the thread via `POST /comment`.
* If there are comments on the thread, no input/textarea box should be shown. Instead, each comment should have a "reply" button somewhere within the comment info space.
  * When the "reply" button is pressed, a modal should appear containing an input/textarea box and a "comment" button.
  * When the "comment" button is pressed, the text inside the comment box should be posted as a new comment for the thread via `POST /comment`, and the modal should close.

#### 2.4.3. Editing a Comment

* Each comment should have an "edit" button somewhere within the comment info space.
* When the "edit" button is pressed, a modal should appear containing an input/textarea box and a "comment" button.
* The input/textarea box should contain the current comment text.
* When the "comment" button is pressed, the updated comment text should be posted via `PUT /comment`, and the modal should close.

#### 2.4.4. Liking a Comment

* Each comment should have a "like" button somewhere within the comment info space.
* If the comment is already liked, the button should read "unlike".
* When the "like" button is pressed, the comment will be liked via `PUT /comment/like`. The like counter should update accordingly.
* When the "unlike" button is pressed, the comment will be unliked via `PUT /comment/like`, and the like counter should decrease accordingly.

### 2.5. Milestone 5 - Handling Users

Milestone 5 focuses predominantly on user profiles and admins managing other admin permissions.

#### 2.5.1. Viewing a profile

* Allow a user to click on a user's name from a thread, like, or comment, and be taken to a profile screen for that user.
* The profile screen should contain any information the backend provides for that particular user ID via (`GET /user`) (excluding the user ID).
* The profile should also display all threads made by that person. The threads shown should display the title, content, number of likes, and comments.

#### 2.5.2. Viewing your own profile

* Users can view their own profile as if they would any other user's profile.
* A link to the user's profile (via text or small icon) should be visible somewhere common on most screens (at the very least on the feed screen) when logged in.

#### 2.5.3. Updating your profile

* Users can update their own personal profile via (`PUT /user`). This allows them to update their:
  * Email address
  * Password
  * Name
  * Image (must be uploaded as a file from your system)

#### 2.5.4. Updating someone to admin

* If the user viewing another user's profile screen is an admin, they should be able to see a dropdown that includes options "User" and "Admin".
* The option selected in the dropdown by default on the page should reflect the user's current admin status.
* Below the dropdown, there should be an "Update" button that, when clicked, updates the user to that permission level.

### 2.6. Milestone 6 - Challenge Components (`advanced`)

#### 2.6.1. Infinite Scroll 
* Instead of pagination, users can infinitely scroll through a thread. For infinite scroll to be properly implemented you need to progressively load threads as you scroll.

#### 2.6.2. Live Update
* If a user likes a thread or comments on a thread, the thread's likes and comments should update without requiring a page reload/refresh. This should be done with some kind of polling.

*Polling is very inefficient for browsers, but can often be used as it simplifies the technical needs on the server.*

#### 2.6.3. Push Notifications
* Users can receive push notifications when a user they watch posts a thread. To know whether someone or not has posted a thread, you must "poll" the server (i.e. intermittent requests, maybe every second, that check the state). You can implement this either via browser's built in notification APIs or through your own custom built notifications/popups. The notifications are not required to exist outside of the webpage.

*This part can research online to implement, and there are plenty of resources available.*

### 2.7. Milestone 7 - Very Challenge Components (`advanced *= 2`)

#### 2.7.1. Static feed offline access
* Users can access the most recent feed they've loaded even without an internet connection.
* Cache information from the latest feed in local storage in case of outages.
* When the user tries to interact with the website at all in offline mode (e.g. comment, like) they should receive errors.

*This part can research online to implement, and there are plenty of resources available.*

#### 2.7.2 Fragment based URL routing
Users can access different pages using URL fragments:
```
/#profile=1
/#feed
/#profile=4
```

*This part can research online to implement, and there are plenty of resources available.*


## 3. Getting Started

### 3.1. The Frontend

The initial module code has already been provided to assist in getting started quickly:
 * `frontend/index.html`
 * `frontend/styles/global.css`
 * `frontend/src/helpers.js`
 * `frontend/src/main.js`

These template files can be modified or deleted as needed; they are provided mainly for reference and help.

To work locally with a web server and serve the frontend static files, may need to run another web server.

To install the `http-server` globally, run:

`$ npm install --global http-server`

Then, to start the server, run the following command in your project root:

`$ npx http-server frontend -c 1 -p [port]`

Where `[port]` is the port you want to use (e.g., `8080`). Any port number is fine.

Once started, access the `index.html` by visiting `http://localhost:8000` (or the provided URL/port) to avoid CORS issues.

### 3.2. The Backend

The backend is provided to supply the frontend with API endpoints.

Before starting the backend server, run `npm install` to install the necessary dependencies.

To start the backend server:

`$ npm start`

Access the backend API documentation by visiting `http://localhost:5005` in a browser. This URL will list all available HTTP routes.

A basic database is provided, containing two users and one public channel with messages. You can view the contents in `backend/database.json`.

The backend data is persistent, meaning it will remain even after the Express server stops. If you need to reset the database to its original state, you can run:

`$ npm run reset`

To back up the database, simply copy the `database.json` file. If you want to clear the database, you can run:

`$ npm run clear`

The backend port is defined in the `frontend/src/config.js` file. This helps the frontend communicate with the backend.

If the `database.json` file is manually updated, restart the backend server.

### 3.3. Taking the First Steps

Recommended first steps:
 1. Read through the entire specification, especially section 2, to understand what’s ahead.
 2. Load `index.html` and verify that you can see a simple "Hello World" message to ensure you're targeting the right page.
 3. Plan the UI, considering all the key screens and the data they rely on.
 4. Start the backend and check if it's working by calling the `/feed` API endpoint (it should return an empty list).
 5. Start coding!

### 3.4. Making a Fetch Request

Here’s some starter code to make a POST request (for non-authenticated routes). Note that there are many ways to do this, and some methods may be cleaner, but this will help you get started.

```javascript
const apiCall = (path, body) => {
    fetch('http://localhost:5005/' + path, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            alert(data.error);
        } else {
            resolve(data);
        }
    });
};

Here is some helpful starter code to make a GET request (for authenticated routes). Note: there are many other ways (and some cleaner than this) to do this, so don't assume this is perfect code. It will just help you get started.

```Javascript
const apiCall = (path, token, queryString) => {
    fetch('http://localhost:5005/' + path + '?' + queryString, {
	  method: 'GET',
	  headers: {
        'Content-type': 'application/json',
		'Authorization': `Bearer ${token}`
      },
	})
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          resolve(data);
        }
      });
};
```


## 4. Project Considerations

### 4.1. Javascript

 * This project must be implemented using ES6-compliant Vanilla JavaScript. You cannot use ReactJS, JQuery, or other abstract frameworks. For example, you cannot use popular JavaScript frameworks like [Angular](https://angular.io/) or [React](https://reactjs.org/).
 * **NOT** directly use external JavaScript. Do not use NPM to install development libraries unless approved for the project.

### 4.2. CSS and Other Libraries

 * External CSS libraries may be included in this project (using the `<link />` tag). Attribute these sources (i.e. provide URL/author in source code comments). For example, you are permitted to use the popular [Bootstrap](https://getbootstrap.com/) CSS framework. Some Bootstrap functionality relies on accompanying JavaScript. You may include this JavaScript. The JavaScript accompanying Bootstrap requires the popular general-purpose JavaScript library [jQuery](https://jquery.com/). You may include jQuery to allow Bootstrap to use it. However, you are not permitted to use **jQuery** in the code you write for the project.

### 4.3. Browser Compatibility

Ensure that the project has been tested on one of the following browsers:
 * Locally: Google Chrome (various operating systems)

### 4.4. Other Requirements

 * The project specification is intentionally vague to allow you to build frontend components as you see fit. The size, positioning, color, and layout of these components are generally up to you. We provide some basic criteria, but the main focus is on elements and behavior.
 * The web application must be a single-page application (SPA). This means that there should be only one initial browser load of content, and all subsequent dynamic changes to the page should be based on JavaScript DOM manipulation, not through page refreshes. If you do not build a single-page app (e.g. by using links to multiple HTML pages), your project will not meet the requirements.

### 4.5. Static HTML, innerHTML, DOM Manipulation

In this project, you are required to:
 * Add static HTML/CSS to the provided stub website (i.e., you can add raw HTML/CSS as if it’s a static page, even if you later manipulate it with JavaScript).
 * Build HTML elements and add CSS properties to the DOM using JavaScript.
 * Use properties/functions such as `insertAdjacentHTML` and `innerText`.

### 4.6. Prohibited Practices

 * Not allowed to have more than 1 HTML file in your project repository.
 * Do not use the `async` and `await` syntax. You must use JavaScript Promises.
 * Do not use any string-to-DOM parsers (e.g., DOMParser, `innerHTML` property, or similar).


### 5. Acknowledgement

I would like to express my sincere gratitude to the web development course I took during my undergraduate studies at UNSW. The materials and knowledge provided during this course have been instrumental in helping me develop this project. The foundational skills and best practices I gained through the course have guided me throughout the development process, and I am deeply thankful for the support provided by the course content, lectures, and resources.
