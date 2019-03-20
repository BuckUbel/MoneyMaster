#!/usr/bin/env bash
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install yarn pm2 pm2-logrotate -g

GRANT ALL PRIVILEGES ON *.* TO 'service'@'localhost' IDENTIFIED BY 'service';