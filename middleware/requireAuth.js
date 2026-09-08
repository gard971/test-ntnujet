const { getSession, deleteSession } = require("../auth/sessions");

function requireAuth(req, res, next) {
    const token = req.cookies.session;

    if (!token) {
        if (req.url.startsWith("/admin")) {
            return res.redirect("/admin/login");
        }
        return res.status(401).json({
            error: "Not authenticated"
        })
    }

    const session = getSession(token);

    if (!session) {
        if (req.url.startsWith("/admin")) {
            return res.redirect("/admin/login");
        }
        return res.status(401).json({
            error: "Invalid session"
        });
    }

    if (session.expiresAt < Date.now()) {
        if (req.url.startsWith("/admin")) {
            deleteSession(token);
            return res.redirect("/admin/login");
        }
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