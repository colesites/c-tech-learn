"use client";

import React, { Suspense } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaXTwitter,
  FaInstagram,
  FaWhatsapp,
  FaDiscord,
  FaSlack,
} from "react-icons/fa6";
import Logo from "@/components/Logo";
import { Spinner } from "@/components/ui/spinner";

const CopyrightYear = () => {
  return <p>© {new Date().getFullYear()} C Tech Learn. All rights reserved.</p>;
};

const Footer = () => {
  const socialLinks = [
    { icon: <FaXTwitter size={20} />, href: "#", label: "X" },
    { icon: <FaInstagram size={20} />, href: "#", label: "Instagram" },
    { icon: <FaWhatsapp size={20} />, href: "#", label: "WhatsApp" },
    { icon: <FaDiscord size={20} />, href: "#", label: "Discord" },
    { icon: <FaSlack size={20} />, href: "#", label: "Slack" },
  ];

  const productLinks = [
    { label: "Courses", href: "#courses" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Community", href: "#community" },
  ];

  const companyLinks = [
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
    { label: "Terms", href: "/terms-of-service" },
    { label: "Privacy", href: "/privacy" },
  ];

  const resourceLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Learning Path", href: "/learning-paths" },
    { label: "Quiz", href: "/quiz" },
  ];

  return (
    <footer className="bg-background border-t border-border/50 pt-16 pb-8">
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-muted-foreground text-base max-w-xs leading-relaxed">
              Empowering the next generation of tech leaders with world-class
              education and community support.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product Column */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">Product</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border/50 pt-12 pb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2 max-w-md">
              <h3 className="text-2xl font-semibold text-foreground">
                Join our newsletter
              </h3>
              <p className="text-muted-foreground text-sm">
                Get exclusive news, features, and updates delivered to your
                inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md items-center gap-2">
              <Input
                type="email"
                name="email"
                id="newsletter-email"
                autoComplete="email"
                placeholder="Enter your email"
                className="bg-secondary/30 border-border/50 focus:border-primary/50 transition-all h-11"
              />
              <Button className="h-11 px-6 font-medium">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <Suspense
            fallback={<Spinner className="size-4 text-muted-foreground" />}
          >
            <CopyrightYear />
          </Suspense>
          <div className="flex gap-6">
            <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
