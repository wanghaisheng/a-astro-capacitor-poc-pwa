import type { postRouter } from "@/backend/trpc/src/router/post";
import type { momentsRouter } from "@/backend/trpc/src/router/moments";
import type { recapsRouter } from "@/backend/trpc/src/router/recaps";
import type { userRouter } from "@/backend/trpc/src/router/user";
import type { createTRPCRouter } from "@/backend/trpc/src/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  moments: momentsRouter,
  recaps: recapsRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;