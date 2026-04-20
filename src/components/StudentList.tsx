import { Student } from '../types';
import { Trash2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudentListProps {
  students: Student[];
  onRemove: (id: string) => void;
}

export function StudentList({ students, onRemove }: StudentListProps) {
  if (students.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-500">
        <User className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-lg font-medium">No students added yet</p>
        <p className="text-sm">Add students above to start tracking grades</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-bottom border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence mode="popLayout">
              {students.map((student) => (
                <motion.tr
                  key={student.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-gray-900">{student.grade}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                       <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              student.grade >= 90 ? 'bg-emerald-500' :
                              student.grade >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${student.grade}%` }}
                          />
                       </div>
                       <span className={`text-xs font-bold ${
                          student.grade >= 90 ? 'text-emerald-600' :
                          student.grade >= 70 ? 'text-amber-600' : 'text-rose-600'
                       }`}>
                          {student.grade >= 90 ? 'EXCELLENT' :
                           student.grade >= 70 ? 'PASSED' : 'RETAKE'}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onRemove(student.id)}
                      className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-lg opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
