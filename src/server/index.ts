import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => [10, 20, 30]),
  //   hello: publicProcedure
  //     .input(
  //       z.object({
  //         text: z.string(),
  //       }),
  //     )
  //     .query((opts) => {
  //       return {
  //         greeting: `hello ${opts.input.text}`,
  //       };
  //     }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
