/**
 * Calculate attendance percentage rounded to 1 decimal place.
 */
export const calculatePercentage = (attended, total) => {
  if (!total || total <= 0) return 0;
  const percentage = (attended / total) * 100;
  return Math.round(percentage * 10) / 10;
};

/**
 * Check if student is eligible based on threshold
 */
export const isEligible = (attended, total, threshold = 75) => {
  return calculatePercentage(attended, total) >= threshold;
};

/**
 * Process status change for a student cleanly and immutably
 */
export const updateStudentAttendanceStatus = (student, newStatus) => {
  const currentStatus = student.todayStatus;
  
  if (currentStatus === newStatus) {
    // If clicking same status, do nothing or keep as is
    return student;
  }

  let newAttended = student.attendedClasses;
  let newTotal = student.totalClasses;

  if (currentStatus === null || currentStatus === undefined) {
    // First time marking today
    newTotal += 1;
    if (newStatus === 'present') {
      newAttended += 1;
    }
  } else if (currentStatus === 'present' && newStatus === 'absent') {
    // Switching from present to absent
    newAttended = Math.max(0, newAttended - 1);
  } else if (currentStatus === 'absent' && newStatus === 'present') {
    // Switching from absent to present
    newAttended += 1;
  }

  // Update history array for today
  const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const updatedHistory = [...(student.history || [])];
  
  if (updatedHistory.length > 0 && updatedHistory[0].date === todayStr) {
    updatedHistory[0] = { date: todayStr, status: newStatus };
  } else {
    updatedHistory.unshift({ date: todayStr, status: newStatus });
  }

  return {
    ...student,
    attendedClasses: newAttended,
    totalClasses: newTotal,
    todayStatus: newStatus,
    history: updatedHistory
  };
};

/**
 * Reset today's marked attendance for a student
 */
export const revertTodayAttendance = (student) => {
  if (!student.todayStatus) return student;

  let newAttended = student.attendedClasses;
  let newTotal = Math.max(0, student.totalClasses - 1);

  if (student.todayStatus === 'present') {
    newAttended = Math.max(0, newAttended - 1);
  }

  const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const updatedHistory = (student.history || []).filter(h => h.date !== todayStr);

  return {
    ...student,
    attendedClasses: newAttended,
    totalClasses: newTotal,
    todayStatus: null,
    history: updatedHistory
  };
};

/**
 * Compute KPI metrics dynamically from students array
 */
export const computeAttendanceSummary = (students, threshold = 75) => {
  const totalStudents = students.length;
  if (totalStudents === 0) {
    return {
      totalStudents: 0,
      presentToday: 0,
      absentToday: 0,
      unmarkedToday: 0,
      presentPercentage: 0,
      absentPercentage: 0,
      eligibleCount: 0,
      notEligibleCount: 0,
      eligiblePercentage: 0,
      overallAttendancePercentage: 0,
    };
  }

  let presentToday = 0;
  let absentToday = 0;
  let unmarkedToday = 0;
  let eligibleCount = 0;
  let totalAttendedSum = 0;
  let totalClassesSum = 0;

  students.forEach((s) => {
    if (s.todayStatus === 'present') presentToday++;
    else if (s.todayStatus === 'absent') absentToday++;
    else unmarkedToday++;

    const pct = calculatePercentage(s.attendedClasses, s.totalClasses);
    if (pct >= threshold) eligibleCount++;

    totalAttendedSum += s.attendedClasses;
    totalClassesSum += s.totalClasses;
  });

  const markedTotal = presentToday + absentToday;
  const presentPercentage = markedTotal > 0 ? Math.round((presentToday / markedTotal) * 100) : 0;
  const absentPercentage = markedTotal > 0 ? Math.round((absentToday / markedTotal) * 100) : 0;
  const eligiblePercentage = Math.round((eligibleCount / totalStudents) * 100);

  const overallAttendancePercentage = totalClassesSum > 0 
    ? Math.round((totalAttendedSum / totalClassesSum) * 1000) / 10 
    : 0;

  return {
    totalStudents,
    presentToday,
    absentToday,
    unmarkedToday,
    presentPercentage,
    absentPercentage,
    eligibleCount,
    notEligibleCount: totalStudents - eligibleCount,
    eligiblePercentage,
    overallAttendancePercentage,
  };
};

/**
 * Calculate department-wise stats for charts and reports
 */
export const computeBranchStats = (students, threshold = 75) => {
  const branchMap = {};

  students.forEach((s) => {
    if (!branchMap[s.branch]) {
      branchMap[s.branch] = {
        branch: s.branch,
        totalStudents: 0,
        totalAttended: 0,
        totalClasses: 0,
        eligible: 0,
      };
    }

    branchMap[s.branch].totalStudents += 1;
    branchMap[s.branch].totalAttended += s.attendedClasses;
    branchMap[s.branch].totalClasses += s.totalClasses;

    if (calculatePercentage(s.attendedClasses, s.totalClasses) >= threshold) {
      branchMap[s.branch].eligible += 1;
    }
  });

  return Object.values(branchMap).map((b) => ({
    ...b,
    avgAttendance: calculatePercentage(b.totalAttended, b.totalClasses),
    eligiblePercentage: Math.round((b.eligible / b.totalStudents) * 100),
  }));
};
