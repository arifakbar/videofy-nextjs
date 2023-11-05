import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

//For deletion
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi();
