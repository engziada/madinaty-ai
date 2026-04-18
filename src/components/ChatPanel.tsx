"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { ChatMessage, LocaleCode, SiteContent } from "@/types/site";

/**
 * Minimal safe markdown renderer for AI messages.
 * Supports: **bold**, [text](url) links (http/https only), and line breaks.
 * Everything else is rendered as plain text (no HTML injection).
 */
function renderAiMarkdown(text: string): ReactNode {
  const lines = text.split("\n");

  const renderInline = (line: string, lineKey: number): ReactNode => {
    const tokens: ReactNode[] = [];
    const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let cursor = 0;
    let tokenIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(line)) !== null) {
      if (match.index > cursor) {
        tokens.push(line.slice(cursor, match.index));
      }

      if (match[1] !== undefined) {
        tokens.push(
          <strong key={`b-${lineKey}-${tokenIndex++}`}>{match[1]}</strong>
        );
      } else if (match[2] !== undefined && match[3] !== undefined) {
        tokens.push(
          <a
            key={`a-${lineKey}-${tokenIndex++}`}
            href={match[3]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {match[2]}
          </a>
        );
      }

      cursor = match.index + match[0].length;
    }

    if (cursor < line.length) {
      tokens.push(line.slice(cursor));
    }

    return tokens;
  };

  return lines.map((line, index) => (
    <Fragment key={`line-${index}`}>
      {renderInline(line, index)}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

interface ChatPanelProps {
  content: SiteContent;
  locale: LocaleCode;
}

/**
 * Interactive AI chat panel.
 *
 * UX/a11y:
 *   • Input is disabled while waiting for the AI so users cannot double-send.
 *   • A "typing…" bubble with animated dots appears as a live region while
 *     the request is in flight.
 *   • Focus returns to the input once a response arrives.
 *   • Auto-scroll to the latest message.
 */
export function ChatPanel({ content, locale }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(content.chat.messages);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the chat body to the bottom on new messages / typing state.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  async function handleSend(): Promise<void> {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: trimmedInput };
    const history = [...messages, userMessage].slice(-10);
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput, history, locale })
      });

      if (!response.ok) {
        throw new Error("Failed to reach Madinaty AI");
      }

      const payload = await response.json();
      const aiText = (payload?.reply as string | undefined) ?? content.chat.fallback;
      setMessages((prev) => [...prev, { role: "ai", content: aiText }]);
    } catch {
      setErrorMessage(content.chat.fallback);
      setMessages((prev) => [...prev, { role: "ai", content: content.chat.fallback }]);
    } finally {
      setIsLoading(false);
      // Focus the input after response settles, so keyboard users can keep typing.
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  const liveLabel = locale === "ar" ? "مباشر" : "Live";
  const betaLabel = locale === "ar" ? "نسخة تجريبية قيد التطوير" : "Beta · Under Development";

  return (
    <div className="chat-wrap reveal">
      <div className="chat">
        <div className="chat-top">
          <div className="chat-top-left">
            <span className="status-dot" />
            <div>
              <div className="chat-top-name">Madinaty Assistant ({betaLabel})</div>
              <div className="chat-top-status">{content.chat.systemOnline}</div>
            </div>
          </div>
          <div className="status-row">
            <span className="ai-pulse" />
            {liveLabel}
          </div>
        </div>

        <div
          className="chat-body"
          ref={bodyRef}
          aria-live="polite"
          aria-busy={isLoading}
          aria-label="Conversation"
        >
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`msg ${message.role === "ai" ? "msg-ai" : "msg-user"}`}
            >
              {message.role === "ai" ? renderAiMarkdown(message.content) : message.content}
            </div>
          ))}
          {isLoading && (
            <div className="msg msg-ai msg-typing" aria-label={content.chat.loadingLabel}>
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="visually-hidden">{content.chat.loadingLabel}</span>
            </div>
          )}
        </div>
        {errorMessage ? <p className="chat-error" role="status">{errorMessage}</p> : null}

        <div className="chat-input">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={content.chat.placeholder}
            aria-label={content.chat.placeholder}
            disabled={isLoading}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSend();
              }
            }}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            aria-live="polite"
          >
            {isLoading ? (
              <span className="btn-loading">
                <span className="btn-spinner" aria-hidden="true" />
                {content.chat.loadingLabel}
              </span>
            ) : (
              content.chat.send
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
