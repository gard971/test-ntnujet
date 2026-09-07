const { getSession, deleteSession } = require("../auth/sessions");

function requireAuth(req, res, next) {
    const token = req.cookies.session;

    if (!token) {
        return res.status(401).json({
            error: "Not authenticated"
        });
    }

    const session = getSession(token);

    if (!session) {
        return res.status(401).json({
            error: "Invalid session"
        });
    }

    if (session.expiresAt < Date.now()) {
        deleteSession(token);

        return res.status(401).json({
            error: "Session expired"
        });
    }

    req.userId = session.userId;

    next();
}

module.exports = {
    requireAuth 
};