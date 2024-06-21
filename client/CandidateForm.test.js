import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CandidateForm from './CandidateForm';

// Mocking fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Candidate created or updated successfully' }),
  })
);

describe('CandidateForm Component', () => {
  it('renders the form with all fields', () => {
    const { getByLabelText, getByText } = render(<CandidateForm />);

    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Time Interval/i)).toBeInTheDocument();
    expect(getByLabelText(/LinkedIn/i)).toBeInTheDocument();
    expect(getByLabelText(/GitHub/i)).toBeInTheDocument();
    expect(getByLabelText(/Text/i)).toBeInTheDocument();
    expect(getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });

  it('submits the form successfully with valid data', async () => {
    const { getByLabelText, getByText } = render(<CandidateForm />);

    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/GitHub/i), { target: { value: 'https://github.com/johndoe' } });

    fireEvent.submit(getByText(/Submit/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('displays alert for mandatory fields when submitting with invalid data', async () => {
    const { getByText } = render(<CandidateForm />);

    fireEvent.submit(getByText(/Submit/i));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Email, First Name, Last Name, and GitHub are mandatory fields.'
      );
    });
  });
});
