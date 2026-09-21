import { calculatePercentage, isEligible } from './attendance';

export const exportToCSV = (students, threshold = 75, filename = 'attendance_report.csv') => {
  if (!students || students.length === 0) return;

  const headers = [
    'Roll Number',
    'Student Name',
    'Branch',
    'Total Classes',
    'Attended Classes',
    'Attendance %',
    "Today's Status",
    'Eligibility Status'
  ];

  const rows = students.map((s) => {
    const pct = calculatePercentage(s.attendedClasses, s.totalClasses);
    const eligible = isEligible(s.attendedClasses, s.totalClasses, threshold) ? 'Eligible' : 'Not Eligible';
    const status = s.todayStatus ? (s.todayStatus === 'present' ? 'Present' : 'Absent') : 'Not Marked';

    return [
      `"${s.rollNumber}"`,
      `"${s.name}"`,
      `"${s.branch}"`,
      s.totalClasses,
      s.attendedClasses,
      `${pct}%`,
      `"${status}"`,
      `"${eligible}"`
    ];
  });

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
