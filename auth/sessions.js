const crypto = require("crypto");

const sessions = new Map();

function createSession(userId) {
    const token = crypto.randomBytes(32).toString("hex");

    sessions.set(token, {
        userId,
        expiresAt: Date.now() + 1000 * 60 * 60 * 24
    });

    return token;
}

function getSession(token) {
    return sessions.get(token);
}

function deleteSession(token) {
    sessions.delete(token);
}

function deleteSessionByUserId(userId) {
    userId = parseInt(userId); // Ensure userId is an integer
    for (const [token, session] of sessions) {
        if (session.userId === userId) {
            sessions.delete(token);
        }
    }
}

setInterval(() => {
    const now = Date.now();

    for (const [token, session] of sessions) {
        if (session.expiresAt < now) {
            sessions.delete(token);
        }
    }
}, 1000 * 60 * 15);

module.exports = {
    createSession,
    getSession,
    deleteSession,
    deleteSessionByUserId
};