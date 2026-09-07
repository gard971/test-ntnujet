const {
    pgTable,
    serial,
    varchar,
    text,
    boolean,
    timestamp
} = require("drizzle-orm/pg-core");

const employees = pgTable("employees", {
    id: serial("id").primaryKey(),

    name: varchar("name", {length: 255}).notNull(),

    position: varchar("position", {length: 255}).notNull(),

    department: varchar("department", {length: 255}),

    imageUrl: text("image_url"),

    createdAt: timestamp("created_at")
    .notNull()
    .defaultNow()

})

const admins = pgTable("admins", {
    username: varchar("username", {length: 255}).notNull(),

    password: varchar("password", {length: 255}).notNull()
})

module.exports ={
    employees,
    admins
}