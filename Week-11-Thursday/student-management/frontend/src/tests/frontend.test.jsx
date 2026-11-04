import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import Header from '../components/Header';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import Loading from '../components/Loading';
import Dashboard from '../pages/Dashboard';
import * as studentApi from '../services/studentApi';

vi.mock('../services/studentApi');

describe('Frontend Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Header renders correctly
  test('1. Header renders title, course badge, and navigation links correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('College Student Management System')).toBeInTheDocument();
    expect(screen.getByText('Manage student records efficiently')).toBeInTheDocument();
    expect(screen.getByText('23CS102PE405')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
  });

  // 2. Student list renders student records
  test('2. Student list renders student records in table format', () => {
    const mockStudents = [
      { id: 1, name: 'Rahul Sharma', rollNo: 'CSE101', branch: 'CSE' },
      { id: 2, name: 'Priya Verma', rollNo: 'ECE201', branch: 'ECE' }
    ];

    render(
      <MemoryRouter>
        <StudentList
          students={mockStudents}
          totalCount={2}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          isFiltered={false}
          onClearFilters={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByText('Rahul Sharma').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('CSE101').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Priya Verma').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('ECE201').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('View').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Edit').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Delete').length).toBeGreaterThanOrEqual(2);
  });

  // 3. Student form displays its fields
  test('3. Student form displays all input fields and submit button', () => {
    render(
      <StudentForm
        editingStudent={null}
        onSubmit={vi.fn()}
        onCancelEdit={vi.fn()}
        isSaving={false}
      />
    );

    expect(screen.getByLabelText(/Student Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Roll Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Branch/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Student/i })).toBeInTheDocument();
  });

  // 4. Required input validation works
  test('4. Required input validation prevents submission when fields are empty', async () => {
    const mockSubmit = vi.fn();

    render(
      <StudentForm
        editingStudent={null}
        onSubmit={mockSubmit}
        onCancelEdit={vi.fn()}
        isSaving={false}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Add Student/i });
    fireEvent.click(submitBtn);

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(
      screen.getByText(/Please fill out all fields. Whitespace only is not permitted./i)
    ).toBeInTheDocument();
  });

  // 5. Loading state is displayed
  test('5. Loading component renders loading spinner and status message', () => {
    render(<Loading message="Loading student records..." />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading student records...')).toBeInTheDocument();
  });

  // 6. Error message is displayed when API loading fails
  test('6. Error message is displayed when API loading fails on Dashboard', async () => {
    studentApi.getStudents.mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Unable to load students. Please check whether the backend server is running./i)
      ).toBeInTheDocument();
    });
  });
});
