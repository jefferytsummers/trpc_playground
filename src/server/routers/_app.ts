import { z } from 'zod';
import { db } from '../db'
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
    createUser: procedure
    .input(z.object({
        name: z.string(),
        })
    )
    .mutation(async (opts) => {
        const { input: { name } } = opts;
        return await db.user.createUser(name);
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;