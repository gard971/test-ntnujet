const express = require("express")
const adminRouter = express.Router();
const { db } = require("../db");
const { employees, admins, newsletters, newsletterDrafts, openings } = require("../db/schema");
const { eq } = require("drizzle-orm");
const { deleteSessionByUserId } = require("../auth/sessions");
const bcrypt = require("bcrypt");
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/assets/employepics"));
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1E9);

    cb(null, uniqueName + extension);
  }
});

const upload = multer({
  storage: storage
});

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
    const { id } = req.body;

    const result = await db
        .delete(admins)
        .where(eq(admins.id, id))
        .returning();

    if (result.length === 0) {
        return res.status(404).json({
            error: "Admin not found"
        });
    }
    // Delete all sessions associated with the deleted admin
    deleteSessionByUserId(id);
    
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

adminRouter.post("/employee", upload.single("image"), async (req, res) => {
    const { fullname, role, team, email, shortBio, boardMember} = req.body;

    const newEmployee = await db.insert(employees).values({
        name: fullname,
        position: role,
        department: team,
        email: email,
        shortBio: shortBio,
        boardMember: boardMember === "true",
        imageUrl: req.file ? "/assets/employepics/"+req.file.filename : undefined
    }).returning();

    res.status(201).json({
        success: true,
        employee: newEmployee[0]
    });
});

adminRouter.delete("/employee", async (req, res) => {
    const { id } = req.body;
    const result = await db
        .delete(employees)
        .where(eq(employees.id, id))
        .returning();

    await fs.promises.unlink(path.join(__dirname, "../public/", result[0].imageUrl))



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

adminRouter.post("/newsletter", async (req, res) => {
    const { title, category, publishDate, author, description, imageUrl, content } = req.body;

    const newNewsletter = await db.insert(newsletters).values({
        title,
        category,
        publishDate,
        author,
        description,
        imageUrl,
        content
    }).returning();

    res.status(201).json({
        success: true,
        newsletter: newNewsletter[0]
    });
});
adminRouter.delete("/newsletter", async (req, res) => {
    const { title } = req.body;
    const result = await db
        .delete(newsletters)
        .where(eq(newsletters.title, title))
        .returning();
    if (result.length === 0) {
        return res.status(404).json({
            error: "Newsletter not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Newsletter deleted successfully"
    });
});

adminRouter.get("/newsletter", async (req, res) => {
    const { id } = req.body;
    const result = await db
        .select()
        .from(newsletters)
        .where(eq(newsletters.id, id))
        .limit(1);
    if (result.length === 0) {
        return res.status(404).json({
            error: "Newsletter not found"
        });
    }
    res.status(200).json({
        success: true,
        newsletter: result[0]
    });
});

adminRouter.get("/newsletters", async (req, res) => {
    const result = await db
        .select()
        .from(newsletters);

    res.status(200).json({
        success: true,
        newsletters: result
    });
});


adminRouter.post("/newsletter/draft", async (req, res) => {
    const { title, category, publishDate, author, description, imageUrl, content } = req.body;

    const newNewsletterDraft = await db.insert(newsletterDrafts).values({
        title,
        category,
        publishDate,
        author,
        description,
        imageUrl,
        content
    }).returning();

    res.status(201).json({
        success: true,
        newsletterDraft: newNewsletterDraft[0]
    });
});

adminRouter.get("/newsletter/drafts", async (req, res) => {
    const result = await db
        .select()
        .from(newsletterDrafts);

    res.status(200).json({
        success: true,
        newsletterDrafts: result
    });
});

adminRouter.delete("/newsletter/draft", async (req, res) => {
    const { id } = req.body;
    const result = await db
        .delete(newsletterDrafts)
        .where(eq(newsletterDrafts.id, id))
        .returning();
    if (result.length === 0) {
        return res.status(404).json({
            error: "Newsletter draft not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Newsletter draft deleted successfully"
    });
});

adminRouter.post("/logout", async (req, res) => {
    const token = req.cookies.session;
    if (token) {
        deleteSessionByUserId(req.userId);
        res.clearCookie("session");
    }
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});

adminRouter.post("/opening", async (req, res) => {
    const { title, description, department } = req.body;

    const newOpening = await db.insert(openings).values({
        title,
        description,
        department
    }).returning();

    res.status(201).json({
        success: true,
        opening: newOpening[0]
    });
});

adminRouter.delete("/opening", async (req, res) => {
    const { id } = req.body;
    const result = await db
        .delete(openings)
        .where(eq(openings.id, id))
        .returning();
    if (result.length === 0) {
        return res.status(404).json({
            error: "Opening not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Opening deleted successfully"
    });
});

adminRouter.post("/employeeImage", upload.single("image"), async (req, res) => {
    console.log(req.file.originalname)
    console.log(req.file.filename)
    const test = await db
    .update(employees)
    .set({
        imageUrl: req.file.filename
    })
    .where(eq(employees.imageUrl, req.file.originalname))
    .returning();

    console.log(test)
    res.json({
        success:true
    })
})

module.exports = { adminRouter }