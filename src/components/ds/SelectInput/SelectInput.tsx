export interface SelectOption {
  value: string
  label: string
}

export interface SelectInputProps {
  label?: string
  placeholder?: string
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  helper?: string
  width?: number | string
}

function CaretDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SelectInput({ label, placeholder = 'Selecionar', options, value, onChange, helper, width = 240 }: SelectInputProps) {
  const selectedLabel = options.find(o => o.value === value)?.label

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, gap: 0 }}>
      {label && (
        <div style={{ paddingBottom: 8 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              lineHeight: '16px',
              color: 'var(--cds-color-text-primary)',
            }}
          >
            {label}
          </span>
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <select
          value={value ?? ''}
          onChange={e => onChange?.(e.target.value)}
          style={{
            appearance: 'none',
            width: '100%',
            height: 48,
            padding: '0 40px 0 16px',
            backgroundColor: 'var(--cds-color-background-field)',
            border: `1px solid var(--cds-color-border-subtle)`,
            borderRadius: 4,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '20px',
            color: selectedLabel ? 'var(--cds-color-text-primary)' : 'var(--cds-color-icon-secondary)',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--cds-color-icon-secondary)',
            display: 'flex',
          }}
        >
          <CaretDownIcon />
        </span>
      </div>

      {helper && (
        <div style={{ paddingTop: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 500, lineHeight: '16px', color: '#c0c8ce' }}>
            {helper}
          </span>
        </div>
      )}
    </div>
  )
}
