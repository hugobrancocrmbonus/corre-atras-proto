import { useState, useRef, useEffect } from 'react'

export interface DateRange {
  from?: Date
  to?: Date
}

export interface DatePickerProps {
  label?: string
  value?: DateRange
  onChange?: (range: DateRange) => void
  placeholder?: string
}

const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const DAYS   = ['D','S','T','Q','Q','S','S']

function fmt(d: Date) {
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function startOfMonth(y: number, m: number) {
  return new Date(y, m, 1)
}

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate()
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function DatePicker({ label, value, onChange, placeholder = 'Selecionar período' }: DatePickerProps) {
  const today = new Date()
  const [open, setOpen] = useState(false)
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [hover, setHover] = useState<Date | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const from = value?.from
  const to   = value?.to

  const displayText = from && to
    ? `${fmt(from)} – ${fmt(to)}`
    : from
    ? `${fmt(from)} – ...`
    : ''

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function handleDayClick(d: Date) {
    if (!from || (from && to)) {
      onChange?.({ from: d, to: undefined })
    } else {
      if (d < from) {
        onChange?.({ from: d, to: from })
      } else {
        onChange?.({ from, to: d })
      }
    }
  }

  function inRange(d: Date) {
    if (!from) return false
    const end = to ?? hover
    if (!end) return false
    const lo = from < end ? from : end
    const hi = from < end ? end : from
    return d > lo && d < hi
  }

  // Build calendar grid
  const firstDay = startOfMonth(viewYear, viewMonth).getDay()
  const total    = daysInMonth(viewYear, viewMonth)
  const cells: (Date | null)[] = Array(firstDay).fill(null)
  for (let i = 1; i <= total; i++) cells.push(new Date(viewYear, viewMonth, i))
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', gap: 0 }}>
      {label && (
        <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--cds-color-text-primary)', paddingBottom: 8 }}>
          {label}
        </span>
      )}

      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 48,
          padding: '0 16px',
          backgroundColor: 'var(--cds-color-background-field)',
          border: `1px solid ${open ? '#ffbb40' : 'var(--cds-color-border-subtle)'}`,
          borderRadius: 4,
          cursor: 'pointer',
          minWidth: 220,
          outline: 'none',
          transition: 'border-color 0.15s',
        }}
      >
        <CalendarIcon />
        <span
          style={{
            flex: 1,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '20px',
            color: displayText ? 'var(--cds-color-text-primary)' : 'var(--cds-color-icon-secondary)',
            textAlign: 'left',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {displayText || placeholder}
        </span>
        <CaretIcon open={open} />
      </button>

      {/* Dropdown calendar */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 200,
            backgroundColor: 'var(--cds-color-background-layer-02)',
            border: '1px solid var(--cds-color-border-subtle)',
            borderRadius: 8,
            padding: 16,
            minWidth: 280,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <button onClick={prevMonth} style={navBtnStyle}>‹</button>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--cds-color-text-primary)' }}>
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button onClick={nextMonth} style={navBtnStyle}>›</button>
          </div>

          {/* Day-of-week headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
            {DAYS.map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 500, color: 'var(--cds-color-icon-secondary)', padding: '2px 0' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {cells.map((d, i) => {
              if (!d) return <div key={i} />
              const isFrom   = from && isSameDay(d, from)
              const isTo     = to   && isSameDay(d, to)
              const isInRange = inRange(d)
              const isToday  = isSameDay(d, today)

              return (
                <button
                  key={i}
                  onMouseEnter={() => from && !to && setHover(d)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => handleDayClick(d)}
                  style={{
                    height: 32,
                    width: '100%',
                    border: 'none',
                    borderRadius: (isFrom || isTo) ? 999 : isInRange ? 0 : 4,
                    background: (isFrom || isTo)
                      ? '#e69400'
                      : isInRange
                      ? 'rgba(230,148,0,0.15)'
                      : 'transparent',
                    color: (isFrom || isTo)
                      ? '#14171a'
                      : isToday
                      ? '#ffbb40'
                      : 'var(--cds-color-text-primary)',
                    fontSize: 13,
                    fontWeight: (isFrom || isTo) ? 600 : 400,
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'background 0.1s',
                  }}
                >
                  {d.getDate()}
                </button>
              )
            })}
          </div>

          {/* Footer actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--cds-color-border-subtle)' }}>
            <button
              onClick={() => { onChange?.({ from: undefined, to: undefined }); setOpen(false) }}
              style={{ ...footerBtnStyle, background: 'transparent', color: 'var(--cds-color-icon-secondary)', border: '1px solid var(--cds-color-border-subtle)' }}
            >
              Limpar
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{ ...footerBtnStyle, background: '#e69400', color: '#14171a', fontWeight: 600, border: 'none' }}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const navBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--cds-color-icon-secondary)',
  cursor: 'pointer',
  fontSize: 18,
  lineHeight: 1,
  padding: '0 8px',
}

const footerBtnStyle: React.CSSProperties = {
  height: 32,
  padding: '0 16px',
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color: 'var(--cds-color-icon-secondary)', flexShrink: 0 }}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 1.5v3M11 1.5v3M2 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function CaretIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
      style={{ color: 'var(--cds-color-icon-secondary)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
