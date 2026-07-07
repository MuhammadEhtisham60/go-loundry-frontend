// @ts-nocheck
import { AdminShell } from "@/components/admin-shell";
import { Section } from "@/components/ui-kit";
import { CHATS, CHAT_THREAD } from "@/lib/mock-data";
import { Send, Paperclip, CheckCheck } from "lucide-react";
import { useState } from "react";

export function AdminChats() {
  const [active, setActive] = useState(CHATS[0]);
  const [thread, setThread] = useState(CHAT_THREAD);
  const [text, setText] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setThread([...thread, { from: "agent", text, at: "now" }]);
    setText("");
  };

  return (
    <AdminShell
      title="Support chats"
      subtitle={`${CHATS.filter((c) => c.status === "open").length} open • ${CHATS.reduce((s, c) => s + c.unread, 0)} unread`}
    >
      <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-200px)]">
        <Section className="!p-3 flex flex-col">
          <div className="px-2 pb-2 text-xs uppercase tracking-widest text-muted-foreground">
            Conversations
          </div>
          <div className="flex-1 overflow-y-auto space-y-1">
            {CHATS.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`w-full text-left p-3 rounded-xl transition ${active.id === c.id ? "bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/30" : "hover:bg-[color:var(--muted)]"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full grid place-items-center text-xs font-medium relative"
                    style={{
                      background: "var(--gradient-gold)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    {c.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    {c.unread > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[color:var(--destructive)] text-[9px] grid place-items-center">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium truncate">{c.customer}</div>
                      <div className="text-[10px] text-muted-foreground">{c.updated}</div>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{c.lastMessage}</div>
                    <div className="text-[10px] gold-text mt-0.5">
                      {c.orderId} • {c.agent}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Section>

        <Section className="!p-0 flex flex-col">
          <div className="px-5 py-4 border-b border-[color:var(--glass-border)] flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full grid place-items-center text-xs font-medium"
              style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
            >
              {active.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{active.customer}</div>
              <div className="text-[11px] text-muted-foreground">
                {active.orderId} • assigned to {active.agent}
              </div>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-full border border-[color:var(--success)]/40 text-[color:var(--success)] hover:bg-[color:var(--success)]/10 flex items-center gap-1">
              <CheckCheck className="w-3 h-3" /> Mark resolved
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {thread.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "agent" ? "text-[color:var(--primary-foreground)] rounded-br-md" : "bg-[color:var(--input)] rounded-bl-md"}`}
                  style={m.from === "agent" ? { background: "var(--gradient-gold)" } : {}}
                >
                  {m.text}
                  <div className="text-[10px] mt-1 opacity-70">{m.at}</div>
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
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your reply…"
              className="flex-1 h-11 bg-[color:var(--input)] rounded-full px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--gold)]/30"
            />
            <button
              type="submit"
              className="w-11 h-11 grid place-items-center rounded-full text-[color:var(--primary-foreground)]"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </Section>
      </div>
    </AdminShell>
  );
}
