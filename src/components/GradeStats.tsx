import { Stats } from '../types';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface GradeStatsProps {
  stats: Stats;
}

export function GradeStats({ stats }: GradeStatsProps) {
  const statItems = [
    {
      label: 'Average Score',
      value: stats.average.toFixed(1),
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Highest Score',
      value: stats.highest.toFixed(1),
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Lowest Score',
      value: stats.lowest.toFixed(1),
      icon: AlertTriangle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4"
        >
          <div className={`${item.bg} p-3 rounded-xl`}>
            <item.icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
