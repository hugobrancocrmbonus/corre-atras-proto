interface AvatarProps {
  src?: string
  alt?: string
  onClick?: () => void
}

export function Avatar({ src, alt = 'Avatar', onClick }: AvatarProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
      aria-label="Perfil do usuário"
    >
      {/* Avatar image */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--cds-border-radius-sm)',
          backgroundColor: 'var(--cds-color-background-layer-03)',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ borderRadius: 'var(--cds-border-radius-sm)' }}
          />
        ) : (
          /* Fallback: initials placeholder */
          <div
            className="absolute inset-0 flex items-center justify-center text-xs font-medium"
            style={{ color: 'var(--cds-color-icon-secondary)' }}
          >
            {alt.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Caret down */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ flexShrink: 0 }}>
        <path d="M4 6L8 10L12 6" stroke="var(--cds-color-icon-secondary, #8d9ba5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
