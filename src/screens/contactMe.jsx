// ContactMe.js
import React, { useState } from 'react';
import '../styles/contactMe.css';

const ContactMe = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            // Replace the URL with your actual API endpoint
            const response = await fetch('https://your-api-endpoint.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Your message has been sent successfully.');
                setError('');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to send your message. Please try again.');
                setSuccessMessage('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setSuccessMessage('');
            console.error('Contact form submission failed:', err);
        }
    };

    return (
        <div className="contact-me">
            <div className="contact-me-box">
                <header className="contact-me-header">Contact Me</header>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="input-field"
                            name="name"
                            id="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="input-field"
                            name="email"
                            id="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            className="input-field"
                            name="subject"
                            id="subject"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="message">Message</label>
                        <textarea
                            className="input-field"
                            name="message"
                            id="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <div className="input-submit">
                        <button className="submit-btn" type="submit">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactMe;
