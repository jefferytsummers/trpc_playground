import { z } from 'zod';
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
        .mutation(async ({ ctx, input: { name }, }) => {
            return await ctx.prisma.user.create({ data: { name: name, email: 'test@email.com' } })
        })
});

// export type definition of API
export type AppRouter = typeof appRouter;