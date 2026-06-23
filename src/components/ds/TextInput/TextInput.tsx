export type TextInputMask = 'percent' | 'currency' | 'integer' | 'months' | 'weeks' | 'text'

export interface TextInputProps {
  label?: string
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  width?: number | string
  mask?: TextInputMask
  disabled?: boolean
}

function applyMask(raw: string, mask: TextInputMask): string {
  if (mask === 'percent') {
    const n = raw.replace(/[^\d]/g, '')
    return n ? `${n}%` : ''
  }
  if (mask === 'currency') {
    const digits = raw.replace(/[^\d]/g, '')
    if (!digits) return ''
    const cents = parseInt(digits, 10)
    const formatted = (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    return `R$ ${formatted}`
  }
  if (mask === 'integer') {
    return raw.replace(/[^\d]/g, '')
  }
  if (mask === 'months') {
    const n = raw.replace(/[^\d]/g, '')
    return n ? `${n} meses` : ''
  }
  if (mask === 'weeks') {
    const n = raw.replace(/[^\d]/g, '')
    return n ? `${n} semanas` : ''
  }
  return raw
}

export function TextInput({ label, value, onChange, placeholder, width = 140, mask = 'text', disabled = false }: TextInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!onChange) return
    const raw = e.target.value
    if (mask !== 'text') {
      const masked = applyMask(raw, mask)
      onChange(masked)
    } else {
      onChange(raw)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width }}>
      {label && (
        <div style={{ paddingBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--cds-color-text-primary)', whiteSpace: 'nowrap' }}>
            {label}
          </span>
        </div>
      )}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          height: 48,
          backgroundColor: 'var(--cds-color-background-layer-02, #22272b)',
          border: '1px solid var(--cds-color-border-subtle, #3d464d)',
          borderRadius: 4,
          padding: '0 16px',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: 'var(--cds-color-text-primary)',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          fontFamily: 'inherit',
        }}
        onFocus={e => { if (!disabled) e.currentTarget.style.borderColor = '#ffbb40' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--cds-color-border-subtle, #3d464d)' }}
      />
    </div>
  )
}
