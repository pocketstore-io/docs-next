#!/bin/bash

apt-get install nginx &&
git clone https://github.com/pocketstore-io/demo.git /var/www/demo &&
cd /var/www/demo
