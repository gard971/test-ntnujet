const express = require("express");
const apiRouter = express.Router();

const bcrypt = require("bcrypt");
const { eq } = require("drizzle-orm");

const { db } = require("../db");
const { admins } = require("../db/schema");

const { createSession } = require("../auth/sessions");
const { requireAuth } = require("../middleware/requireAuth");
const { adminRouter } = require("./admin");


apiRouter.use("/admin", requireAuth, adminRouter);


apiRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const result = await db
        .select()
        .from(admins)
        .where(eq(admins.username, username))
        .limit(1);

    if (result.length === 0) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    const user = result[0];

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
        return res.status(401).json({
            error: "Invalid username or password"
        });
    }

    const token = createSession(user.id);

    res.cookie("session", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    });

    res.json({
        success: true
    });
});


module.exports = { apiRouter };