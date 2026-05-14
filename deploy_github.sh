#!/bin/bash

# Update and install Node.js 20
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# Install PM2
sudo npm install -g pm2

# Prepare app directory
mkdir -p /var/www/lms-backend
cd /var/www/lms-backend

# Clone the repository
# We remove any existing files to do a fresh clone
rm -rf lms-backend-all
git clone https://github.com/orcadehub/lms-backend-all.git
cd lms-backend-all

# Setup the .env file
cat > .env <<ENVEOF
# Server Configuration
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb+srv://orcadehub2:orcadehub2@orcadehub.twfptkz.mongodb.net/lmsq?retryWrites=true&w=majority&appName=OrcadeHub
JWT_SECRET=1234567890qwertyuiopasdfghjklzxcvbnm
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=orcadehub.llp@gmail.com
EMAIL_PASS=tdbntufiquosmakm
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
FRONTEND_URL=http://103.189.88.94
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=AIzaSyC-3MlhZDvB_jbjPrzTZ7nBtzzLjHdRxF8
E2B_API_KEY=e2b_e4ea3feb1877ec242cd103e7cfa07c5cc277fd95
ENVEOF

# Install dependencies
npm install --production

# Setup NGINX Reverse Proxy
cat > /etc/nginx/sites-available/default <<NGINXEOF
server {
    listen 80;
    server_name 103.189.88.94;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
    }
}
NGINXEOF

sudo systemctl restart nginx

# Start Server with PM2
pm2 delete lms-api || true
pm2 start server.js -i max --name "lms-api"
pm2 startup
pm2 save
