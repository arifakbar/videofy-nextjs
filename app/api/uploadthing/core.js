import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profilePic: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const session = await getServerSession();
      if (!session.user) throw new Error("Unauthorized");
      //       console.log(session.user);
      return { userName: session.user?.name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userName);
      console.log("file url", file.url);
    }),
};
