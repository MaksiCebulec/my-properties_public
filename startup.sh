
# Function to handle the termination signal
function cleanup() {
  # Perform cleanup tasks here
  # Stop server, close connections, etc.
  
  # Terminate the script
  exit 0
}

# Register the cleanup function to handle termination signal
trap cleanup SIGTERM

# Install dependencies for scraper
cd scraper
npm install

# Start the scraper
node index.js
echo "Scraper process completed."

# Install dependencies for server
cd ../server
npm install

# Start the server - & means it runs in the background
node index.js &
echo "Server process completed."

# Wait for the server to be up and running
sleep 5
echo "Server is running."

# Install dependencies for client
cd ../client
npm install

# Start the client
npm start
echo "Client is running."
