import React, { useState } from 'react';
import { FaMailBulk, FaCheckCircle, FaDotCircle } from 'react-icons/fa';

interface EmailInputProps {
  onSubmit?: (email: string) => void;
  placeholder?: string;
  buttonText?: string;
  title?: string;
  description?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  onSubmit,
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  title = "Stay Updated",
  description = "Get the latest updates delivered to your inbox"
}) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value.length > 0) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (onSubmit) {
      onSubmit(email);
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setIsValid(null);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
        <h3 className="text-xl font-bold text-black mb-2">Thank you!</h3>
        <p className="text-gray-600">
          We've successfully subscribed <strong>{email}</strong> to our newsletter.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-gray-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
          <FaMailBulk className="w-6 h-6 text-black" />
        </div>
        <h2 className="text-2xl font-bold text-black mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border-2 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-300 ${
              isValid === false 
                ? 'border-red-300 bg-red-50' 
                : isValid === true 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-300 bg-gray-50 focus:border-black'
            }`}
            disabled={isSubmitting}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          
          {/* Validation Icons */}
          {isValid !== null && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isValid ? (
                <FaCheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <FaDotCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {isValid === false && (
          <p className="text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Please enter a valid email address
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isValid && !isSubmitting
              ? 'bg-black text-white hover:bg-gray-800 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              Subscribing...
            </>
          ) : (
            <>
              {buttonText}
            </>
          )}
        </button>
      </div>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default EmailInput;
