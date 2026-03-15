import { Briefcase, Zap } from 'lucide-react'

function JobCard({ job, owned, selected, onBuy, onSelect }) {
  const buttonLabel = owned ? (selected ? 'Selected' : 'Select') : 'Buy'
  const buttonAction = owned ? onSelect : onBuy

  return (
    <div className="rounded-3xl border border-white/5 bg-[#1a1a1a] p-4 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Briefcase size={18} className="text-[#00ff9d]" />
            <span>{job.name}</span>
          </div>
          <div className="mt-2 text-xs text-white/60">Income per work</div>
          <div className="text-xl font-semibold text-[#00ff9d]">{job.income}</div>
        </div>
        <div className="rounded-2xl bg-[#121212] px-3 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
          {job.price} coins
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-white/60">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-yellow-400" />
          <span>Energy cost {job.energyCost}</span>
        </div>
        <button
          onClick={buttonAction}
          disabled={selected}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-all ${
            selected
              ? 'bg-white/10 text-white/50'
              : 'bg-[#00ff9d] text-[#0b0b0b] hover:scale-105 active:scale-95'
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default JobCard
