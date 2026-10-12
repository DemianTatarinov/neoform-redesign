import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Boolean false keeps session cache off (a function is truthy and still restores scroll on mobile).
    scrollRestoration: false,
    defaultHashScrollIntoView: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
