#!/bin/bash
# Update and install Node.js 20
sudo apt update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# Install PM2
sudo npm install -g pm2

# Prepare app directory
mkdir -p /var/www/lms-backend
tar -xzf /root/backend-deployment.tar.gz -C /var/www/lms-backend
cd /var/www/lms-backend
# Update .env to production
sed -i 's/NODE_ENV=development/NODE_ENV=production/' .env
sed -i 's/FRONTEND_URL=http:\/\/localhost:5173/FRONTEND_URL=http:\/\/103.189.88.94/' .env

npm install --production

# Setup NGINX
cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;
    server_name 103.189.88.94;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
sudo systemctl restart nginx

# Start with PM2 using all 4 cores
pm2 delete lms-api || true
pm2 start server.js -i max --name "lms-api"
pm2 startup
pm2 save
