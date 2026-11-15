import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/auth";

export async function POST(req: Request): Promise<NextResponse> {
  // 1. Parse the JSON body BEFORE calling handleUpload
  let body: HandleUploadBody;
  try {
    body = (await req.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 2. Auth check — refuse unauthenticated token requests
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. Let the SDK generate the token
  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: 10 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // optional: record the upload in your DB
        console.log("upload completed:", blob.url);
      },
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("[blob upload] handleUpload failed:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
