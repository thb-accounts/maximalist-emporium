import { MessageCircle } from "lucide-react";

const TAWK_URL = "https://tawk.to/chat/6a12e700d15b551c346eaaa6/1jpctcnck";

export function ChatButton() {
  return (
    <a
      href={TAWK_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full brutal-border brutal-shadow-hot bg-hot text-cream transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--ink)] active:translate-y-0 active:shadow-none"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">Chat With Us</span>
    </a>
  );
}
