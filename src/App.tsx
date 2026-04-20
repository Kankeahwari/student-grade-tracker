import { useState, useMemo, useEffect } from 'react';
import { Student, Stats } from './types';
import { StudentForm } from './components/StudentForm';
import { GradeStats } from './components/GradeStats';
import { GradeChart } from './components/GradeChart';
import { StudentList } from './components/StudentList';
import { GraduationCap, LayoutDashboard, FileText, Settings, HelpCircle, Download } from 'lucide-react';
import { motion } from 'motion/react';

const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Alice Smith', grade: 92 },
  { id: '2', name: 'Bob Johnson', grade: 78 },
  { id: '3', name: 'Charlie Brown', grade: 85 },
  { id: '4', name: 'Diana Ross', grade: 96 },
  { id: '5', name: 'Edward Norton', grade: 64 },
];

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('grade-tracker-students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  useEffect(() => {
    localStorage.setItem('grade-tracker-students', JSON.stringify(students));
  }, [students]);

  const stats = useMemo<Stats>(() => {
    if (students.length === 0) {
      return { average: 0, highest: 0, lowest: 0 };
    }
    const grades = students.map((s) => s.grade);
    return {
      average: grades.reduce((a, b) => a + b, 0) / grades.length,
      highest: Math.max(...grades),
      lowest: Math.min(...grades),
    };
  }, [students]);

  const addStudent = (name: string, grade: number) => {
    const newStudent: Student = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      grade,
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white hidden lg:flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">GradeTrack</span>
        </div>
        
        <nav className="flex-1 px-4 mt-4">
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
              <FileText className="w-5 h-5" />
              <span>Reports</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-indigo-600 rounded-2xl p-4 text-white">
            <p className="text-sm font-medium opacity-80">Pro Version</p>
            <p className="font-bold mt-1">Unlock AI Insights</p>
            <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-sm font-semibold">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overivew</h1>
            <p className="text-sm text-gray-500">Track and manage student performance with ease</p>
          </div>
          
          <div className="flex items-center space-x-4">
             <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                <HelpCircle className="w-6 h-6" />
             </button>
             <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
             </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <GradeStats stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 flex flex-col gap-8">
              <StudentForm onAdd={addStudent} />
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="bg-indigo-900 p-6 rounded-2xl text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                   <h4 className="font-bold text-lg mb-2">Academic Summary</h4>
                   <p className="text-sm text-indigo-200 mb-4">You have {students.length} students enrolled in this session.</p>
                   <div className="flex items-center space-x-2 text-2xl font-bold">
                      <span>AVG {stats.average.toFixed(1)}</span>
                   </div>
                </div>
                <GraduationCap className="absolute -right-4 -bottom-4 w-32 h-32 text-indigo-400 opacity-20 transform -rotate-12" />
              </motion.div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Performance Visualization</h3>
                  <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"/> Top</span>
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1"/> Avg</span>
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-1"/> Need help</span>
                  </div>
                </div>
                <GradeChart students={students} />
              </div>

              <StudentList students={students} onRemove={removeStudent} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
