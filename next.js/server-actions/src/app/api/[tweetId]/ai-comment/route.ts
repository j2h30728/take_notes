import db from "@/utils/db";

export async function GET(request: Request, { params }: { params: { tweetId: string } }) {
  const tweetId = Number(params.tweetId);

  // Check if tweetId is valid
  if (isNaN(tweetId)) {
    return new Response(JSON.stringify({ data: null, success: false, error: "Invalid tweetId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Fetch AI comment associated with the tweetId
    const response = await db.aiComment.findFirst({
      where: { tweetId },
      include: {
        aiBot: true,
      },
    });
    const comment = { text: response?.text, aiBotName: response?.aiBot.name };
    // Return response with the fetched comment
    return new Response(JSON.stringify({ data: comment, success: true, error: null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Return response with error details
    if (error instanceof Error)
      return new Response(JSON.stringify({ data: null, success: false, error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
  }
}
