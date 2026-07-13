"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Send, MessageSquareCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import AnimatedHeading from "./AnimatedHeading";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);
    setError(false);

    // Get the key from env or fallback to your verified key
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "dd9cb01d-ef09-4e3c-b41f-ea90d028978b";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 6000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/5 glow-blur -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-2.5 rounded-full border border-primary/25 bg-primary/5 px-4.5 py-2 text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider font-display mb-4">
            <MessageSquareCode className="h-4 w-4" />
            <span>Connect</span>
          </div>
          <AnimatedHeading text="Get In Touch" className="mx-auto" />
          <div className="mt-3 mx-auto h-[4px] w-16 rounded bg-primary" />
        </div>

        <div className="grid gap-12 lg:grid-cols-12 max-w-7xl mx-auto">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-2xl font-bold text-foreground font-display tracking-wide uppercase">Contact Information</h3>
            <p className="text-muted-foreground text-base leading-relaxed font-sans">
              Feel free to reach out to me via email or phone. I usually respond within a few hours.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <ScrollReveal>
                <TiltCard className="frosted-glass frosted-glass-hover">
                  <CardContent className="flex items-center space-x-4.5 p-6">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 text-primary shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs uppercase font-display font-semibold tracking-wider text-muted-foreground">Email</p>
                      <a
                        href="mailto:santhosh.ananth6@gmail.com"
                        className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors break-all font-display"
                      >
                        santhosh.ananth6@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal>
                <TiltCard className="frosted-glass frosted-glass-hover">
                  <CardContent className="flex items-center space-x-4.5 p-6">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 text-primary shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs uppercase font-display font-semibold tracking-wider text-muted-foreground">Phone</p>
                      <a
                        href="tel:+918903266557"
                        className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors font-display"
                      >
                        +91 890326 6557
                      </a>
                    </div>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal>
                <TiltCard className="frosted-glass frosted-glass-hover">
                  <CardContent className="flex items-center space-x-4.5 p-6">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/15 text-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs uppercase font-display font-semibold tracking-wider text-muted-foreground">Location</p>
                      <span className="text-base sm:text-lg font-semibold text-foreground font-display uppercase tracking-wider">
                        Chennai, Tamil Nadu, India
                      </span>
                    </div>
                  </CardContent>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal className="h-full">
              <TiltCard className="frosted-glass frosted-glass-hover p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs uppercase font-display font-semibold tracking-wider text-muted-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4.5 py-3.5 text-base text-foreground placeholder-muted-foreground/40 focus:border-primary/50 focus:bg-foreground/[0.04] focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs uppercase font-display font-semibold tracking-wider text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4.5 py-3.5 text-base text-foreground placeholder-muted-foreground/40 focus:border-primary/50 focus:bg-foreground/[0.04] focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-sans"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs uppercase font-display font-semibold tracking-wider text-muted-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry / Internship Role"
                      className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4.5 py-3.5 text-base text-foreground placeholder-muted-foreground/40 focus:border-primary/50 focus:bg-foreground/[0.04] focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase font-display font-semibold tracking-wider text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Describe your request..."
                      className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4.5 py-3.5 text-base text-foreground placeholder-muted-foreground/40 focus:border-primary/50 focus:bg-foreground/[0.04] focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all font-sans resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/85 text-background font-bold tracking-widest uppercase text-sm hover:opacity-90 flex items-center justify-center gap-2 mt-4 py-6 rounded-xl border-0 transition-opacity"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>

                  {success && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs sm:text-sm text-center font-semibold mt-3 animate-fade-in font-display tracking-wider uppercase">
                      Message sent successfully! I will get back to you shortly.
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs sm:text-sm text-center font-semibold mt-3 animate-fade-in font-display tracking-wider uppercase">
                      Failed to send message. Please verify your access key.
                    </div>
                  )}
                </form>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
