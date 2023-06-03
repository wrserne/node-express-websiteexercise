### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

- What is a Promise?

- What are the differences between an async function and a regular function?

- What is the difference between Node.js and Express.js?

- What is the error-first callback pattern?

- What is middleware?

- What does the `next` function do?

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
**-Ways of managing asynchronous code in JavaScript:**

Using callbacks: Functions can accept callbacks as arguments to be executed when the asynchronous operation completes.
Promises: Introduced in ES6, promises provide a more structured way to handle asynchronous operations. They represent the eventual completion (or failure) of an asynchronous operation and allow chaining multiple operations.
Async/await: Also introduced in ES6, async/await is a syntax for writing asynchronous code that looks synchronous. It allows you to write code that appears sequential while actually being asynchronous.

**Promise:**
A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected. Promises provide a way to handle asynchronous operations in a more structured manner, allowing you to chain operations and handle errors more effectively.

**Differences between an async function and a regular function:**

Async functions are defined using the async keyword, which allows them to use the await keyword inside. Regular functions do not have this special syntax.
Async functions always return a Promise, even if they don't explicitly use the return statement. Regular functions can return any value or no value at all.
Async functions allow the use of await inside them to pause execution and wait for a Promise to resolve. Regular functions do not have this ability.
**Difference between Node.js and Express.js:**

Node.js is a runtime environment that allows you to run JavaScript on the server-side. It provides an event-driven, non-blocking I/O model, making it well-suited for building scalable and high-performance applications.
Express.js is a web application framework built on top of Node.js. It provides a set of features and tools to simplify the process of building web applications and APIs. Express.js helps with routing, handling requests and responses, and managing middleware.
Error-first callback pattern:
The error-first callback pattern is a convention in Node.js for handling asynchronous operations that may result in an error. Callback functions used in this pattern expect the first argument to be an error object (or null if there is no error) and subsequent arguments to represent the result of the operation.

**Middleware:**
Middleware refers to a function or a set of functions that are executed in the middle of the request-response cycle in an application. It sits between the incoming request and the outgoing response, allowing you to modify the request or response objects, perform additional processing, or invoke the next middleware in the chain.

**The next function:**
In the context of middleware, the next function is a callback function provided by Express.js. It is used to pass control to the next middleware function in the chain. By calling next(), the current middleware function completes its processing and hands off the request to the next middleware.

**Issues with the provided code:**

Performance: The code makes three separate API calls using $.getJSON in a sequential manner. This can be slow as it waits for each request to complete before initiating the next one. It would be more efficient to make these requests concurrently.
Structure: The code could benefit from using a more modular and reusable approach. The repetitive nature of the code suggests that it can be refactored to handle multiple users in a more scalable way.
Naming: The variable names elie, joel, and matt are not very descriptive. Using more meaningful variable names can improve code readability and maintainability.
