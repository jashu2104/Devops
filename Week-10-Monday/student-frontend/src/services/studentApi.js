/**
 * Centralized API Service for College Student Management System
 * Assignment 10.1.1 - DEVOPS AND FULLSTACK (23CS102PE405)
 * Communicates with backend via REST API using standard fetch()
 */

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Map localhost:5000 to 127.0.0.1:5000 to avoid IPv6 conflicts on macOS with AirPlay
const API_URL = rawApiUrl.replace('://localhost:5000', '://127.0.0.1:5000');

async function handleResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error('Failed to parse server response as JSON: ' + err.message);
  }

  if (!response.ok) {
    const errorMsg = data && data.message ? data.message : `HTTP error: ${response.status} ${response.statusText}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    return await handleResponse(response);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Backend server is unreachable. Please verify it is running on port 5000.');
    }
    throw err;
  }
}

export async function getStudents() {
  try {
    const response = await fetch(`${API_URL}/students`);
    return await handleResponse(response);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to connect to the backend server. Please check whether the backend server is running.');
    }
    throw err;
  }
}

export async function getStudentById(id) {
  try {
    const response = await fetch(`${API_URL}/students/${id}`);
    return await handleResponse(response);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Backend server is unreachable. Please check whether it is running.');
    }
    throw err;
  }
}

export async function createStudent(student) {
  try {
    const response = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });
    return await handleResponse(response);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to reach backend to add student.');
    }
    throw err;
  }
}

export async function updateStudent(id, student) {
  try {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
    });
    return await handleResponse(response);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to reach backend to update student.');
    }
    throw err;
  }
}

export async function deleteStudent(id) {
  try {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse(response);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Unable to reach backend to delete student.');
    }
    throw err;
  }
}
