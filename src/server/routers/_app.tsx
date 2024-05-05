/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from "../trpc";
import { itineraryRouter } from "./itinerary";

export const appRouter = router({
  appName: publicProcedure.query(() => "save the date"),
  itinerary: itineraryRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
