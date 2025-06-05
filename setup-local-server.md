# How to Set Up a Local Web Server to Run the Love Proposal Website

To avoid CORS issues when loading images and scripts, you should serve your website files through a local web server instead of opening the HTML file directly.

Here are some simple ways to set up a local server:

## Using Python (if Python is installed)

1. Open a terminal or command prompt.
2. Navigate to the `love-proposal-website` directory:
   ```
   cd C:/Users/alanb/Desktop/love-proposal-website
   ```
3. Run the following command:

- For Python 3.x:
  ```
  python -m http.server 8000
  ```
- For Python 2.x:
  ```
  python -m SimpleHTTPServer 8000
  ```

4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

## Using Node.js with `http-server` package

1. Make sure Node.js and npm are installed.
2. Open a terminal or command prompt.
3. Install `http-server` globally (if not already installed):
   ```
   npm install -g http-server
   ```
4. Navigate to the project directory:
   ```
   cd C:/Users/alanb/Desktop/love-proposal-website
   ```
5. Run the server:
   ```
   http-server -p 8000
   ```
6. Open your browser and go to:
   ```
   http://localhost:8000
   ```

## Using VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code.
2. Open the `love-proposal-website` folder in VS Code.
3. Right-click on `index.html` and select "Open with Live Server".
4. Your default browser will open the site served via local server.

---

If you want, I can help you with any of these methods step-by-step.
