import { appRouter } from "../../../../server/index";
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = async (req: Request, res: Response) => {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({ req: req as any, res: {} as any, prisma: {} as any, }),
  })
}

export { handler as GET, handler as POST}
