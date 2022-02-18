#!/bin/bash

#Generate Diffie-Hellman keys:
openssl dhparam -out /etc/nginx/dhparam.pem 2048
#Create a common ACME-challenge directory (for Let's Encrypt):
mkdir -p /var/www/_letsencrypt
chown www-data /var/www/_letsencrypt

#Comment out SSL related directives in configuration:
sed -i -r 's/(listen .*443)/\1;#/g; s/(ssl_(certificate|certificate_key|trusted_certificate) )/#;#\1/g' /etc/nginx/conf.d/dashboard.conf
#Reload NGINX:
sudo nginx -t && sudo systemctl reload nginx
#Obtain certificate:
certbot certonly --webroot -d engine.diteqafrica.com -d www.engine.diteqafrica.com --email info@engine.diteqafrica.com -w /var/www/_letsencrypt -n --agree-tos --force-renewal
#Uncomment SSL related directives in configuration:
sed -i -r 's/#?;#//g' /etc/nginx/sites-available/dashboard.conf
#Reload NGINX:
sudo nginx -t && sudo systemctl reload nginx
#Configure Certbot to reload NGINX after success renew:
echo -e '#!/bin/bash\nnginx -t && systemctl reload nginx' | sudo tee /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh
sudo chmod a+x /etc/letsencrypt/renewal-hooks/post/nginx-reload.sh