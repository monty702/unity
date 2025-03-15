import "./DonationPage.css";
import { useState } from "react";
import { toast } from "react-toastify";

const DonationPage = () => {
  const [donationDetails, setDonationDetails] = useState({
    amount: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    paymentMethod: "card", // Track selected payment method
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Validate donation details
    if (!donationDetails.amount || !donationDetails.email) {
      alert("Please fill in all required fields.");
      return;
    }

    // Use the exact amount entered by the user (no rounding)
    const exactAmount = parseFloat(donationDetails.amount);

    // Initialize Paystack payment
    const paystackConfig = {
      key: "pk_live_240b84cd552a4ee5351890821f5f13ecdb1f6656", // Replace with your Paystack public key
      email: donationDetails.email,
      amount: exactAmount * 100, // Convert to kobo (smallest currency unit)
      currency: "KES", // Ensure the currency is set to KES
      ref: `REF-${Math.random().toString(36).substring(7)}`, // Generate a unique reference
      metadata: {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: donationDetails.name,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: donationDetails.phone,
          },
          {
            display_name: "Notes",
            variable_name: "notes",
            value: donationDetails.notes,
          },
        ],
      },
      channels: getPaymentChannels(donationDetails.paymentMethod), // Dynamically set payment channels
      callback: (response) => {
        // Handle successful payment
        toast.success(`Payment successful! Reference: ${response.reference}`);
        console.log("Payment Response:", response);
      },
      onClose: () => {
        // Handle when the payment modal is closed
        toast.warn("Payment window closed.");
      },
    };

    // Load Paystack inline script dynamically
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => {
      const handler = window.PaystackPop.setup(paystackConfig);
      handler.openIframe();
    };
    document.body.appendChild(script);
  };

  // Helper function to map payment methods to Paystack channels
  const getPaymentChannels = (paymentMethod) => {
    switch (paymentMethod) {
      case "card":
        return ["card"];
      case "mpesa":
        return ["mobile_money"];
      case "airtel":
        return ["mobile_money"];
      default:
        return ["card"]; // Default to card if no match
    }
  };

  return (
    <div className="donation-page">
      <h1>Make a Donation</h1>
      <form onSubmit={handlePayment}>
        <div>
          <label>Donation Type:</label>
          <button type="button">One-time Donation</button>
          <button type="button">Monthly Donation</button>
        </div>
        <div>
          <label>Amount (KES):</label>
          <input
            type="number"
            step="0.01" // Allow decimal values (e.g., 2.10)
            name="amount"
            placeholder="Enter amount in KES"
            value={donationDetails.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <h3>Donation Impact:</h3>
          <p>Ksh 1200/=</p>
          <p>Provides cleaning supplies for a week</p>
        </div>
        <div className="form-input">
          <h3>Donation Information:</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={donationDetails.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={donationDetails.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={donationDetails.phone}
            onChange={handleChange}
          />
          <textarea
            name="notes"
            placeholder="Additional notes..."
            value={donationDetails.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <h3>Payment Methods:</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={donationDetails.paymentMethod === "card"}
              onChange={handleChange}
            />{" "}
            Credit/Debit Cards
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="mpesa"
              checked={donationDetails.paymentMethod === "mpesa"}
              onChange={handleChange}
            />{" "}
            M-Pesa
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="airtel"
              checked={donationDetails.paymentMethod === "airtel"}
              onChange={handleChange}
            />{" "}
            Airtel Money
          </label>
        </div>
        <button type="submit">Confirm Donation</button>
      </form>
    </div>
  );
};

export default DonationPage;