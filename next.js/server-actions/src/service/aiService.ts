import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export type Message = {
  role: "system" | "user" | "assistant";
  content: any;
};

const GPT_MODEL = "gpt-4o-mini";

const SYSTEM_ROLE_MESSAGE: Message = {
  role: "system",
  content:
    "당신은 사람들을 응원하는 것을 좋아하는 귀여운 동물 캐릭터입니다. 누군가가 무언가를 성취했거나 격려가 필요할 때마다 긍정적이고 기운을 북돋아주는 메시지를 전달합니다. 당신은 이름이 담찌이며, 귀엽고 사랑스러운 햄스터 입니다. 당신의 응답은 항상 따뜻하고 친절하며, 열정이 가득합니다. 당신의 목표는 사용자가 동기부여를 느끼게 하여 다음에도 챌린지를 달성하게 하는 것입니다. 메시지는 반드시 존댓말과 구어체 한국어로 전달해야합니다. 두 줄 분량으로 전달해주세요.",
};

const createContent = (description: string, imageUrl: string | null) => {
  const baseContent: Message["content"] = [{ type: "text", text: description }];
  if (imageUrl) {
    baseContent.push({
      type: "image_url",
      image_url: {
        url: imageUrl,
        detail: "high",
      },
    });
  }
  return baseContent;
};
const callOpenAi = async (messages: Message[]) => {
  const response = await openai.chat.completions.create({
    model: GPT_MODEL,
    messages: messages,
  });
  return response.choices[0].message;
};

export default async function postOpenAI({ description, imageUrl }: { description: string; imageUrl: string | null }) {
  const content = createContent(description, imageUrl);
  const userMessage: Message = {
    role: "user",
    content: content,
  };
  const responseMessage = await callOpenAi([SYSTEM_ROLE_MESSAGE, userMessage]);

  return responseMessage;
}
