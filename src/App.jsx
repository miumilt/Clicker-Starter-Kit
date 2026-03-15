import { useEffect, useMemo, useState } from 'react'
import { CircleHelp, Crown, Sparkles, Trophy } from 'lucide-react'
import Header from './components/Header.jsx'
import JobCard from './components/JobCard.jsx'
import Navigation from './components/Navigation.jsx'
import SuccessModal from './components/SuccessModal.jsx'

const STORAGE_KEY = 'businessman_simulator_state'

const JOBS = [
  { id: 'courier', name: 'Courier', income: 12, energyCost: 20, price: 0 },
  { id: 'waiter', name: 'Waiter', income: 24, energyCost: 20, price: 180 },
  { id: 'manager', name: 'Manager', income: 55, energyCost: 20, price: 650 },
  { id: 'director', name: 'Director', income: 120, energyCost: 20, price: 2100 },
]

const TASKS = [
  { id: 1, title: 'Subscribe to the Telegram channel', reward: '+50 coins' },
  { id: 2, title: 'Invite 5 friends', reward: '+150 coins' },
]

const initialState = {
  balance: 0,
  energy: 100,
  currentJobId: 'courier',
  inventory: ['courier'],
  totalEarned: 0,
  regDate: new Date().toISOString(),
  referrals: 0,
}

const getStoredState = () => {
  if (typeof window === 'undefined') return initialState
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return initialState
  try {
    const parsed = JSON.parse(saved)
    return { ...initialState, ...parsed }
  } catch {
    return initialState
  }
}

function HelpTip({ text }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#121212] text-white/70"
      >
        <CircleHelp size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-10 w-44 rounded-xl border border-white/10 bg-[#1e1e1e] p-3 text-xs text-white/80 shadow-[0_0_24px_rgba(0,0,0,0.6)]">
          {text}
        </div>
      )}
    </div>
  )
}

