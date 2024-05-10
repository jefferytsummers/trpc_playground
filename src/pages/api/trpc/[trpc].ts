/**
 * This file contains tRPC's HTTP response handler
 */
import { createContext } from "@/server/context";
import { appRouter } from "@/server/routers/_app";
import * as trpcNext from "@trpc/server/adapters/next";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  /**
   * @link https://trpc.io/docs/v11/context
   */
  createContext,
  /**
   * @link https://trpc.io/docs/v11/error-handling
   */
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
      return;
    }
    console.log({ error });
  },
  /**
   * @link https://trpc.io/docs/v11/caching#api-response-caching
   */
  // responseMeta() {
  //   // ...
  // },
});
