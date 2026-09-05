import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "../db";
import { protectedProcedure, router } from "../_core/trpc";

const databaseError = (error: unknown) => {
  console.error("[Echoes] database operation failed", error);
  throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "The Echo archive is temporarily unavailable." });
};

const externalUrlSchema = z
  .string()
  .trim()
  .url()
  .max(1024)
  .refine((value) => {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:";
  }, "External links must use http or https.");

export const echoesRouter = router({
  list: protectedProcedure.query(async () => {
    try { return await db.listEchoes(); } catch (error) { return databaseError(error); }
  }),
  create: protectedProcedure.input(z.object({
    title: z.string().trim().min(2).max(180),
    practice: z.string().trim().min(2).max(80),
    description: z.string().trim().min(10).max(5000),
    externalUrl: externalUrlSchema.optional().or(z.literal("")),
  })).mutation(async ({ ctx, input }) => {
    try { return await db.createEcho({ authorId: ctx.user.id, ...input, externalUrl: input.externalUrl || undefined }); } catch (error) { return databaseError(error); }
  }),
  comments: protectedProcedure.input(z.object({ echoId: z.number().int().positive() })).query(async ({ input }) => {
    try { return await db.listEchoComments(input.echoId); } catch (error) { return databaseError(error); }
  }),
  addComment: protectedProcedure.input(z.object({ echoId: z.number().int().positive(), content: z.string().trim().min(2).max(2000) })).mutation(async ({ ctx, input }) => {
    try { return await db.createEchoComment({ echoId: input.echoId, authorId: ctx.user.id, content: input.content }); } catch (error) { return databaseError(error); }
  }),
});
