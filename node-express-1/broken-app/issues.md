# Broken App Issues
Added the express.json() middleware to parse JSON bodies.

Used await Promise.all() to wait for all the requests to complete instead of using map with async/await.

Refactored the code to extract only the required properties from the response data (name and bio).

Replaced res.send(JSON.stringify(out)) with res.json(out) to send the response as JSON.

Added proper error handling using try/catch block.

Added a console log to indicate that the server is running and listening on the specified port.
