import React from 'react';
import './LegalPages.css'; // Use a shared CSS file for styling

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <h1>Orange - Privacy Policy</h1>
        <p className="last-updated">Last Updated: October 25, 2025</p>
      </header>

      <div className="legal-content">
        <section>
          <h2>1. Introduction and Data Controller</h2>
          <p>Orange Food Delivery (the "Company," "we," "us") respects your privacy. This policy describes how we collect, use, and share personal data when you use our services. By using the Service, you consent to the data practices described in this policy.</p>
        </section>

        <section>
          <h2>2. Data We Collect</h2>
          <p>We collect data necessary to provide and improve the Orange service:</p>
          <ul>
            <li><strong>Identity Data:</strong> Name, phone number, email address, password. (For account management.)</li>
            <li><strong>Order Data:</strong> Order history, food preferences, vendor ratings. (For fulfilling and improving orders.)</li>
            <li><strong>Location Data:</strong> Delivery address, precise GPS coordinates. (Essential for delivery logistics.)</li>
            <li><strong>Financial Data:</strong> Last four digits of card, expiry date, billing address. (For processing payments via secure third parties.)</li>
            <li><strong>Technical Data:</strong> IP address, device ID, app usage logs. (For troubleshooting and analytics.)</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <p>We use your data to **process and deliver** orders, communicate with you, personalize your experience, and maintain platform security.</p>
        </section>

        <section>
          <h2>4. Data Sharing and Disclosure</h2>
          <p>We share data only as necessary to deliver the service:</p>
          <ul>
            <li>**Vendors (Restaurants):** Shared for order preparation and clarification.</li>
            <li>**Delivery Personnel:** Shared (Name, Phone, Location) to complete delivery.</li>
            <li>**Payment Processors:** Financial data shared securely for transaction processing.</li>
            <li>**Legal Compliance:** Disclosed when legally required by authorities.</li>
          </ul>
        </section>
        
        {/* ... continue with sections 5 and 6 ... */}

        <section className="contact-section">
          <h2>Contact Information</h2>
          <p>For questions about this policy, please contact us:</p>
          <p><strong>Email:</strong> <a href="mailto:privacy@orange.com">privacy@orange.com</a></p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;