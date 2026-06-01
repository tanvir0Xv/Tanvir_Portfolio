import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import FooterAnimation from "/public/Footer-Animation.json";
import { Send } from "lucide-react";
import {
  Phone,
  Mail,
  Linkedin,
  MessageCircle,
  Github,
  Facebook,
} from "lucide-react";
import useAxiosInstance from "../Hooks/useAxiosInstance";
import toast from "react-hot-toast";

const Footer = () => {
  const axiosInstance = useAxiosInstance();
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let mounted = true;
    axiosInstance
      .get("/contact")
      .then((res) => {
        if (mounted && Array.isArray(res.data)) setLinks(res.data);
      })
      .catch((err) => console.error("Failed to load contact links:", err));
    return () => (mounted = false);
  }, [axiosInstance]);

  const iconMap = {
    Phone: Phone,
    Mail: Mail,
    Email: Mail,
    MessageCircle: MessageCircle,
    WhatsApp: MessageCircle,
    Linkedin: Linkedin,
    LinkedIn: Linkedin,
    Github: Github,
    Facebook: Facebook,
  };

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    try {
      await axiosInstance.post("/send-email", formData);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      toast.success("Message sent — thank you!");
    } catch (err) {
      console.warn("Backend send failed:", err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#0A0118] via-[#0D0220] to-[#0A0118] pt-16">
      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full p-6 md:p-10 bg-white/10 backdrop-blur-md border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Animation + Contact Info */}
            <div className="flex-1 flex flex-col items-center text-center lg:text-left">
              <div className=" md:w-96 p-4 flex items-center justify-center shadow-inner mx-auto lg:mx-0">
                <Lottie
                  animationData={FooterAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </div>

              <h3 className="mt-4 text-3xl font-bold text-fuchsia-500">
                Contact Me
              </h3>
              <p className="mt-2 text-slate-300 max-w-[320px]">
                I’m open to projects, collaborations and friendly chats. Choose
                any option below or send me a message.
              </p>

              <div className="mt-6 flex gap-3 justify-center lg:justify-start flex-wrap">
                {links.map((item) => {
                  const Icon = iconMap[item.icon] || Mail;
                  return (
                    <motion.a
                      key={item._id}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/30"
                      title={item.type || item.value}
                    >
                      <Icon size={20} className="text-white/80" />
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-6 text-white/80 flex gap-8  items-center ">
                {links.find((l) => /Phone/i.test(l.type)) && (
                  <p className="">
                    <strong>Phone:</strong>{" "}
                    <a
                      href="tel:+8801796255213"
                      className="text-fuchsia-500 hover:link"
                    >
                      {links.find((l) => /Phone/i.test(l.type)).value}
                    </a>
                  </p>
                )}
                {links.find((l) => /Email/i.test(l.type)) && (
                  <p className="">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:tanvirhasan9613@gmail.com?subject=Hello%20Tanvir&body=Hi%2C%20I%20am%20Tanvir%20Hasan.%20How%20can%20I%20assist%20you%20today%3F"
                      className="text-fuchsia-500 hover:link "
                    >
                      {links.find((l) => /Email/i.test(l.type)).value}
                    </a>
                  </p>
                )}
              </div>
            </div>

            {/* Message Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col gap-3"
            >
              <h3 className="text-4xl font-bold text-fuchsia-500">
                Send a Message
              </h3>
              <p className="text-sm text-white/70">
                I’ll reply within 24-48 hours. 💬 or 📞
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="rounded-xl p-3 border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400/50 outline-none"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone (optional)"
                  className="rounded-xl p-3 border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400/50 outline-none"
                />
              </div>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-xl p-3 border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400/50 outline-none mt-3"
              />
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full rounded-xl p-3 border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400/50 outline-none mt-3"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                rows="5"
                className="w-full rounded-xl p-3 border border-white/30 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-pink-400/50 outline-none resize-none mt-3"
              />

              <div className="flex gap-4 mt-4">
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.85 }}
                  className={`flex-1 py-3 rounded-2xl font-semibold text-white shadow-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                    sending
                      ? "bg-pink-300/70 cursor-wait"
                      : "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-500"
                  }`}
                >
                  <motion.div
                    animate={
                      sending
                        ? { rotate: [0, 10, -10, 0], y: [0, -3, 0] }
                        : { y: [0, -4, 0] }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: sending ? 0.8 : 1,
                    }}
                  >
                    <Send size={20} className="text-white" />
                  </motion.div>
                  {sending ? "Sending..." : "Send Message"}
                </motion.button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      subject: "",
                      message: "",
                    })
                  }
                  className="px-4 py-3 rounded-xl bg-white/20 text-white font-medium shadow-sm"
                >
                  Clear
                </button>
              </div>

              <p className="mt-3 text-xs text-white/50">
                By sending you agree to be friendly — no spam. Backend request
                handled automatically.
              </p>
            </motion.form>
          </div>

          <div className="mt-8 text-center text-sm text-white/50">
            Copyright © {new Date().getFullYear()} - All Rights Reserved By{" "}
            <span className="text-fuchsia-400">Tanvir Hasan</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
