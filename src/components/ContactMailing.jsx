import { useState } from "react";
import emailjs from "@emailjs/browser";

function ContactMailing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const templateParams = {
        to_email: "contact@bloomfortomorrow.org",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      // await emailjs.send(
      //   "service_1nyccwk", // Replace with your EmailJS service ID
      //   "template_s58k1nn", // Replace with your EmailJS template ID
      //   templateParams,
      //   "zJDH93ylq-x8L6JgV" // Replace with your EmailJS public key
      // );
      await emailjs.send(
        "service_1nyccwk", // Replace with your EmailJS service ID
        "template_uqkgzqa", // Replace with your EmailJS template ID
        templateParams,
        "zJDH93ylq-x8L6JgV" // Replace with your EmailJS public key
      );

      setStatus({ loading: false, error: null, success: true });
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      console.log(error);
      setStatus({
        loading: false,
        error: "Failed to send message. Please try again.",
        success: false,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full px-4 py-2 rounded-lg bg-background/10 border border-background/20 focus:outline-none focus:border-primary"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full px-4 py-2 rounded-lg bg-background/10 border border-background/20 focus:outline-none focus:border-primary"
        />
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-background/10 border border-background/20 focus:outline-none focus:border-primary"
        >
          <option value="">Select Subject</option>
          <option value="Partnership">Partnership</option>
          <option value="Volunteering">Volunteering</option>
          <option value="Donation Support">Donation Support</option>
        </select>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows="4"
          className="w-full px-4 py-2 rounded-lg bg-background/10 border border-background/20 focus:outline-none focus:border-primary"
        ></textarea>

        <div className="relative ">
          <button
            type="submit"
            disabled={status.loading}
            className={`bg-primary text-background px-6 py-2 rounded-full hover:bg-[#388E3C] transition-colors ${
              status.loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {status.loading ? "Sending..." : "Send Message"}
          </button>

          {/* Success message */}
          {status.success && (
            <div className="absolute top-0 left-0 ">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-full text-center">
                Message sent successfully!
              </div>
            </div>
          )}

          {/* Error message */}
          {status.error && (
            <div className="absolute top-0 left-0 ">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-full text-center">
                {status.error}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContactMailing;
