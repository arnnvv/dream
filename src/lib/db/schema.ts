import {
  integer,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator(
  (name: string): string => `dream_${name}`,
);

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  googleId: text("google_id").unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: text("name").notNull(),
  picture: text("picture").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = createTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = typeof sessions.$inferSelect;
