import net from 'net';
const port = 4000;

const clients = new Map();
const lastActive = new Map();
const IDLE_TIMEOUT = 60000;

function broadcastMessage(message, senderSocket = null) {
    for (const [username, sock] of clients) {
        if (sock !== senderSocket) {
            sock.write(message + "\n");
        }
    }
}

function sendMessageToClient(targetUsername, message) {
    const targetSocket = clients.get(targetUsername);
    if (targetSocket) {
        targetSocket.write(message + "\n");
    }
}

setInterval(() => {
    const now = Date.now();
    for (const [username, sock] of clients) {
        const lastActiveTime = lastActive.get(sock) || now;
        if (now - lastActiveTime > IDLE_TIMEOUT) {
            sock.write("INFO Disconnected due to inactivity.\n");
            sock.end();
            clients.delete(username);
            lastActive.delete(sock);
            broadcastMessage(`INFO ${username} disconnected due to inactivity.`);
        }
    }
}, 10000);

const server = net.createServer((socket) => {
    console.log(' New client connected');
    socket.setEncoding('utf-8');
    socket.write('Welcome! Please login using: LOGIN <username>\n');
    let username = null;

    socket.on('data', (data) => {
        lastActive.set(socket, Date.now());
        const message = data.trim();
        if (!message) return;

        const command = message.split(' ')[0].toUpperCase();

        if (!username && command === 'LOGIN') {
            const name = message.split(' ')[1]?.trim();
            if (!name) {
                socket.write('ERR invalid-username\n');
                return;
            }
            if (clients.has(name)) {
                socket.write('ERR username-taken\n');
                return;
            }
            username = name;
            clients.set(username, socket);
            socket.write(`OK Logged in as ${username}\n`);
            broadcastMessage(`INFO ${username} joined`, socket);
            return;
        }

        if (!username) {
            socket.write("ERR not-logged-in\n");
            return;
        }

        if (command === 'MSG') {
            const msgContent = message.slice(4).trim();
            broadcastMessage(`MSG ${username}: ${msgContent}`, socket);
            return;
        }

        if (command === 'WHO') {
            for (const [user] of clients) {
                socket.write(`USER ${user}\n`);
            }
            return;
        }

        if (command === 'DM') {
            const parts = message.split(' ');
            if (parts.length < 3) {
                socket.write("ERR invalid-dm-format\n");
                return;
            }
            const target = parts[1];
            const text = parts.slice(2).join(' ');
            if (!clients.has(target)) {
                socket.write(`ERR user-not-found ${target}\n`);
                return;
            }
            sendMessageToClient(target, `DM ${username}: ${text}`);
            socket.write(`DM ${username}->${target}: ${text}\n`);
            return;
        }

        if (command === 'PING') {
            socket.write('PONG\n');
            return;
        }

        socket.write('ERR unknown-command\n');
    });

    socket.on('end', () => {
        console.log('Client disconnected');
        if (username && clients.has(username)) {
            clients.delete(username);
            lastActive.delete(socket);
            broadcastMessage(`INFO ${username} disconnected`);
        }
    });

    socket.on('error', (err) => {
        console.error('⚠️ Socket error:', err.message);
        if (username && clients.has(username)) {
            clients.delete(username);
            lastActive.delete(socket);
            broadcastMessage(`INFO ${username} disconnected unexpectedly.`);
        }
    });
});

server.listen(port, () => {
    console.log(`Chat server running on port ${port}`);
});
