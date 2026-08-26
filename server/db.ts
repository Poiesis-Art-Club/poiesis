import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { echoComments, echoes, InsertUser, profiles, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getProfileByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  return result[0];
}

export async function saveProfile(input: { userId: number; displayName?: string; bio?: string; practices?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const values = {
    userId: input.userId,
    displayName: input.displayName || null,
    bio: input.bio || null,
    practices: input.practices || null,
  };
  await db.insert(profiles).values(values).onDuplicateKeyUpdate({
    set: {
      displayName: values.displayName,
      bio: values.bio,
      practices: values.practices,
    },
  });
  return getProfileByUserId(input.userId);
}

export async function listEchoes() {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.select().from(echoes).orderBy(desc(echoes.createdAt)).limit(60);
}

export async function getEchoById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.select().from(echoes).where(eq(echoes.id, id)).limit(1);
  return result[0];
}

export async function createEcho(input: { authorId: number; title: string; practice: string; description: string; externalUrl?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(echoes).values({ ...input, externalUrl: input.externalUrl || null });
  return getEchoById(Number(result[0].insertId));
}

export async function listEchoComments(echoId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  return db.select().from(echoComments).where(eq(echoComments.echoId, echoId)).orderBy(desc(echoComments.createdAt));
}

export async function createEchoComment(input: { echoId: number; authorId: number; content: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const result = await db.insert(echoComments).values(input);
  const commentId = Number(result[0].insertId);
  const resultRows = await db.select().from(echoComments).where(eq(echoComments.id, commentId)).limit(1);
  return resultRows[0];
}
