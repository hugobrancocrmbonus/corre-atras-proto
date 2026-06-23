export interface SwitchProps {
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export function Switch({ label, checked = false, onChange }: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <div
        style={{
          width: 48,
          height: 24,
          borderRadius: 12,
          backgroundColor: checked ? '#e69400' : '#3d464d',
          position: 'relative',
          transition: 'background-color 0.2s',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: checked ? 26 : 2,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#fff',
            transition: 'left 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
          }}
        />
      </div>
      {label && (
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '20px',
            color: 'var(--cds-color-text-primary)',
          }}
        >
          {label}
        </span>
      )}
    </button>
  )
}
