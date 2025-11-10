# 💬 Node.js (ESM) TCP Chat Server

A real-time multi-user **TCP Chat Server** built using Node.js **(ESM modules)** and the **native `net` library** — no frameworks or external packages.  
This project demonstrates understanding of **socket programming**, **concurrency**, and **custom TCP protocol design**.

---

## 🚀 Project Overview

### 🎯 Goal
To build a **multi-client TCP chat server** that allows users to:
- Connect via TCP
- Login with a unique username
- Send and receive chat messages in real time
- List online users
- Send private (DM) messages
- Automatically disconnect inactive users
- Use heartbeat (`PING` → `PONG`) for connection check

---

## ⚙️ Tech Stack
- **Language:** Node.js (ESM)
- **Core Module:** `net`
- **Concurrency Model:** Event-driven, non-blocking I/O
- **No frameworks, no databases, no external dependencies**

---

## 🧩 Features

| Feature | Description | Command / Behavior |
|----------|--------------|--------------------|
| 🔐 **Login** | Login with a username | `LOGIN <username>` |
| 💬 **Broadcast Message** | Send messages to all users | `MSG <text>` |
| 👥 **List Users** | Show all connected usernames | `WHO` |
| ✉️ **Private Message (DM)** | Send direct message to one user | `DM <username> <text>` |
| ❤️ **Heartbeat** | Check if server is alive | `PING` → `PONG` |
| ⏳ **Idle Timeout** | Auto disconnect after 60s inactivity | `INFO <username> disconnected` |
| 🔌 **Disconnect Notice** | Notify when a user leaves | `INFO <username> disconnected` |
| ⚠️ **Error Handling** | Graceful errors for invalid inputs | `ERR <reason>` |

---

## 🗂️ Project Structure

<img width="616" height="590" alt="image" src="https://github.com/user-attachments/assets/b8382d02-d32e-49d1-8116-052817be4a76" />

---

---

## 🧱 Installation & Setup

### 1.Clone the Repository
```bash
git clone my repo
```
### 2.Ensure ESM Module Support: 
```bash
Make sure your package.json includes:
{
  "type": "module"
}
```
### 3.Install the packages
```bash
npm install 
npm install nodemon
```

### 4.Run the Server
```bash
node index.js
```
### 5.Server starts:
```bash
Chat server running on port 4000
```
---

### 💬Connecting Clients
You can use Netcat (nc) or Telnet to connect clients.

### 🧩 Open New Terminal Client 1 → 
```bash
nc localhost 4000
```
### 🧩 Open New Terminal Client  → 
```bash
nc localhost 4000
```
---
### Example Interaction 

### Step 1: Run the server
<img width="1580" height="522" alt="image" src="https://github.com/user-attachments/assets/5a2e1dc1-85f7-475a-886d-eebdbe63e8d5" />

 ### Step 2: Open New terminal And Login 
<img width="1588" height="524" alt="image" src="https://github.com/user-attachments/assets/129ac2e9-99e1-446c-8b5b-2aa488b93ecb" />

### Step 3: Open one more new terminal and Login with different user 
<img width="1598" height="540" alt="image" src="https://github.com/user-attachments/assets/2c9d7d50-a409-4136-a7cc-9015e3628ee6" />

### Example through a demo video

https://www.loom.com/share/429da013003e4b0eaae5c5329462757e









