#!/usr/bin/env bash

# prepare box
echo "-------------"
echo " prepare box "
echo "-------------"
sudo apt-get update
#sudo apt-get upgrade -y
sudo apt-get install zip unzip -y

echo "-------------"
echo "MARIADB-SERVER"
echo "-------------"
debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'

sudo apt-get install mysql-server -y
echo "CREATE DATABASE moneymaster" | sudo mysql -uroot -proot

echo "-------------"
echo "NODE-SERVER"
echo "-------------"
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs -y

echo "-------------"
echo "YARN"
echo "-------------"
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn -y

cd /vagrant
sudo yarn install -y
sudo npm install -g nodemon

#Import Database
sudo mysql -uroot -proot moneymaster < /vagrant/data/dump.sql
