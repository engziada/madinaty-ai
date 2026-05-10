"use client";

import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  ChatBubble — Bot and user message bubbles                         */
/* ------------------------------------------------------------------ */

interface ChatBubbleProps {
  sender: "bot" | "user";
  children?: ReactNode;
  /** Optional avatar element shown beside bot messages. */
  avatar?: ReactNode;
  /** If true, shows a typing indicator animation instead of content. */
  isTyping?: boolean;
  /** Extra class names. */
  className?: string;
}

/**
 * A single chat message bubble.
 *
 * Bot messages appear on the inline-start side (left in LTR, right in RTL).
 * User messages appear on the inline-end side.
 */
export function ChatBubble({
  sender,
  children,
  avatar,
  isTyping = false,
  className = "",
}: ChatBubbleProps) {
  return (
    <div
      className={`chat-bubble-row chat-bubble-row--${sender} ${className}`}
      role="listitem"
    >
      {sender === "bot" && avatar && (
        <div className="chat-bubble-avatar" aria-hidden="true">
          {avatar}
        </div>
      )}

      <div className={`chat-bubble chat-bubble--${sender}`}>
        {isTyping ? (
          <div className="chat-typing-indicator" aria-label="Typing…">
            <span className="chat-typing-dot" />
            <span className="chat-typing-dot" />
            <span className="chat-typing-dot" />
          </div>
        ) : (
          <div className="chat-bubble-content">{children}</div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ChatWidgetBubble — Wraps an input widget inside the chat thread   */
/* ------------------------------------------------------------------ */

interface ChatWidgetBubbleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps dynamic input widgets (text field, button grid, checkbox grid,
 * cascading selects) so they appear inline within the chat thread,
 * visually below the last bot message.
 */
export function ChatWidgetBubble({ children, className = "" }: ChatWidgetBubbleProps) {
  return (
    <div className={`chat-widget-bubble ${className}`} role="listitem">
      <div className="chat-widget-inner">{children}</div>
    </div>
  );
}
