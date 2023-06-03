const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const url = require('url');

// Get the filename from the command line arguments
const filename = process.argv[2];

// Check if a filename was provided
if (!filename) {
  console.error('Please provide a filename.');
  process.exit(1);
}

// Read the file contents asynchronously
fs.readFile(filename, 'utf8', async (err, data) => {
  if (err) {
    console.error('Unable to read the file:', err);
    process.exit(1);
  }

  // Split the file contents into an array of URLs
  const urls = data.trim().split('\n');

  // Process each URL
  for (const urlString of urls) {
    try {
      const parsedUrl = url.parse(urlString);

      // Determine the protocol (http or https)
      const httpClient = parsedUrl.protocol === 'https:' ? https : http;

      // Set up the request options
      const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.path,
        method: 'GET',
      };

      // Send the request
      const request = httpClient.request(options, (response) => {
        let html = '';

        // Receive the response data
        response.on('data', (chunk) => {
          html += chunk;
        });

        // Save the HTML to a file
        response.on('end', () => {
          const outputFilename = path.join(__dirname, `${parsedUrl.hostname}.txt`);

          fs.writeFile(outputFilename, html, (err) => {
            if (err) {
              console.error(`Unable to write to ${outputFilename}:`, err);
            } else {
              console.log(`Wrote to ${outputFilename}`);
            }
          });
        });
      });

      // Handle errors for the request
      request.on('error', (err) => {
        console.error(`Couldn't download ${urlString}:`, err);
      });

      request.end();
    } catch (err) {
      console.error(`Couldn't process URL ${urlString}:`, err);
    }
  }
});