import { Coins, Zap } from 'lucide-react'

function Header({ energy, maxEnergy, balance }) {
  const energyPercent = Math.min(100, Math.max(0, (energy / maxEnergy) * 100))

  return (
    <div className="flex items-center justify-between rounded-2xl bg-[#1e1e1e] px-4 py-3 shadow-[0_0_30px_rgba(0,255,157,0.08)]">
      <div className="flex flex-1 items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#121212] text-[#00ff9d]">
          <Zap size={22} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
            <span>Energy</span>
            <span className="font-semibold text-white/80">{energy}</span>
          </div>
          <div className="mt-2 h-2.5 w-full rounded-full bg-[#121212]">
            <div
              className="h-2.5 rounded-full bg-[#00ff9d] shadow-[0_0_12px_rgba(0,255,157,0.6)] transition-all duration-300"
              style={{ width: `${energyPercent}%` }}
            />
          </div>
        </div>
      </div>
      <div className="ml-4 flex items-center gap-3 rounded-2xl bg-[#121212] px-4 py-2">
        <Coins size={20} className="text-yellow-400" />
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Balance</div>
          <div className="text-lg font-semibold text-white">{balance}</div>
        </div>
      </div>
    </div>
  )
}

export default Header
