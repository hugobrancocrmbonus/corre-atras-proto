import { AgentCard, type AgentCardProps } from '@ds/AgentCard/AgentCard'

const AGENTS: AgentCardProps[] = [
  {
    label: 'Agente de reativação',
    title: 'Corre Atrás',
    description: 'Seleciona e reativa clientes inativos com alto potencial de retorno',
  },
]

interface AgentsPageProps {
  onSelectAgent?: (title: string) => void
}

export function AgentsPage({ onSelectAgent }: AgentsPageProps) {
  return (
    <div className="flex flex-col w-full">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div
        className="flex flex-col items-start"
        style={{ padding: '40px 32px 16px 32px' }}
      >
        <h1
          className="text-[28px] font-bold leading-[1.3] tracking-[0.56px]"
          style={{ color: 'var(--cds-color-text-primary)', margin: 0 }}
        >
          Agentes IA
        </h1>
        <p
          className="text-[14px] font-normal leading-[1.8] tracking-[0.28px]"
          style={{ color: '#c0c8ce', margin: 0 }}
        >
          Descrição do Agente
        </p>
      </div>

      {/* ── Cards ───────────────────────────────────────────────────── */}
      <div
        className="flex flex-wrap gap-4"
        style={{ padding: '0 32px 16px 32px' }}
      >
        {AGENTS.map(agent => (
          <AgentCard
            key={agent.title}
            {...agent}
            onClick={() => onSelectAgent?.(agent.title)}
          />
        ))}
      </div>
    </div>
  )
}
