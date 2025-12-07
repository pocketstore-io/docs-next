# Requirements

### NVM install
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    source ~/.bashrc
    nvm install --lts

### Npm install global
    npm i -g pm2 bun npm

### Snap install
    apt-get install snapd

### Go install
    snap install go --classic

### Certbot install
    snap install certbot --classic

---

### Docker + Compose
[Zur Documenation von Docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

**Ports and Names**

#### .env

```
CONTAINER_NUXT=nuxt_test
PORT_NUXT=8080
CONTAINER_POCKETBASE=pb_test
PORT_POCKETBASE=8090
```
