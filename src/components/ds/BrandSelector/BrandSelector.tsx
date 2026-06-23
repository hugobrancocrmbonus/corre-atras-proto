interface BrandSelectorProps {
  /** Logo da marca selecionada */
  brandLogoSrc?: string
  /** Nome da marca selecionada */
  brandName?: string
  /** Callback ao clicar em "Trocar marca" */
  onChangeBrand?: () => void
}

export function BrandSelector({ brandLogoSrc, brandName, onChangeBrand }: BrandSelectorProps) {
  const hasSelection = Boolean(brandLogoSrc && brandName)

  return (
    <div
      className="flex items-center h-[40px]"
      style={{
        backgroundColor: 'var(--cds-color-background-layer-03)',
        borderRadius: 'var(--cds-border-radius-sm)',
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      {/* Logo + nome da marca — só exibe quando há marca selecionada */}
      {hasSelection && (
        <>
          {/* Logo */}
          <div
            className="flex items-center shrink-0"
            style={{ paddingLeft: 4, paddingRight: 16, height: 32 }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: 56,
                height: '100%',
                borderRadius: 'var(--cds-border-radius-sm)',
                backgroundColor: '#ffffff',
              }}
            >
              <img
                src={brandLogoSrc}
                alt={brandName}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Nome da marca */}
          <div className="flex flex-col items-start shrink-0" style={{ paddingLeft: 8, paddingRight: 8 }}>
            <span
              className="text-[12px] leading-[16px] font-normal whitespace-nowrap"
              style={{ color: 'var(--cds-color-text-primary)' }}
            >
              {brandName}
            </span>
          </div>

          {/* Divider vertical */}
          <div
            className="shrink-0"
            style={{
              width: 1,
              height: 16,
              backgroundColor: 'var(--cds-color-border-subtle)',
              opacity: 0.5,
            }}
          />
        </>
      )}

      {/* "Trocar marca" — sempre visível */}
      <button
        onClick={onChangeBrand}
        className="flex flex-col items-start shrink-0 bg-transparent border-none cursor-pointer"
        style={{ paddingLeft: 8, paddingRight: 12 }}
      >
        <span
          className="text-[12px] leading-[16px] font-medium underline whitespace-nowrap"
          style={{ color: 'var(--cds-color-brand-text)' }}
        >
          Trocar marca
        </span>
      </button>
    </div>
  )
}
