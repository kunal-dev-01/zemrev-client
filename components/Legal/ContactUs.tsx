// components/Contact/ContactUs.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Layouts/Input/Input";
import Spinner from "@/components/Layouts/Loaders/Spinner";
import { useState } from "react";
import { RightIconSvg } from "@/components/Svg/AuthSvg"; // <-- your icon import

// ==================== SCHEMA ====================
const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  purpose: z.string().min(1, "Select a purpose"),
  message: z.string().min(6, "Message must be at least 6 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const PURPOSE_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Support" },
  { value: "billing", label: "Billing" },
  { value: "feature", label: "Feature Request" },
];

const ContactUs = () => {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setIsSent(true);
      setLoading(false);
      reset();
    }, 1000);
  };

  return (
    <div className="w-full md:min-h-[45vw] min-h-[80vh] md:py-[2vw] rounded-2xl bg-zinc-100/10 dark:bg-zinc-900/10 backdrop-blur-lg border-2 border-zinc-100/80 dark:border-zinc-900/50 flex items-center justify-between relative">

      {/* ================= SUCCESS STATE ================ */}
      {isSent ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-16 h-16 mx-auto">
            <RightIconSvg  />
          </div>

          <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-200 mt-3">
            Message Sent Successfully!
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            We&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        /* ================= FORM ================ */
        <div className="w-full md:w-[40%] p-6 md:bg-zinc-100/50 dark:md:bg-zinc-900/50 md:rounded-2xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-[3vh] md:text-[2vw] font-semibold text-zinc-700 dark:text-zinc-300 select-none">
              Contact Us
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
              Have questions? Send us a message.
            </p>
          </div>

          {/* FORM FIELDS */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              register={register("fullName")}
              error={errors.fullName}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              register={register("email")}
              error={errors.email}
            />

            {/* PURPOSE */}
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
                Purpose
              </label>

              <select
                {...register("purpose")}
                defaultValue=""
                className={`w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent
                focus:outline-none focus:ring-1 focus:ring-light dark:focus:ring-dark transition-all duration-200
                ${
                  watch("purpose") === ""
                    ? "text-zinc-400 dark:text-zinc-500"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <option value="" disabled>
                  Select a purpose...
                </option>

                {PURPOSE_OPTIONS.map((p) => (
                  <option
                    key={p.value}
                    value={p.value}
                    className="text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900"
                  >
                    {p.label}
                  </option>
                ))}
              </select>

              {errors.purpose && (
                <span className="text-red-500 text-xs">{errors.purpose.message}</span>
              )}
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
                Message
              </label>

              <textarea
                {...register("message")}
                rows={4}
                placeholder="Write your message..."
                className="w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent resize-none
                           text-zinc-700 dark:text-zinc-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                           focus:outline-none focus:ring-1 focus:ring-light dark:focus:ring-dark transition-all duration-300"
              />

              {errors.message && (
                <span className="text-red-500 text-xs">{errors.message.message}</span>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-light hover:bg-light/80 dark:bg-dark dark:hover:bg-dark/80 text-white font-medium py-2 rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner color="text-white" size="sm" /> Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
