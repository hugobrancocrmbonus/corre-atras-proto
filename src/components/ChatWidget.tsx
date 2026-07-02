import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'

/* ── types ─────────────────────────────────────────────────────────── */

interface ChatMessage {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export interface ChatWidgetProps {
  title: string
  subtitle: string
  suggestions: string[]
  getResponse: (input: string) => string
  /** full-page: centered in a flex container (ConsultorPage)
   *  inline: stacked in flow, expands as conversation grows (CampaignListPage) */
  mode?: 'full-page' | 'inline'
}

/* ── typing dots ───────────────────────────────────────────────────── */

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', backgroundColor: '#8896A0',
          display: 'inline-block',
          animation: `cwBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
        }} />
      ))}
      <style>{`@keyframes cwBounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}`}</style>
    </div>
  )
}

/* ── main component ────────────────────────────────────────────────── */

export function ChatWidget({ title, subtitle, suggestions, getResponse, mode = 'full-page' }: ChatWidgetProps) {
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const idRef = useRef(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasText = value.trim().length > 0
  const hasMessages = messages.length > 0

  useEffect(() => () => { timersRef.current.forEach(clearTimeout) }, [])

  useEffect(() => {
    if (mode === 'full-page') return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, mode])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return
    setMessages(prev => [...prev, { id: idRef.current++, text: text.trim(), sender: 'user' }])
    setValue('')
    setIsTyping(true)
    const t = setTimeout(() => {
      setMessages(prev => [...prev, { id: idRef.current++, text: getResponse(text), sender: 'bot' }])
      setIsTyping(false)
      timersRef.current = timersRef.current.filter(x => x !== t)
    }, 700 + Math.random() * 400)
    timersRef.current.push(t)
  }, [isTyping, getResponse])

  // ── inner content (shared between modes) ───────────────────────────
  const inputAndChips = (
    <div style={{ width: '100%' }}>
      {/* input card */}
      <div style={{
        borderRadius: 26,
        border: '1px solid #3D464D',
        backgroundColor: '#1D2124',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        boxShadow: '0 10px 24px -6px rgba(0,0,0,0.3)',
        transition: 'border-color 0.15s',
      }}
        onFocusCapture={e => (e.currentTarget.style.borderColor = '#FFBB40')}
        onBlurCapture={e => (e.currentTarget.style.borderColor = '#3D464D')}
      >
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(value) } }}
          placeholder={hasMessages ? 'Escreva aqui...' : 'Pergunte algo sobre o Agente IA...'}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontSize: 14, color: 'var(--cds-text-primary)', fontFamily: 'inherit', padding: '8px 12px',
          }}
        />
        <button
          onClick={() => sendMessage(value)}
          disabled={!hasText || isTyping}
          style={{
            width: 40, height: 40, borderRadius: 20, border: 'none', flexShrink: 0,
            backgroundColor: hasText && !isTyping ? '#FFBB40' : '#3D464D',
            color: hasText && !isTyping ? '#0F1416' : '#8896A0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: hasText && !isTyping ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.15s, color 0.15s',
          }}
        >
          <Send size={16} strokeWidth={2.25} />
        </button>
      </div>

      {/* chips */}
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => { sendMessage(s); inputRef.current?.focus() }}
            style={{
              borderRadius: 9999, border: '1px solid #FFBB40',
              padding: '7px 14px', fontSize: 13, fontWeight: 500,
              color: '#FFBB40', background: 'transparent', cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'background-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,187,64,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )

  // ── full-page mode (ConsultorPage) ──────────────────────────────────
  if (mode === 'full-page') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '100%', padding: '0 24px 40px',
        backgroundColor: 'var(--cds-bg-layer-01)',
      }}>
        <div style={{ width: '100%', maxWidth: 832, position: 'relative' }}>

          {/* floating bubbles above input */}
          <div style={{
            pointerEvents: 'none', position: 'absolute',
            bottom: 'calc(100% + 16px)', left: 0, right: 0,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <AnimatePresence initial={false}>
              {messages.map(m => (
                <motion.div key={m.id} layout
                  initial={{ opacity: 0, y: 20, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  style={{
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '82%', padding: '10px 14px',
                    borderRadius: m.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    backgroundColor: '#1D2124', border: '1px solid #3D464D',
                    fontSize: 14, lineHeight: 1.55, color: 'var(--cds-text-primary)',
                    wordBreak: 'break-word', pointerEvents: 'auto',
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div key="typing" layout
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  style={{
                    alignSelf: 'flex-start', padding: '10px 14px',
                    borderRadius: '14px 14px 14px 4px',
                    backgroundColor: '#1D2124', border: '1px solid #3D464D',
                  }}
                >
                  <TypingDots />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* empty state title */}
          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                style={{ textAlign: 'center', marginBottom: 32 }}
              >
                <h1 style={{
                  fontSize: 26, fontWeight: 700, color: 'var(--cds-text-primary)',
                  marginBottom: 10, lineHeight: 1.38,
                }}>
                  {title}
                </h1>
                <p style={{ fontSize: 14, color: '#8896A0', lineHeight: 1.6 }}>{subtitle}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {inputAndChips}
        </div>
      </div>
    )
  }

  // ── inline mode (CampaignListPage) ──────────────────────────────────
  return (
    <div style={{ width: '100%' }}>
      {/* messages (only shown when conversation started) */}
      <AnimatePresence>
        {hasMessages && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              padding: '0 0 24px',
              maxWidth: 832, margin: '0 auto',
            }}>
              {messages.map(m => (
                <motion.div key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  style={{
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '82%', padding: '10px 14px',
                    borderRadius: m.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                    backgroundColor: '#1D2124', border: '1px solid #3D464D',
                    fontSize: 14, lineHeight: 1.55, color: 'var(--cds-text-primary)',
                    wordBreak: 'break-word',
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
              {isTyping && (
                <div style={{
                  alignSelf: 'flex-start', padding: '10px 14px',
                  borderRadius: '14px 14px 14px 4px',
                  backgroundColor: '#1D2124', border: '1px solid #3D464D',
                }}>
                  <TypingDots />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* title + input centered in 832px column */}
      <div style={{
        maxWidth: 832, margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
        paddingTop: hasMessages ? 0 : 80, paddingBottom: 80,
      }}>
        <AnimatePresence>
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              style={{ textAlign: 'center', width: '100%' }}
            >
              <h2 style={{
                fontSize: 26, fontWeight: 700, color: 'var(--cds-text-primary)',
                marginBottom: 8, lineHeight: 1.38,
              }}>
                {title}
              </h2>
              <p style={{ fontSize: 14, color: '#8896A0', lineHeight: 1.6 }}>{subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* input constrained to 566px like in Figma */}
        <div style={{ width: 566 }}>
          {inputAndChips}
        </div>
      </div>
    </div>
  )
}
