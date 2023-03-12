# Pulselive
Front-end development coding activity for Pulselive: building a player stats card component.

## Getting started
Download application:

<pre>npm install</pre>

A local server is required to run the application. One option is [http-server (npm)](https://www.npmjs.com/package/http-server).

Install server:

<pre>npm install -g http-server</pre>

Run server:
<pre>http-server</pre>

Run application:
<pre>npm run build</pre>

## File structure
Application originally only had assets in the public folder but due to an issue with the local server mid-task, all required files had to be moved to public 
in order for the application to run. In production, with a remote server, file structure could be amended so only assets and index.html exist in public folder.

A video file demonstrating the application running locally has been supplied by email.

## File types
To minimse file size on the server, CSS has been minified. Additionally, Brotli (.br) and Gzip (.gz) compression exists for the main JavaScript file. Server configuration may be
required in order for these file types to be successfuly processed and presented to the user. For demonstration purposes, Brotli and Gzip are not used here; 
JavaScript is called by .js file type.

## Next steps
I'd be happy to discuss the next steps I would take to further build out the application if it was part of a wider application.
