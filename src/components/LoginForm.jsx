import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './LoginForm.css';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTempPassword, setIsTempPassword] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isPasswordUpdateVisible, setIsPasswordUpdateVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isRegistering) {
        if (formData.password !== formData.confirm_password) {
          toast.warn('Passwords do not match!');
          return;
        }
        response = await fetch('https://donate-api-2.onrender.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname: formData.fullname,
            email: formData.email,
            phone_number: formData.phone_number,
            password: formData.password,
            confirm_password: formData.confirm_password,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred!');
        }
        toast.success('Registration successful!');
        navigate('/home');
      } else {
        response = await fetch('https://donate-api-2.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An error occurred!');
        }
        const data = await response.json();
        toast.success('Login successful!');
        if (data.temp_password) {
          setIsTempPassword(true);
          setIsPasswordUpdateVisible(true);
        } else {
          setIsFormVisible(false);
          navigate('/home');
        }
      }
    } catch (error) {
      console.error('Authentication Error:', error);
      toast.warn(error.message || 'An unknown error occurred. Please try again!');
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await fetch('https://donate-api-2.onrender.com/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred!');
      }
      toast.success('Password reset email sent!');
    } catch (error) {
      console.error('Password Reset Error:', error);
      toast.warn(error.message || 'An unknown error occurred. Please try again!');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.warn('New passwords do not match!');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Fixed: Use backticks for template literals
        },
        body: JSON.stringify({
          old_password: formData.password,
          new_password: formData.newPassword,
          confirm_password: formData.confirmNewPassword,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred!');
      }
      toast.success('Password updated successfully!');
      setIsPasswordUpdateVisible(false);
      setIsFormVisible(false);
      navigate('/home');
    } catch (error) {
      console.error('Password Update Error:', error);
      toast.warn(error.message || 'An unknown error occurred. Please try again!');
    }
  };

  return (
    <div>
      {isFormVisible && !isTempPassword && (
        <div className="modal-background">
          <div
            className={`login-form ${isRegistering ? 'register-form' : ''}`} // Fixed: Use backticks for dynamic class names
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes className="close-icon" onClick={() => setIsFormVisible(false)} />
            <h2>{isRegistering ? 'Create Account' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <>
                  <div className="input-container">
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label>Full Name</label>
                  </div>
                  <div className="input-container">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label>Email</label>
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label>Phone Number</label>
                  </div>
                </>
              )}
              {!isRegistering && (
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label>Email or Fullname</label>
                </div>
              )}
              <div className="input-container password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Password</label>
                <span onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {isRegistering && (
                <div className="input-container password-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    required
                    placeholder=" "
                  />
                  <label>Confirm Password</label>
                  <span onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              )}
              {!isRegistering && (
                <div className="forgot-password">
                  <button type="button" onClick={handlePasswordReset}>
                    Forgot Password?
                  </button>
                </div>
              )}
              <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <p onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering
                ? 'Already have an account? Sign In'
                : "Don't have an account? Register"}
            </p>
          </div>
        </div>
      )}

      {/* Temporary Password Update Form */}
      {isTempPassword && isPasswordUpdateVisible && (
        <div className="modal-background">
          <div className="password-update-form" onClick={(e) => e.stopPropagation()}>
            <FaTimes className="close-icon" onClick={() => setIsPasswordUpdateVisible(false)} />
            <h2>Update Password</h2>
            <form onSubmit={handlePasswordUpdate}>
              <div className="input-container">
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>New Password</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Confirm New Password</label>
              </div>
              <button type="submit">Update Password</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func,
};

export default LoginForm;