import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUseNavigate,
}));

describe('Login page', () => {
  it('renders', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show text in an input field when the user enters text', () => {
    render(<Login />);

    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    fireEvent.change(emailInput, { target: { value: 'jason@email.com' } });

    expect(emailInput).toHaveValue('jason@email.com');
  });

  it('should show an error if some fields are still blank when submitting the form', () => {
    render(<Login />);

    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });

    userEvent.click(loginButton);

    expect(
      screen.getByText(/all fields must be filled in/i)
    ).toBeInTheDocument();
  });

  it('should navigate to the chat page when the form is successfully submitted', async () => {
    render(<Login />);

    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: 'jason@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'abc123' } });

    const loginButton = screen.getByRole('button', {
      name: /login/i,
    });
    userEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockedUseNavigate).toBeCalledWith('/');
    });
  });

  it('should navigate to the registration page when clicking on the bottom register link', () => {
    render(<Login />);

    const registerLink = screen.getByText(/register/i);

    userEvent.click(registerLink);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toBeCalledWith('/register');
  });
});
