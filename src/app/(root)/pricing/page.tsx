"use client";

import { useState, useRef } from "react";
import { Check, Zap, Rocket, Star, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Script from "next/script";

declare global {
  interface Window {
    FlutterwaveCheckout: (config: any) => void;
  }
}

const FAQ = [
  {
    question: "What is included in the Pro Access?",
    answer: "Pro Access gives you unlimited access to all courses, projects, and certificates. You also get priority support and exclusive discord channels."
  },
  {
    question: "Can I cancel my subscription any time?",
    answer: "Yes, you can cancel your subscription at any time from your account settings. You will still have access until the end of your billing period."
  },
  {
    question: "Do you offer student discounts?",
    answer: "We are currently working on a student verification program. Join our newsletter to be notified when it launches!"
  }
];

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const containerRef = useRef<HTMLDivElement>(null);

  const amountNGN = billingCycle === "monthly" ? 4000 : 28800;
  const priceNGN = amountNGN.toLocaleString();
  const priceUSD = billingCycle === "monthly" ? "5" : "36";

  const handlePayment = () => {
    if (!session) {
      toast.error("Please sign in to upgrade to Pro");
      router.push("/sign-in");
      return;
    }

    const config = {
      public_key: "FLWPUBK_TEST-XXXXXXXXX-X", // Replace with your actual public key
      tx_ref: `ctech-${Date.now()}`,
      amount: amountNGN,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: session.user.email,
        name: session.user.name,
      },
      customizations: {
        title: "C-Tech Learn Pro",
        description: `Subscription for ${billingCycle} access`,
        logo: "https://your-logo-url.com/logo.png",
      },
      callback: (data: any) => {
        console.log("Payment successful", data);
        toast.success("Payment successful! Welcome to Pro.");
        // Here you would typically call your backend to verify and update the user's status
      },
      onclose: () => {
        console.log("Payment modal closed");
      },
    };

    if (window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout(config);
    } else {
      toast.error("Payment system is still loading. Please try again in a moment.");
    }
  };

  useGSAP(() => {
    gsap.from(".pricing-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
    gsap.from(".plan-card", {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".plan-card",
        start: "top 85%"
      }
    });
  }, { scope: containerRef });

  return (
    <MaxWidthWrapper>
      <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/30 py-24 overflow-hidden relative">
        {/* Background Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

        <div className="w-full">
          {/* Header */}
          <div className="pricing-header text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary py-1 px-4 text-sm font-medium">
              Pricing Plans
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
              Invest in Your Career Today
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Get unlimited access to industry-standard tech courses and accelerate your growth with C-Tech Learn Pro.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={cn("text-sm font-medium transition-colors", billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground")}>
                  Monthly
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="relative w-14 h-7 bg-muted rounded-full p-0 transition-colors hover:bg-muted/80 ring-1 ring-border border-none group flex items-center justify-start overflow-hidden"
              >
                  <div className="flex items-center w-full px-1">
                    <motion.div
                      animate={{ x: billingCycle === "monthly" ? 0 : 28 }}
                      className="w-5 h-5 bg-primary rounded-full shadow-lg"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
              </Button>
              <div className="flex items-center gap-2">
                  <span className={cn("text-sm font-medium transition-colors", billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground")}>
                      Yearly
                  </span>
                  <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-wider">
                      Save 40%
                  </span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto items-stretch">
            
            {/* Free Tier */}
            <div className="plan-card flex flex-col p-8 rounded-3xl border bg-card/50 backdrop-blur-xl hover:border-border/80 transition-all duration-300">
              <div className="mb-8">
                <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mb-6 text-muted-foreground">
                  <Rocket className="size-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Free Starter</h3>
                <p className="text-muted-foreground text-sm">Everything you need to get started with tech education.</p>
              </div>
              
              <div className="mb-8">
                  <div className="text-4xl font-bold">₦0</div>
                  <div className="text-muted-foreground text-sm mt-1">Free forever</div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {["Access to Free Courses", "Limited Community Support", "Basic Dashboard", "1 Project Slot"].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="size-4 mt-0.5 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full py-6 rounded-xl border-border/50 hover:bg-muted font-semibold transition-all">
                  Active Plan
              </Button>
            </div>

            {/* Pro Access */}
            <div className="plan-card relative flex flex-col p-8 rounded-3xl border-2 border-primary bg-background shadow-[0_0_50px_-12px_rgba(var(--primary-rgb),0.3)] z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                      Best Value
                  </Badge>
              </div>

              <div className="mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <Zap className="size-6 fill-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro Scholar</h3>
                <p className="text-muted-foreground text-sm">Become a master with unlimited access and expert mentorship.</p>
              </div>
              
              <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">₦{priceNGN}</span>
                      <span className="text-muted-foreground text-sm">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                  </div>
                  <div className="text-primary text-xs font-medium mt-2 flex items-center gap-1.5">
                      <Star className="size-3 fill-primary" />
                      Approx. ${priceUSD} USD
                  </div>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Unlimited Access to All Courses",
                  "Certificates of Completion",
                  "Premium Support Ticketing",
                  "Private Discord Community",
                  "Downloadable Asset Kits",
                  "Early Access to New Topics"
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground/90 font-medium">
                    <Check className="size-4 mt-0.5 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                onClick={handlePayment}
                className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                  Upgrade to Pro
              </Button>
              <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-tighter">Secure Payment via Flutterwave</p>
            </div>
          </div>

          {/* Features Comparison Grid (Simplified) */}
          <div className="mb-32">
              <h2 className="text-3xl font-bold text-center mb-16 underline decoration-primary/30 underline-offset-8 italic">Why Upgrade?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {[
                      { icon: ShieldCheck, title: "Verified Certificates", desc: "Gain industry edge with our cryptographically signed certificates of excellence." },
                      { icon: Star, title: "Premium Assets", desc: "Download high-quality source code, design files, and deployment scripts for every course." },
                      { icon: HelpCircle, title: "1-on-1 Support", desc: "Stuck on a bug? Our mentors are ready to help you push through complex coding challenges." }
                  ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 items-start group">
                          <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                              <item.icon className="size-6" />
                          </div>
                          <div>
                              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mb-24">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-6">
                  {FAQ.map((faq, i) => (
                      <div key={i} className="p-6 rounded-2xl border bg-card/30 hover:bg-card/50 transition-colors">
                          <h4 className="font-bold mb-2 flex items-center gap-2">
                               <HelpCircle className="size-4 text-primary" />
                               {faq.question}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                  ))}
              </div>
          </div>

        </div>
      </div>
      <Script 
        src="https://checkout.flutterwave.com/v3.js" 
        strategy="lazyOnload"
      />
    </MaxWidthWrapper>
  );
}
