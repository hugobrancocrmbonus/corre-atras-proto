export interface TextareaProps {
  label?: string
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  minRows?: number
}

export function Textarea({ label, value, onChange, placeholder, disabled = false, minRows = 4 }: TextareaProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {label && (
        <div style={{ paddingBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: 'var(--cds-color-text-primary)' }}>
            {label}
          </span>
        </div>
      )}
      <textarea
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={minRows}
        style={{
          backgroundColor: 'var(--cds-color-background-layer-02, #22272b)',
          border: '1px solid var(--cds-color-border-subtle, #3d464d)',
          borderRadius: 4,
          padding: '8px 16px',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: '20px',
          color: 'var(--cds-color-text-primary)',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          resize: 'vertical',
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          fontFamily: 'inherit',
          minHeight: 120,
        }}
        onFocus={e => { if (!disabled) e.currentTarget.style.borderColor = '#ffbb40' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--cds-color-border-subtle, #3d464d)' }}
      />
    </div>
  )
}
