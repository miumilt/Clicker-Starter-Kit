import { CheckCircle2, X } from 'lucide-react'

function SuccessModal({ open, item, canAfford, onConfirm, onClose }) {
  if (!open || !item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#1e1e1e] p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle2 size={20} className="text-[#00ff9d]" />
            <span>Confirm Purchase</span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 rounded-2xl bg-[#121212] p-4">
          <div className="text-sm text-white/70">Item</div>
          <div className="text-xl font-semibold">{item.name}</div>
          <div className="mt-2 text-xs text-white/60">Income per work</div>
          <div className="text-lg font-semibold text-[#00ff9d]">{item.income}</div>
          <div className="mt-3 text-xs text-white/60">Price</div>
          <div className="text-lg font-semibold text-white">{item.price} coins</div>
        </div>
        {!canAfford && (
          <div className="mt-3 text-sm text-red-400">Not enough coins</div>
        )}
        <div className="mt-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canAfford}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              canAfford
                ? 'bg-[#00ff9d] text-[#0b0b0b] hover:scale-105 active:scale-95'
                : 'bg-white/10 text-white/40'
            }`}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
