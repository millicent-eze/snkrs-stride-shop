# 👟 Sneaker Store — Full Stack App

A full-stack web application built with **Node.js, Express, MongoDB and HTML/CSS/JS**, deployed to **AWS EC2** automatically via **GitHub Actions**.

---

## 📁 Project Structure

```
sneaker-store/
├── frontend/
│   └── index.html              # Frontend UI (HTML, CSS, JS)
├── backend/
│   ├── server.js               # Express server entry point
│   ├── package.json            # Node.js dependencies
│   ├── .env.example            # Environment variable template
│   ├── models/
│   │   └── Sneaker.js          # MongoDB data model
│   └── routes/
│       └── sneakers.js         # API routes (GET, POST, PUT, DELETE)
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (cloud) |
| Deployment | AWS EC2 (Ubuntu) |
| CI/CD | GitHub Actions |
| Process Manager | PM2 |

---

## 🚀 STEP BY STEP SETUP GUIDE

---

### PART 1 — Set Up MongoDB Atlas (Database)

1. Go to https://www.mongodb.com/atlas and create a free account
2. Click **"Build a Database"** → choose **FREE (M0 Sandbox)**
3. Choose **AWS** as cloud provider → pick a region close to you
4. Create a **username and password** — save these!
5. Under **Network Access** → click **"Add IP Address"** → choose **"Allow access from anywhere"** (0.0.0.0/0)
6. Under **Database** → click **"Connect"** → **"Connect your application"**
7. Copy the connection string — it looks like:
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/sneaker-store
   ```
8. Replace `username` and `password` with yours — this is your **MONGO_URI**

---

### PART 2 — Set Up AWS EC2 (Your Server)

1. Go to **AWS Console → EC2 → Launch Instance**
2. Settings:
   - Name: `sneaker-store-server`
   - OS: **Ubuntu 22.04 LTS**
   - Instance type: **t2.micro** (free tier)
   - Key pair: Create new → name it `sneaker-key` → Download the `.pem` file
3. Under **Security Group** — add these inbound rules:
   - SSH: Port **22** (your IP or anywhere)
   - Custom TCP: Port **5000** (anywhere) ← your API port
   - HTTP: Port **80** (anywhere)
4. Click **Launch Instance**
5. Note your **EC2 Public IP** address

---

### PART 3 — Set Up EC2 Server (One Time)

SSH into your EC2 from your terminal:

```bash
# Make your key file secure first
chmod 400 sneaker-key.pem

# Connect to your EC2
ssh -i sneaker-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

Once inside EC2, run these commands one by one:

```bash
# Update the server
sudo apt update && sudo apt upgrade -y

# Install Node.js (v18)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 globally (keeps your app running)
sudo npm install -g pm2

# Create the project folder
mkdir -p /home/ubuntu/sneaker-store
```

---

### PART 4 — Add GitHub Secrets

Go to your GitHub repo → **Settings → Secrets and variables → Actions**

Add these secrets:

| Secret Name | Value |
|---|---|
| `EC2_HOST` | Your EC2 Public IP e.g. `54.123.45.67` |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Contents of your `.pem` file (open it in notepad, copy everything) |
| `MONGO_URI` | Your MongoDB connection string |

---

### PART 5 — Test Locally First

```bash
# Go into backend folder
cd backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Open .env and paste your MONGO_URI

# Start the server
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

Open your browser and go to `http://localhost:5000` — you should see:
```json
{ "message": "👟 Sneaker Store API is running!" }
```

Then open `frontend/index.html` in your browser to use the UI!

---

### PART 6 — Test Your API Routes

Use these commands in your terminal to test the API:

```bash
# GET all sneakers
curl http://localhost:5000/api/sneakers

# POST a new sneaker
curl -X POST http://localhost:5000/api/sneakers \
  -H "Content-Type: application/json" \
  -d '{"name":"Air Max 90","brand":"Nike","price":150,"size":42}'

# DELETE a sneaker (replace ID with real one)
curl -X DELETE http://localhost:5000/api/sneakers/YOUR_SNEAKER_ID
```

---

### PART 7 — Deploy to EC2 via GitHub Actions

```bash
# Push your project to GitHub
git init
git add .
git commit -m "first commit: full stack sneaker store"
git remote add origin https://github.com/YOUR_USERNAME/sneaker-store.git
git push -u origin main
```

GitHub Actions will automatically:
1. ✅ Copy your files to EC2
2. ✅ Install dependencies
3. ✅ Create the .env file from secrets
4. ✅ Start/restart the app with PM2

---

### PART 8 — Update Frontend to Use EC2

Open `frontend/index.html` and change line:
```javascript
// FROM this (local)
const API = 'http://localhost:5000/api/sneakers';

// TO this (EC2)
const API = 'http://YOUR_EC2_PUBLIC_IP:5000/api/sneakers';
```

Then push again and your frontend will talk to your live EC2 server!

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/sneakers` | Get all sneakers |
| GET | `/api/sneakers/:id` | Get one sneaker |
| POST | `/api/sneakers` | Add a new sneaker |
| PUT | `/api/sneakers/:id` | Update a sneaker |
| DELETE | `/api/sneakers/:id` | Delete a sneaker |

---

## 🔧 Useful PM2 Commands (run on EC2)

```bash
pm2 list                    # See all running apps
pm2 logs sneaker-store      # View live logs
pm2 restart sneaker-store   # Restart the app
pm2 stop sneaker-store      # Stop the app
pm2 startup                 # Auto-start on server reboot
```

---

## 💡 What You're Practicing

- ✅ **Node.js** — JavaScript on the server side
- ✅ **Express.js** — building REST APIs
- ✅ **MongoDB + Mongoose** — NoSQL database with schema
- ✅ **REST API** — GET, POST, PUT, DELETE requests
- ✅ **AWS EC2** — deploying to a real virtual machine
- ✅ **PM2** — keeping your app alive on a server
- ✅ **GitHub Actions** — automated deployment pipeline
- ✅ **Environment variables** — keeping secrets safe
- ✅ **SSH** — connecting to a remote server

---

*Built for learning · Deployed with GitHub Actions · Hosted on AWS EC2*
