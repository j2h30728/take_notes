"use client";

import { supabase } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";

interface AiComment {
  text: string;
  AiBot: { name: string } | { name: string }[];
}

export default function AiComment({ tweetId }: { tweetId: number }) {
  const [comment, setComment] = useState<AiComment | null>(null);

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
        setComment(data);
      }
    };

    fetchInitialComment();

    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "AiComment", filter: `tweetId=eq.${tweetId}` },
        (payload: { new: AiComment }) => {
          setComment(payload.new);
          supabase.removeChannel(channel);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [tweetId]);

  if (comment === null) {
    return <div>Loading</div>;
  }

  return (
    <div className="bg-red-200 w-full">
      <h3>{Array.isArray(comment.AiBot) ? comment.AiBot[0].name : comment.AiBot.name}</h3>
      <span>{comment?.text}</span>
    </div>
  );
}
