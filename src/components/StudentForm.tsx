import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface StudentFormProps {
  onAdd: (name: string, grade: number) => void;
}

export function StudentForm({ onAdd }: StudentFormProps) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || isNaN(Number(grade))) return;
    
    onAdd(name, Math.min(100, Math.max(0, Number(grade))));
    setName('');
    setGrade('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Student</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Student Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.join Doe"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="w-full md:w-32">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade (0-100)
          </label>
          <input
            id="grade"
            type="number"
            required
            min="0"
            max="100"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="95"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </form>
  );
}
