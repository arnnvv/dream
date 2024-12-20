import {
  boolean,
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
  is_admin: boolean("is_admin").default(false),
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

export const trecks = createTable("trecks", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
});

export type Treck = typeof trecks.$inferSelect;
export type NewTreck = typeof trecks.$inferInsert;

export const treckImages = createTable("treck_images", {
  id: serial("id").primaryKey(),
  treckId: integer("treck_id")
    .notNull()
    .references(() => trecks.id),
  imageUrl: text("image_url").notNull(),
  order: integer("order").default(0),
});

export type TreckImage = typeof treckImages.$inferSelect;
export type NewTreckImage = typeof treckImages.$inferInsert;

export const testimonials = createTable("testimonials", {
  id: serial("id").primaryKey(),
  review: text("review").notNull(),
  name: varchar("name").notNull(),
  heading: varchar("title").notNull(),
  image: text("image_url").notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
