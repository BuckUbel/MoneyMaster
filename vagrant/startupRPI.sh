#!/usr/bin/env bash

# prepare PI
echo "------------"
echo " prepare PI "
echo "------------"
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt install -y mc zip unzip

# prepare mysql
echo "-----------------"
echo " prepare MySQL "
echo "-----------------"
sudo apt install -y mysql-server
echo "CREATE DATABASE moneymaster" | sudo mysql -uroot -proot
echo "GRANT ALL PRIVILEGES ON *.* TO 'service'@'localhost' IDENTIFIED BY 'service';" | sudo mysql -uroot -proot

# prepare node.js
echo "-----------------"
echo " prepare Node.js "
echo "-----------------"
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install yarn pm2 pm2-logrotate -g
cd /home/pi/MoneyMaster
sudo yarn install -y


#Import Database
sudo mysql -uservice -pservice moneymaster vagrant/dump.sql