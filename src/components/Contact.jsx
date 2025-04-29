import { IonIcon } from '@ionic/react';
import { paperPlane, close, checkmarkCircle, warning } from 'ionicons/icons';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        message: ''
    });

    const [activeLanguage, setActiveLanguage] = useState('python');
    const [code, setCode] = useState({
        python: '# What\'s the best advice you\'ve ever received?\nprint("Here!")',
        cpp: '// What\'s the best advice you\'ve ever received?\n#include <iostream>\n\nint main() {\n  std::cout << "Here!";\n  return 0;\n}',
        javascript: '// What\'s the best advice you\'ve ever received?\nconsole.log("Here!");'
    });

    const [isSending, setIsSending] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        type: '', // 'success' or 'error'
        title: '',
        message: ''
    });

    const showNotification = (type, title, message) => {
        setNotification({
            show: true,
            type,
            title,
            message
        });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 4000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCodeChange = (e) => {
        setCode(prev => ({
            ...prev,
            [activeLanguage]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            await emailjs.send(
                'service_zslxqo3', // EmailJS Service ID
                'template_n7ovlli', // EmailJS Template ID
                {
                    fullname: formData.fullname,
                    email: formData.email,
                    message: formData.message,
                    language: activeLanguage,
                    code: code[activeLanguage],
                    time: new Date().toLocaleString()
                },
                'WD0ZssV-a2VSJQE3e' // EmailJS Public Key
            );

            showNotification(
                'success',
                'Message Sent!',
                'Your message has been delivered successfully'
            );

            // Reset form
            setFormData({
                fullname: '',
                email: '',
                message: ''
            });
            setCode({
                python: '# What\'s the best advice you\'ve ever received?\nprint("Here!")',
                cpp: '// What\'s the best advice you\'ve ever received?\n#include <iostream>\n\nint main() {\n  std::cout << "Here!";\n  return 0;\n}',
            });
        } catch (error) {
            console.error('Failed to send message:', error);
            showNotification(
                'error',
                'Sending Failed',
                'Please try again or contact me directly at your-email@example.com'
            );
        } finally {
            setIsSending(false);
        }
    };

    return (
        <article className="contact" data-page="contact">
            <header>
                <h2 className="h2 article-title">Contact</h2>
            </header>

            <div className="contact-content-wrapper">
                <section className="code-editor-container">
                    <h3 className="h3 form-title">Playground</h3>
                    <div className="code-editor" data-code-editor>
                        <div className="editor-header">
                            <div className="language-tabs">
                                <button
                                    className={`language-tab ${activeLanguage === 'python' ? 'active' : ''}`}
                                    onClick={() => setActiveLanguage('python')}
                                >
                                    Python
                                </button>
                                <button
                                    className={`language-tab ${activeLanguage === 'cpp' ? 'active' : ''}`}
                                    onClick={() => setActiveLanguage('cpp')}
                                >
                                    C++
                                </button>
                            </div>
                            <div className="editor-actions">
                                <span className="file-name">{activeLanguage}.txt</span>
                            </div>
                        </div>

                        <div className="code-area">
                            {notification.show && (
                                <div className={`editor-notification ${notification.type}`}>
                                    <div className="notification-icon">
                                        <IonIcon icon={notification.type === 'success' ? checkmarkCircle : warning} />
                                    </div>
                                    <div className="notification-content">
                                        <h4 className="notification-title">{notification.title}</h4>
                                        <p className="notification-message">{notification.message}</p>
                                    </div>
                                    <button
                                        className="notification-close"
                                        onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                                        aria-label="Close notification"
                                    >
                                        <IonIcon icon={close} />
                                    </button>
                                </div>
                            )}
                            <textarea
                                className="code-input"
                                value={code[activeLanguage]}
                                onChange={handleCodeChange}
                                spellCheck="false"
                            />
                        </div>
                        <div className="editor-footer">
                            <span className="language-indicator">{activeLanguage.toUpperCase()}</span>
                        </div>
                    </div>
                </section>

                <section className="contact-form">
                    <h3 className="h3 form-title">Contact Form</h3>

                    <form onSubmit={handleSubmit} className="form" data-form>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="fullname"
                                className="form-input"
                                placeholder="Full name"
                                required
                                value={formData.fullname}
                                onChange={handleChange}
                                data-form-input
                            />

                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Email address"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                data-form-input
                            />
                        </div>

                        <textarea
                            name="message"
                            className="form-input"
                            placeholder="Your Message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            data-form-input
                        ></textarea>

                        <button
                            className="form-btn"
                            type="submit"
                            disabled={!formData.fullname || !formData.email || !formData.message || isSending}
                            data-form-btn
                        >
                            <IonIcon icon={paperPlane} />
                            <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                        </button>
                    </form>
                </section>
            </div>
        </article>
    );
};

export default Contact;