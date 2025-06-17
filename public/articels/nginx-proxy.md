# Nginx Proxy

<hr style="border: 1px solid #1eadef;margin: 1rem 0">

**Setup - Nginx as Proxy**

<small>
For Productive Setup you need a Nginx Proxy pointing for the Storefront Port 4000 and for Admin to 8090 like configured in Docker Compose.
After that you can configure a HTTPS Cert in Nginx for Secure Communication using Lets Ecrypt.
</small>

    server {
        listen 80;
        server_name admin.your-domain.com;

        location / {
            proxy_pass http://localhost:8090;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

---

<hr style="border: 1px solid #1eadef;margin: 1rem 0">

**Staging and Develop**

<small>
For Development and Stageing you can configure the Docker Compose Files, update the Secrets.
Everyhting should be configureable in Demo Project.
</small>

    server {
        listen 80;
        server_name www.your-domain.com;
        location / {
            proxy_pass http://localhost:4000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
