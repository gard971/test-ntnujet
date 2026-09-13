const express = require("express");
const apiRouter = express.Router();

const bcrypt = require("bcrypt");
const { eq, desc } = require("drizzle-orm");

const { db } = require("../db");
const { employees, admins, openings, newsletters } = require("../db/schema");
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
        secure: false, // Set to true if using HTTPS
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    });

    res.json({
        success: true
    });
});

apiRouter.get("/employees", async (req, res) => {
    const result = await db
        .select()
        .from(employees);

    res.status(200).json({
        success: true,
        employees: result
    });
});

apiRouter.get("/openings", async (req, res) => {
    const result = await db
        .select()
        .from(openings);

    res.status(200).json({
        success: true,
        openings: result
    });
});
apiRouter.get("/newsletters", async (req, res) => {
    try {
        const issues = await db
            .select({
                id: newsletters.id,
                title: newsletters.title,
                publishDate: newsletters.publishDate,
                author: newsletters.author,
                description: newsletters.description,
                imageUrl: newsletters.imageUrl
            })
            .from(newsletters)
            .orderBy(desc(newsletters.publishDate));

        res.json({ issues });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Could not load newsletters"
        });
    }
});

apiRouter.get("/newsletter/:id", async (req, res) => {
    const URLid = req.params.id
    console.log(URLid)
    const result = await db
    .select()
    .from(newsletters)
    .where(eq(newsletters.id, URLid))
    console.log(result)
    if(result.length < 1){
        return res.status(404).json({
            error:"Newsletter not found"
        })
    }
    res.status(200).json({
        issue:result
    })
})

module.exports = { apiRouter };