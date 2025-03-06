import React from 'react';

const Contact = () => {
  const sub = (e)=>{
    e.preventDefault()
  }
  return (
    <div className="contact py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
            We'd love to hear from you! Reach out with any questions, comments, or feedback.
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-12 md:space-y-0 md:space-x-12">
          {/* Contact Form */}
          <form className="w-full md:w-2/3 bg-white p-8 shadow-lg rounded-lg" onSubmit={sub}>
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full border-b-2 border-gray-300 py-4 px-3 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full border-b-2 border-gray-300 py-4 px-3 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full resize-none border-b-2 border-gray-300 py-4 px-3 h-40 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 transition duration-300 uppercase font-semibold"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h4 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h4>
            <p className="text-gray-600 mb-4">Phone:</p>
            <span className="block text-gray-700 font-medium mb-2">+20 115 604 85 66</span>
            {/* <span className="block text-gray-700 font-medium mb-6">+00 115 29 291 219</span> */}

            <h4 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Where We Are</h4>
            <address className="text-gray-600 leading-loose">
              Awesome Address 17<br />
              New York, NYC<br />
              123-4567-890<br />
              U.S.A
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
