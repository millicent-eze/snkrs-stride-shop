# 📓 Cloud Learning Journal — Docker Edition

A full stack app with **Frontend, Backend, MongoDB and Nginx** — all running in Docker containers, deployed to AWS EC2 via GitHub Actions.

---

## 📁 Project Structure

```
cloud-journal/
├── frontend/
│   ├── index.html              # Journal UI
│   └── Dockerfile              # Frontend container
├── backend/
│   ├── server.js               # Express API
│   ├── package.json
│   ├── Dockerfile              # Backend container
│   ├── models/
│   │   └── Entry.js            # MongoDB schema
│   └── routes/
│       └── entries.js          # API endpoints
├── nginx/
│   └── nginx.conf              # Reverse proxy config
├── docker-compose.yml          # Runs all 4 containers
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions pipeline
├── .gitignore
└── README.md
```

---

## 🐳 Docker Concepts — Plain English

| Term | What it means |
|---|---|
| **Image** | A blueprint/recipe for a container |
| **Container** | A running instance of an image — like a mini computer |
| **Dockerfile** | Instructions to build an image |
| **docker-compose** | Tool to run multiple containers together |
| **Volume** | Saves data permanently even if container restarts |
| **Network** | Private channel containers use to talk to each other |

---

## 🚀 STEP BY STEP GUIDE

---

### PART 1 — Install Docker on your laptop (Windows)

1. Go to https://www.docker.com/products/docker-desktop
2. Download **Docker Desktop for Windows**
3. Install and restart your computer
4. Open terminal and verify:

```bash
docker --version
docker-compose --version
```

---

### PART 2 — Run the app locally with Docker

```bash
# Clone or navigate to your project
cd cloud-journal

# Build and start all 4 containers
docker-compose up --build

# You should see all 4 containers starting:
# ✅ journal-db (MongoDB)
# ✅ journal-backend (Node.js)
# ✅ journal-frontend (HTML)
# ✅ journal-nginx (Nginx)
```

Open your browser and visit:
```
http://localhost
```

Your journal app is live! 🎉

---

### PART 3 — Useful Docker commands to practice

```bash
# See all running containers
docker ps

# See all containers (including stopped)
docker ps -a

# See all images
docker images

# Stop all containers
docker-compose down

# Start containers in background (detached mode)
docker-compose up -d

# See logs from a specific container
docker logs journal-backend
docker logs journal-db

# Go inside a running container
docker exec -it journal-backend sh

# Remove everything (containers, images, volumes)
docker-compose down -v --rmi all
```

---

### PART 4 — Install Docker on EC2

SSH into your EC2 and run:

```bash
# Update packages
sudo apt update

# Install Docker
sudo apt install -y docker.io

# Install Docker Compose
sudo apt install -y docker-compose

# Add ubuntu user to docker group (no sudo needed)
sudo usermod -aG docker ubuntu

# Log out and back in for group change to take effect
exit
```

SSH back in and verify:
```bash
docker --version
docker-compose --version
```

---

### PART 5 — Add GitHub Secrets

Go to your GitHub repo → **Settings → Secrets → Actions**

| Secret | Value |
|---|---|
| `EC2_HOST` | Your EC2 public IP |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Contents of your `.pem` file |

---

### PART 6 — Push to GitHub and deploy

```bash
git init
git add .
git commit -m "first commit: cloud journal docker app"
git remote add origin https://github.com/YOUR_USERNAME/cloud-journal.git
git push -u origin main
```

GitHub Actions will:
1. ✅ Copy files to EC2
2. ✅ Stop existing containers
3. ✅ Rebuild Docker images
4. ✅ Start all 4 containers
5. ✅ Your app is live!

---

### PART 7 — Open port 80 on EC2

1. AWS Console → EC2 → Security Groups
2. Edit inbound rules → Add:
   - HTTP: Port **80** → Anywhere
3. Save

Visit your app:
```
http://YOUR_EC2_PUBLIC_IP
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/entries` | Get all entries |
| GET | `/api/entries/:id` | Get one entry |
| POST | `/api/entries` | Create entry |
| PUT | `/api/entries/:id` | Update entry |
| DELETE | `/api/entries/:id` | Delete entry |

---

## 💡 What You're Practicing

- ✅ **Docker** — containerizing apps
- ✅ **Dockerfile** — writing container build instructions
- ✅ **docker-compose** — running multi-container apps
- ✅ **Nginx** — reverse proxy and static file serving
- ✅ **Node.js + MongoDB** — full stack backend
- ✅ **GitHub Actions** — automated Docker deployment
- ✅ **AWS EC2** — hosting containers in the cloud

---

## 🔄 Difference from manual method

| Manual (yesterday) | Docker (today) |
|---|---|
| Install Node.js on server | Node.js lives inside container |
| Install MongoDB on server | MongoDB lives inside container |
| Use PM2 to keep app running | Docker restart policy handles it |
| Hard to move to another server | Works on ANY server with Docker |
| Setup takes hours | `docker-compose up` — done! |

---

*Built for learning · Dockerized · Deployed with GitHub Actions · Hosted on AWS EC2*