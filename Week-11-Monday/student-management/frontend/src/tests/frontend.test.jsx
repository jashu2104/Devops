import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import Header from '../components/Header';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import Loading from '../components/Loading';
import Dashboard from '../pages/Dashboard';
import * as studentApi from '../services/studentApi';

// Mock the API module
vi.mock('../services/studentApi');

describe('Frontend React Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Header renders correctly
  it('1. Header renders correctly with title, subtitle, and navigation', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('College Student Management System')).toBeInTheDocument();
    expect(screen.getByText('Manage student records efficiently')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
  });

  // 2. Student list renders student records
  it('2. Student list renders student records in table format', () => {
    const mockStudents = [
      { id: 1, name: 'Rahul', rollNo: 'CSE101', branch: 'CSE' },
      { id: 2, name: 'Priya', rollNo: 'ECE201', branch: 'ECE' }
    ];

    render(
      <BrowserRouter>
        <StudentList
          students={mockStudents}
          totalCount={2}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          isFiltered={false}
          onClearFilters={vi.fn()}
        />
      </BrowserRouter>
    );

    const rahulElements = screen.getAllByText('Rahul');
    expect(rahulElements.length).toBeGreaterThan(0);

    const rollElements = screen.getAllByText('CSE101');
    expect(rollElements.length).toBeGreaterThan(0);

    const priyaElements = screen.getAllByText('Priya');
    expect(priyaElements.length).toBeGreaterThan(0);
  });

  // 3. Student form displays its fields
  it('3. Student form displays all required input fields and buttons', () => {
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
  it('4. Required input validation works when fields are empty or whitespace', async () => {
    const handleSubmit = vi.fn();
    render(
      <StudentForm
        editingStudent={null}
        onSubmit={handleSubmit}
        onCancelEdit={vi.fn()}
        isSaving={false}
      />
    );

    const submitButton = screen.getByRole('button', { name: /Add Student/i });
    fireEvent.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/Please fill out all fields/i)).toBeInTheDocument();
  });

  // 5. Loading state is displayed
  it('5. Loading state is displayed with appropriate message', () => {
    render(<Loading message="Loading student records from server..." />);
    expect(screen.getByText('Loading student records from server...')).toBeInTheDocument();
  });

  // 6. Error message is displayed when API loading fails
  it('6. Error message is displayed when API loading fails', async () => {
    studentApi.getStudents.mockRejectedValue(new Error('Backend offline'));

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
