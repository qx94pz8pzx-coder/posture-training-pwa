import type { TabId } from '../types';

interface BottomNavProps {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'today', label: '今日', icon: '●' },
  { id: 'actions', label: '动作', icon: '◇' },
  { id: 'habits', label: '习惯', icon: '○' },
  { id: 'checkin', label: '打卡', icon: '□' },
  { id: 'review', label: '复盘', icon: '△' },
];

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="底部导航">
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.id}
          className={activeTab === tab.id ? 'active' : ''}
          onClick={() => onChange(tab.id)}
        >
          <span aria-hidden="true">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
