"use client";

import { useMemo, useState } from "react";
import type { ChatMessage, SiteContent } from "@/types/site";

interface ChatPanelProps {
  content: SiteContent;
}

/**
 * Interactive AI chat panel with local simulated responses.
 */
export function ChatPanel({ content }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(content.chat.messages);
  const [inputValue, setInputValue] = useState<string>("");

  const cannedReply = useMemo<string>(() => {
    if (content.chat.send === "إرسال") {
      return "تلقيت رسالتك. سيقوم مساعد مدينتي بالرد التفصيلي خلال لحظات.";
    }
    return "Got your message. Madinaty Assistant will provide a detailed response shortly.";
  }, [content.chat.send]);

  function handleSend(): void {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmedInput },
      { role: "ai", content: cannedReply }
    ];

    setMessages(nextMessages);
    setInputValue("");
  }

  return (
    <div className="chat-wrap reveal">
      <div className="chat">
        <div className="chat-top">
          <div className="chat-top-left">
            <span className="status-dot" />
            <div>
              <div className="chat-top-name">Madinaty Assistant</div>
              <div className="chat-top-status">{content.chat.systemOnline}</div>
            </div>
          </div>
          <div className="status-row">
            <span className="ai-pulse" />
            Live
          </div>
        </div>

        <div className="chat-body">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`msg ${message.role === "ai" ? "msg-ai" : "msg-user"}`}>
              {message.content}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={content.chat.placeholder}
            aria-label={content.chat.placeholder}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSend();
              }
            }}
          />
          <button className="btn btn-primary" type="button" onClick={handleSend}>
            {content.chat.send}
          </button>
        </div>
      </div>
    </div>
  );
}
