const {
    pgTable,
    serial,
    varchar,
    text,
    boolean,
    timestamp,
    date,
    jsonb
} = require("drizzle-orm/pg-core");

const employees = pgTable("employees", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    position: varchar("position", { length: 255 }).notNull(),

    department: varchar("department", { length: 255 }),

    shortBio: text("short_bio"),

    email: varchar("email", { length: 255 }),

    imageUrl: text("image_url").default("assets/temp-profile-20260806.png"),

    boardMember: boolean("board_member").default(false)

})

const admins = pgTable("admins", {
    id: serial("id").primaryKey(),
    
    username: varchar("username", { length: 255 }).notNull(),

    password: varchar("password", { length: 255 }).notNull()
})

const newsletters = pgTable("newsletters", {

    id: serial("id").primaryKey(),

    title: varchar("title", { length: 255 }).notNull(),

    publishDate: date("publish_date").notNull(),

    author: varchar("author", { length: 255 }).notNull(),

    description: text("description").notNull(),

    imageUrl: text("image_url"),

    content: jsonb("content").notNull()
});

const newsletterDrafts = pgTable("newsletter_drafts", {

    id: serial("id").primaryKey(),

    title: varchar("title", { length: 255 }).notNull(),

    category: varchar("category", { length: 255 }).notNull(),

    publishDate: timestamp("publish_date").notNull(),

    author: varchar("author", { length: 255 }).notNull(),

    description: text("description").notNull(),

    imageUrl: text("image_url"),

    content: text("content").notNull()
});

const openings = pgTable("openings", {

    id: serial("id").primaryKey(),

    title: varchar("title", { length: 255 }).notNull(),

    description: text("description").notNull(),

    department: varchar("department", { length: 255 }).notNull(),

});

module.exports = {
    employees,
    admins,
    newsletters,
    newsletterDrafts,
    openings
}