function App() {
  const storedState = useMemo(() => getStoredState(), [])
  const [activeTab, setActiveTab] = useState('home')
  const [balance, setBalance] = useState(storedState.balance)
  const [energy, setEnergy] = useState(storedState.energy)
  const [currentJobId, setCurrentJobId] = useState(storedState.currentJobId)
  const [inventory, setInventory] = useState(storedState.inventory)
  const [totalEarned, setTotalEarned] = useState(storedState.totalEarned)
  const [regDate] = useState(storedState.regDate)
  const [referrals] = useState(storedState.referrals)
  const [selectedCategory, setSelectedCategory] = useState('Jobs')
  const [modalItem, setModalItem] = useState(null)
  const [cooldown, setCooldown] = useState(false)

  const currentJob = useMemo(
    () => JOBS.find((job) => job.id === currentJobId) || JOBS[0],
    [currentJobId]
  )

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        balance,
        energy,
        currentJobId,
        inventory,
        totalEarned,
        regDate,
        referrals,
      })
    )
  }, [balance, energy, currentJobId, inventory, totalEarned, regDate, referrals])

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => (prev < 100 ? prev + 1 : prev))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleWork = () => {
    if (cooldown) return
    if (energy < currentJob.energyCost) return
    setEnergy((prev) => Math.max(0, prev - currentJob.energyCost))
    setBalance((prev) => prev + currentJob.income)
    setTotalEarned((prev) => prev + currentJob.income)
    setCooldown(true)
    setTimeout(() => setCooldown(false), 700)
  }

  const handlePurchase = (job) => {
    setModalItem(job)
  }

  const confirmPurchase = () => {
    if (!modalItem) return
    if (balance < modalItem.price) return
    if (!inventory.includes(modalItem.id)) {
      setInventory((prev) => [...prev, modalItem.id])
    }
    setBalance((prev) => prev - modalItem.price)
    setCurrentJobId(modalItem.id)
    setModalItem(null)
  }

  const handleSelect = (job) => {
    setCurrentJobId(job.id)
  }

  const renderHome = () => (
    <div className="flex flex-1 flex-col gap-6">
      <Header energy={energy} maxEnergy={100} balance={balance} />
      <div className="rounded-3xl bg-[#1e1e1e] p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
              Current Role
            </div>
            <div className="mt-2 text-2xl font-semibold text-white">
              {currentJob.name}
            </div>
            <div className="mt-1 text-sm text-white/60">
              Income per work: {currentJob.income}
            </div>
          </div>
          <HelpTip text="Your income is based on the selected role. Upgrade in the shop." />
        </div>
        <div className="mt-5 flex items-center justify-center rounded-3xl bg-gradient-to-br from-[#00ff9d]/20 via-[#1e1e1e] to-[#121212] px-6 py-8 text-center">
          <div>
            <div className="text-sm uppercase tracking-[0.4em] text-white/40">
              Character
            </div>
            <div className="mt-3 text-2xl font-semibold text-white/90">
              Businessman Elite
            </div>
            <div className="mt-2 text-xs text-white/60">
              Premium illustration placeholder
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-[#1e1e1e] p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
              Action
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              Work to earn coins
            </div>
          </div>
          <HelpTip text="Work consumes energy. Energy regenerates every 3 seconds." />
        </div>
        <button
          onClick={handleWork}
          disabled={energy < currentJob.energyCost || cooldown}
          className={`relative mt-5 w-full overflow-hidden rounded-3xl px-6 py-6 text-2xl font-semibold uppercase tracking-[0.3em] transition-all ${
            energy < currentJob.energyCost || cooldown
              ? 'bg-white/10 text-white/40'
              : 'bg-[#00ff9d] text-[#0b0b0b] shadow-[0_0_30px_rgba(0,255,157,0.6)] hover:scale-[1.02] active:scale-95'
          }`}
        >
          {cooldown && (
            <span className="cooldown-sheen absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          )}
          Work
        </button>
        <div className="mt-3 text-xs uppercase tracking-[0.4em] text-white/40">
          Energy cost {currentJob.energyCost}
        </div>
      </div>
    </div>
  )

  const renderShop = () => (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Shop</div>
          <div className="mt-1 text-xl font-semibold text-white">
            Upgrade your career
          </div>
        </div>
        <HelpTip text="New categories unlock special boosts and accessories." />
      </div>
      <div className="grid grid-cols-3 gap-3 rounded-3xl bg-[#1e1e1e] p-2">
        {['Jobs', 'Boosts', 'Accessories'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
              selectedCategory === category
                ? 'bg-[#00ff9d] text-[#0b0b0b]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory !== 'Jobs' ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-white/5 bg-[#1e1e1e] p-6 text-center text-white/60">
          <Sparkles size={28} className="text-[#00ff9d]" />
          <div className="mt-3 text-lg font-semibold text-white">
            New items incoming
          </div>
          <div className="mt-2 text-sm text-white/50">
            Stay tuned for premium boosts and accessories.
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {JOBS.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              owned={inventory.includes(job.id)}
              selected={currentJobId === job.id}
              onBuy={() => handlePurchase(job)}
              onSelect={() => handleSelect(job)}
            />
          ))}
        </div>
      )}
    </div>
  )

  const renderTasks = () => (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/50">Profile</div>
          <div className="mt-1 text-xl font-semibold text-white">
            Business dashboard
          </div>
        </div>
        <HelpTip text="Complete tasks to earn extra bonuses." />
      </div>
      <div className="grid gap-3 rounded-3xl bg-[#1e1e1e] p-4">
        <div className="flex items-center justify-between rounded-2xl bg-[#121212] px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Trophy size={16} className="text-[#00ff9d]" />
            Total earned
          </div>
          <div className="text-lg font-semibold text-white">{totalEarned}</div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[#121212] px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Crown size={16} className="text-[#00ff9d]" />
            Registration date
          </div>
          <div className="text-sm text-white/80">
            {new Date(regDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[#121212] px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Sparkles size={16} className="text-[#00ff9d]" />
            Referrals
          </div>
          <div className="text-lg font-semibold text-white">{referrals}</div>
        </div>
      </div>
      <div className="rounded-3xl bg-[#1e1e1e] p-5">
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">Tasks</div>
        <div className="mt-4 grid gap-3">
          {TASKS.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#121212] px-4 py-3"
            >
              <div>
                <div className="text-sm text-white">{task.title}</div>
                <div className="text-xs text-white/50">{task.reward}</div>
              </div>
              <button className="rounded-full bg-[#00ff9d] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0b0b0b]">
                Start
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderEarn = () => (
    <div className="flex flex-1 flex-col gap-4">
      <div className="rounded-3xl bg-[#1e1e1e] p-5">
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">Earn</div>
        <div className="mt-2 text-xl font-semibold text-white">Boost your income</div>
        <div className="mt-4 grid gap-3">
          <div className="rounded-2xl bg-[#121212] p-4 text-sm text-white/70">
            Complete daily work sessions to stack bonuses.
          </div>
          <div className="rounded-2xl bg-[#121212] p-4 text-sm text-white/70">
            Check the shop for premium upgrades.
          </div>
        </div>
      </div>
    </div>
  )

  const renderFriends = () => (
    <div className="flex flex-1 flex-col gap-4">
      <div className="rounded-3xl bg-[#1e1e1e] p-5">
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">Friends</div>
        <div className="mt-2 text-xl font-semibold text-white">Referral program</div>
        <div className="mt-4 rounded-2xl bg-[#121212] p-4 text-sm text-white/70">
          Invite friends to earn bonuses and unlock exclusive roles.
        </div>
      </div>
    </div>
  )

  const canAfford = modalItem ? balance >= modalItem.price : false

  const content = {
    home: renderHome(),
    shop: renderShop(),
    tasks: renderTasks(),
    earn: renderEarn(),
    friends: renderFriends(),
  }[activeTab]

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#121212] px-4 py-5">
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        <div className="flex h-full flex-col gap-4">{content}</div>
      </div>
      <div className="pt-4">
        <Navigation activeTab={activeTab} onChange={setActiveTab} />
      </div>
      <SuccessModal
        open={Boolean(modalItem)}
        item={modalItem}
        canAfford={canAfford}
        onConfirm={confirmPurchase}
        onClose={() => setModalItem(null)}
      />
    </div>
  )
}

export default App
