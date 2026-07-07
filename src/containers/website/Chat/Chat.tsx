// @ts-nocheck
import { CustomerShell } from "@/components/customer-shell";
import { CHAT_THREAD } from "@/lib/mock-data";
import { Send, Paperclip, Image as ImageIcon, Smile, Phone } from "lucide-react";
import { useState } from "react";

export function ChatPage() {
  const [messages, setMessages] = useState(CHAT_THREAD);
  const [text, setText] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages([...messages, { from: "customer", text, at: "now" }]);
    setText("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "agent", text: "Got it — confirming with the rider now.", at: "now" },
      ]);
    }, 1200);
  };

  return (
    <CustomerShell>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
          Live support
        </div>
        <h1 className="font-display text-4xl mt-2">Concierge chat</h1>

        <div className="mt-6 glass rounded-2xl overflow-hidden flex flex-col h-[640px]">
          <div className="px-5 py-4 border-b border-[color:var(--glass-border)] flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full grid place-items-center font-medium"
                style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
              >
                FA
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[color:var(--success)] border-2 border-[color:var(--card)]" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">Faisal Ali</div>
              <div className="text-[11px] text-muted-foreground">Support agent • Online</div>
            </div>
            <button className="w-9 h-9 rounded-full grid place-items-center bg-[color:var(--input)]">
              <Phone className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            <div className="text-[11px] text-center text-muted-foreground">
              Today • Support hours 8 AM – 11 PM
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "customer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "customer" ? "rounded-br-md text-[color:var(--primary-foreground)]" : "rounded-bl-md bg-[color:var(--input)]"}`}
                  style={m.from === "customer" ? { background: "var(--gradient-gold)" } : {}}
                >
                  {m.text}
                  <div
                    className={`text-[10px] mt-1 opacity-70 ${m.from === "customer" ? "" : "text-muted-foreground"}`}
                  >
                    {m.at}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={send}
            className="p-3 border-t border-[color:var(--glass-border)] flex items-center gap-2"
          >
            <button
              type="button"
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-[color:var(--muted)]"
            >
              <Paperclip className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-[color:var(--muted)]"
            >
              <ImageIcon className="w-4 h-4 text-muted-foreground" />
            </button>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 h-11 bg-[color:var(--input)] rounded-full px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--gold)]/30"
            />
            <button
              type="button"
              className="w-9 h-9 grid place-items-center rounded-full hover:bg-[color:var(--muted)]"
            >
              <Smile className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="submit"
              className="w-11 h-11 grid place-items-center rounded-full text-[color:var(--primary-foreground)]"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </CustomerShell>
  );
}
