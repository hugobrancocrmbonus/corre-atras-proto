import { BrandSelector } from '@ds/BrandSelector/BrandSelector'
import { Avatar } from '@ds/Avatar/Avatar'

const imgCrmBonusLogo = `${import.meta.env.BASE_URL}brand/crmbonus-logo.png`

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface TopBarProps {
  theme?: 'light' | 'dark'
  /** Itens do breadcrumb — o último é tratado como página atual */
  breadcrumb?: BreadcrumbItem[]
  /** Exibe botão "Versão antiga" */
  showLegacyButton?: boolean
  /** Callback do botão "Versão antiga" */
  onLegacyClick?: () => void
  /** Marca selecionada no BrandSelector */
  brandLogoSrc?: string
  brandName?: string
  onChangeBrand?: () => void
  /** Avatar do usuário */
  avatarSrc?: string
  avatarAlt?: string
  onAvatarClick?: () => void
}

export function TopBar({
  theme = 'dark',
  breadcrumb = [
    { label: 'Página inicial' },
    { label: 'Agentes IA' },
    { label: 'Corre Atrás' },
  ],
  showLegacyButton = true,
  onLegacyClick,
  brandLogoSrc,
  brandName,
  onChangeBrand,
  avatarSrc,
  avatarAlt = 'Usuário',
  onAvatarClick,
}: TopBarProps) {
  const logoFilter = theme === 'light' ? 'invert(1)' : undefined
  return (
    <div
      className="flex items-center justify-between w-full"
      style={{
        height: 64,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: 'var(--cds-bg-layer-01)',
        borderBottom: '1px solid var(--cds-border-subtle)',
      }}
    >
      {/* ── Left: Logo + divider + Breadcrumb ─────────────────────────── */}
      <div className="flex items-center gap-8 h-[40px] shrink-0">
        {/* CRMBonus logo */}
        <div className="relative shrink-0" style={{ width: 135, height: 20 }}>
          <img
            src={imgCrmBonusLogo}
            alt="CRMBonus"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ filter: logoFilter }}
          />
        </div>

        {/* Divider */}
        <div
          className="shrink-0"
          style={{ width: 1, height: 16, backgroundColor: 'var(--cds-border-subtle)' }}
        />

        {/* Breadcrumb */}
        <nav className="flex items-center h-[40px]" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => {
            const isLast = index === breadcrumb.length - 1
            return (
              <div key={index} className="flex items-center">
                {/* Separator */}
                {index > 0 && (
                  <span
                    className="mx-1 text-[14px] font-medium leading-none"
                    style={{
                      color: 'var(--crm-fg-neutral-weak)',
                      letterSpacing: '0.28px',
                    }}
                  >
                    /
                  </span>
                )}

                {/* Item */}
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      height: 32, padding: '0 8px',
                      borderRadius: 'var(--cds-radius-sm)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 12, fontWeight: 400, lineHeight: '16px', whiteSpace: 'nowrap',
                      color: 'var(--crm-fg-neutral-strong)',
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      height: 32, padding: '0 8px',
                      borderRadius: 'var(--cds-radius-sm)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12, lineHeight: '16px', whiteSpace: 'nowrap',
                        fontWeight: 400,
                        color: 'var(--crm-fg-neutral-weak)',
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* ── Right: Ações ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Botão Versão antiga */}
        {showLegacyButton && (
          <button
            onClick={onLegacyClick}
            className="flex items-center justify-center h-[40px] px-4 bg-transparent cursor-pointer"
            style={{
              border: '1px solid var(--crm-fg-neutral-strong)',
              borderRadius: 'var(--cds-radius-sm)',
            }}
          >
            <span
              className="text-[14px] leading-[20px] font-medium whitespace-nowrap"
              style={{ color: 'var(--crm-fg-neutral-strong)' }}
            >
              Versão antiga
            </span>
          </button>
        )}

        {/* BrandSelector */}
        <BrandSelector
          brandLogoSrc={brandLogoSrc}
          brandName={brandName}
          onChangeBrand={onChangeBrand}
        />

        {/* Avatar */}
        <Avatar
          src={avatarSrc}
          alt={avatarAlt}
          onClick={onAvatarClick}
        />
      </div>
    </div>
  )
}
