import { Briefcase, Home, ShoppingBag, Target, Users } from 'lucide-react'

const items = [
  { id: 'tasks', label: 'Tasks', icon: Target },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'home', label: 'Home', icon: Home },
  { id: 'earn', label: 'Earn', icon: Briefcase },
  { id: 'friends', label: 'Friends', icon: Users },
]

function Navigation({ activeTab, onChange }) {
  return (
    <nav className="grid grid-cols-5 gap-2 rounded-3xl bg-[#1e1e1e] p-2 shadow-[0_0_30px_rgba(0,255,157,0.12)]">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-[#00ff9d] text-[#0b0b0b] shadow-[0_0_18px_rgba(0,255,157,0.6)]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Icon size={18} />
            <span className="text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default Navigation
