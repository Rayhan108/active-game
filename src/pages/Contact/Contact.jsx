import React, { useState } from 'react';

const Contact = () => {
    const [email, setEmail] = useState('');

  const handleClear = () => {
    setEmail('');
  };
    return (
       <div className="min-h-screen   p-8">
  <div className='bg-gray-500 w-[40%]  p-2'>
        {/* Mail Icon */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#4A8AFF] flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p>Support Mail</p>
      </div>

      {/* Input Field with Clear Button */}
      <div className="relative max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="xxxxxxx@gmail.com"
          className="w-full px-4 py-3.5 pr-12 border-2 border-[#4A8AFF] rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4A8AFF] bg-white"
        />
        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A8AFF] hover:text-[#3A7AEF] transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Plus Button */}
      <div className="mt-6 flex justify-center max-w-md">
        <button className="w-12 h-12 rounded-full bg-[#4A8AFF] flex items-center justify-center hover:bg-[#3A7AEF] transition-colors shadow-md">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
  </div>
    </div>
    );
};

export default Contact;