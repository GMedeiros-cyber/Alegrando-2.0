import React from 'react';
import JadeCTA from './JadeCTA';
import ContactSection from './ContactSection';

const ContactPage: React.FC = () => {
    return (
        <div className="pt-20">
            <JadeCTA />
            <ContactSection />
        </div>
    );
};

export default ContactPage;
