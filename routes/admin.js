const express = require("express")
const adminRouter = express.Router();

adminRouter.post("/admin", async (req, res) => {
    const { username, password, fullName} = req.body;

    const result = await db
        .select()
        .from(admins)
        .where(eq(admins.username, username))
        .limit(1);

    if (result.length > 0) {
        return res.status(400).json({
            error: "Username already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await db.insert(admins).values({
        username,
        password: hashedPassword,
        fullName
    }).returning();
    res.status(201).json({
        success: true,
        admin: newAdmin[0]
    });
});

adminRouter.delete("/admin", async (req, res) => {
    const { username } = req.body;

    const result = await db
        .delete(admins)
        .where(eq(admins.username, username))
        .returning();

    if (result.length === 0) {
        return res.status(404).json({
            error: "Admin not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Admin deleted successfully"
    });
});

adminRouter.get("/admin", async (req, res) => {
    const result = await db
        .select()
        .from(admins);

    res.status(200).json({
        success: true,
        admins: result
    });
});

adminRouter.post("/employee", async (req, res) => {
    const { fullname, role, team, email, shortBio } = req.body;

    const newEmployee = await db.insert(employees).values({
        fullname,
        role,
        team,
        email,
        shortBio
    }).returning();

    res.status(201).json({
        success: true,
        employee: newEmployee[0]
    });
});

adminRouter.delete("/employee", async (req, res) => {
    const { email } = req.body;

    const result = await db
        .delete(employees)
        .where(eq(employees.email, email))
        .returning();

    if (result.length === 0) {
        return res.status(404).json({
            error: "Employee not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Employee deleted successfully"
    });
});
module.exports = { adminRouter }