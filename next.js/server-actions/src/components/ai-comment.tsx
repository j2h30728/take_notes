"use client";

import { supabase } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";

interface AiComment {
  text: string;
  AiBot: { name: string } | { name: string }[];
}

export default function AiComment({ tweetId }: { tweetId: number }) {
  const [aiComment, setAiComment] = useState<AiComment | null>(null);

  useEffect(() => {
    const fetchInitialComment = async () => {
      const { data, error } = await supabase
        .from("AiComment")
        .select("text, AiBot(name)")
        .eq("tweetId", tweetId)
        .single();
      if (error) {
        console.error("Error fetching comment:", error);
      } else {
        setAiComment(data);
      }
    };

    fetchInitialComment();

    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "AiComment", filter: `tweetId=eq.${tweetId}` },
        (payload: { new: AiComment }) => {
          setAiComment(payload.new);
          supabase.removeChannel(channel);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tweetId]);
  console.log(aiComment);
  if (aiComment === null) {
    return <div>Loading</div>;
  }

  return (
    <div className="bg-red-200 w-full">
      <h3>{Array.isArray(aiComment.AiBot) ? aiComment.AiBot[0].name : aiComment.AiBot.name}</h3>
      <span>{aiComment?.text}</span>
    </div>
  );
}
