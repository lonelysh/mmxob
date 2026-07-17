# Volo for Obsidian

[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-blueviolet)](https://obsidian.md/plugins)
[![Mobile](https://img.shields.io/badge/mobile-supported-green)](#ios-compatibility)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Min App Version](https://img.shields.io/badge/min--app--version-1.5.0-purple)](#)

**Volo** is a sidebar chat with LLMs inside Obsidian. It works with any OpenAI-compatible endpoint (default: MiniMax / MiniMax / MiniMax Chinese LLM family). Sidebar chat, selection AI actions, full-note processing, and a section-scoped AI outline view. **iOS compatible** — works on iPhone and iPad via Obsidian Mobile.

## Features

### Sidebar chat
Click the ribbon "message bubble" icon to open Volo in the right sidebar. Streaming SSE output, context-aware (optionally injects the active note), Cmd/Ctrl+Enter to send, stop button to abort.

### Selection actions
Select text in any markdown note and run a command from the palette or editor menu:

- Volo: 选中文本 → 翻译为英文
- Volo: 选中文本 → 翻译为中文
- Volo: 选中文本 → 总结要点
- Volo: 选中文本 → 解释这段
- Volo: 选中文本 → 润色改写
- Volo: 选中文本 → 改写更口语化
- Volo: 选中文本 → 自定义 Prompt (configure the prompt in Settings)

The selected text streams the AI response **in place** in real time — you see characters appear where the selection was.

### Whole-note commands
From the command palette, run whole-note AI operations on the active markdown file:

- Summarize the note
- Generate a structured outline
- Continue writing from where you left off
- Fix typos and tighten prose

Each command has its own title in the palette — type "Volo" to see them all.

### Quick prompts
Click the ⚡ pill in the chat header to pick a built-in one-click prompt. Quick prompts always skip web search and run against the active note or selection. You can define your own quick prompts in Settings → 自定义 Quick Prompt.

### Web search (optional)
Click the 🔍 pill in the chat header to prepend web results to the LLM prompt for the next turn. Quick prompts always skip search. Default provider: Tavily (works without an API key, 1000 free queries/month). A Brave Search option is available if you have an API key.

### Folder scope
Click the 📁 pill in the chat header to select a vault folder. Future cross-file operations will respect this scope.

### Obsidian syntax helpers
Click the **Obsidian** pill in the chat header to insert common Obsidian syntax at the caret: `[[wikilink]]`, `![[embed]]`, block references, `#tag`, `- [ ]` task, `==highlight==`, `**bold**`, `*italic*`, `` `inline code` ``, fenced code blocks, blockquotes, horizontal rules, etc.

### AI 大纲 (right-sidebar view)
Click the ribbon "list tree" icon to open AI 大纲 — a separate right-sidebar view that pairs a heading outline of the active note with a section-scoped chat. Click any heading in the outline to focus that section; ask questions that reference the section in context. Each section gets its own 📥 插入到笔记 button to splice the AI's answer back into your note at the right place.

### Insert AI output back into your note
Every assistant message in the chat has three action buttons:

- **复制** — copy the cleaned answer (thinking blocks stripped)
- **插入光标** — splice the answer at the current cursor position in the active note
- **替换笔记** — replace the entire active note's content with the answer
- **追加末尾** — append the answer to the end of the active note

In AI 大纲, each section-scoped answer has a per-section **📥 插入到笔记** button that drops the answer at the matching heading.

## Install

### Option A — Manual install
1. Download `main.js`, `styles.css`, and `manifest.json` from the latest release.
2. Place them under `<your-vault>/.obsidian/plugins/volo/`.
3. In Obsidian → Settings → Community plugins → enable **Volo**.

### Option B — BRAT (recommended for iOS testing)
1. Install the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin in Obsidian Mobile.
2. BRAT → **Add Beta plugin** → enter `lonelysh/volo`.
3. Enable **Volo** in Community plugins.

### Option C — Build from source
Clone the repo, run `npm install` then `npm run build`, and copy `main.js`, `styles.css`, and `manifest.json` to your vault's `.obsidian/plugins/volo/` folder.

## Quick start

1. Settings → Community plugins → enable **Volo**.
2. Open Volo settings, paste your API key (provider: MiniMax / MiniMax / MiniMax by default).
3. Click the ribbon "message bubble" icon to open the sidebar chat.
4. Open a note; the top bar shows the file name and current selection range.
5. Click any assistant message's action button (or the per-section 📥 插入到笔记 in AI 大纲) to splice the AI output back into your note.

## Configuration

| Field | Default | Notes |
|---|---|---|
| Base URL | `https://api.minimaxi.com/v1` | Must match the region of your API key. International: `https://api.minimax.io/v1`. Self-hosted / proxy: your own endpoint. |
| Model | `MiniMax-M3` | Long context, tool use, multimodal |
| API Key | empty | Required. Get one at [platform.minimaxi.com](https://platform.minimaxi.com). |
| Temperature | 0.7 | 0 = deterministic, 2 = creative |
| Max Tokens | 4096 | M3 supports up to 65536 |
| System Prompt | Built-in bilingual prompt | Sent on every request |
| Inject note context | On | Automatically prepends the active note to the chat history |
| Custom selection prompt | Empty | Used by **Volo: 选中文本 → 自定义 Prompt** |
| 自定义 Quick Prompt | Empty list | Define your own ⚡ quick prompts here |
| Web search provider | off | off / Tavily (no key needed) / Brave (needs API key) |
| Web search max results | 5 | Max results prepended to the prompt |
| Test API | — | Sends a 1-token request with the current configuration |

## iOS Compatibility

Volo ships with mobile-friendly defaults:

- `manifest.json` declares `isDesktopOnly: false` — visible on iOS / Android
- Touch targets ≥ 32 px, primary actions ≥ 36 px
- Padding uses `env(safe-area-inset-*)` to respect notch and home indicator
- No `position: fixed` for the main layout; no hover-only interactions
- No `backdrop-filter` on layout containers
- Network layer prefers `fetch()` + AbortController (streaming); on failure it falls back to Obsidian's `requestUrl()` (no CORS issues, non-streaming)
- All requests are HTTPS only
- The settings tab shows an extra hint when running on iOS

To debug iOS specifically, connect the device to a Mac over USB, enable iOS Settings → Safari → Advanced → **Web Inspector**, and attach from Safari's **Develop** menu.

## Troubleshooting

**"请先在设置中填入 API Key"** — You haven't filled in the API Key in Settings. Open Volo settings and paste your key.

**"联网搜索未配置"** — Web search is enabled but no provider is selected. Go to Settings → Web search provider and pick Tavily (no key needed) or Brave (needs API key).

**401 / 1004 / 2049 in a Notice** — Authentication failed. Check the API key in Settings, and verify the Base URL matches the region of your key (China vs international).

**1008 in a Notice** — Insufficient balance. Top up your account.

**429 / 1002 / 1039 / 2045 / 2056 in a Notice** — Rate limited. Wait and retry, or lower `max_tokens` in Settings.

**1026 / 1027 in a Notice** — Input or output was flagged as sensitive by the provider. Rephrase the input or adjust the system prompt.

**5xx / 1013 / 1033 in a Notice** — Server-side error. Retry after a short delay.

**iOS streaming failed (auto-fell back to non-streaming)** — A CORS or network issue blocked SSE. The plugin auto-falls back to a one-shot `requestUrl()` call so the answer still arrives. No action needed.

**Selection AI replaced my text with nothing** — Make sure the selection is non-empty before running a Volo selection command. The plugin needs text to operate on.

**Buttons in the top bar look misaligned** — Some themes force an unusual flex layout. Try a different Obsidian theme, or report the theme name in the issue tracker.

## Error Code Reference

| HTTP / Code | Meaning | Suggested Action |
|---|---|---|
| 401 / 1004 / 2049 | Authentication failed | Check API key; verify Base URL matches key region |
| 1008 | Insufficient balance | Top up your account |
| 429 / 1002 / 1039 / 2045 / 2056 | Rate limited | Wait and retry; reduce call frequency or lower `max_tokens` |
| 1026 | Input flagged as sensitive | Rephrase the input |
| 1027 | Output flagged as sensitive | Adjust the prompt or reformulate the question |
| 5xx / 1013 / 1033 | Server-side error | Retry after a short delay |
| iOS streaming failed | CORS / network | Plugin auto-falls back to non-streaming |

## License

[MIT](LICENSE)
