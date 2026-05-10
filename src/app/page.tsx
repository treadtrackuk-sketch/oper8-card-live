"use client";

import { useEffect, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Mail, MessageCircle, Phone } from "lucide-react";

const CONTACT_INFO = {
  name: "Will McDougall",
  title: "Founder",
  company: "TyreTag Ltd",
  brand: "OPER8 OS",
  tagline: "REAL WORLD • REAL PEOPLE • REAL DATA",
  intro:
    "Building real-world visibility systems across vehicle passports, garage networks, recycling compliance and connected service platforms.",
  callLink: "tel:07511630069",
  whatsappLink: "https://wa.me/447511630069",
  emailLink: "mailto:oper8os@outlook.com",
  websiteLink: "https://www.oper8os.co.uk",
  xLink: "https://x.com/oper8os",
  facebookLink: "https://www.facebook.com/profile.php?id=61589002482970",
linkedinLink: "https://www.linkedin.com/in/oper8-os-083201408/",
};

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"locking" | "verified" | "done">("locking");

  useEffect(() => {
    const timer1 = window.setTimeout(() => setPhase("verified"), 1100);
    const timer2 = window.setTimeout(() => setPhase("done"), 1900);
    const timer3 = window.setTimeout(onComplete, 2150);

    return () => {
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050506]"
    >
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="absolute left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/10 via-cyan-400/5 to-transparent"
        initial={{ top: "-8rem" }}
        animate={{ top: "100%" }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          <p className="text-xs font-light tracking-[0.4em] text-cyan-300">OPER8 OS</p>

          <AnimatePresence mode="wait">
            {phase === "locking" && (
              <motion.p
                key="locking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] tracking-[0.3em] text-white/60"
              >
                SIGNAL LOCKING...
              </motion.p>
            )}

            {phase === "verified" && (
              <motion.p
                key="verified"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-[10px] tracking-[0.3em] text-cyan-300"
              >
                IDENTITY VERIFIED
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute -inset-20 -z-10 rounded-full bg-cyan-300 opacity-20 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

function GlassButton({
  href,
  icon: Icon,
  textIcon,
  children,
  variant = "primary",
}: {
  href: string;
  icon?: ElementType;
  textIcon?: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 backdrop-blur-xl transition-all duration-300 ${
        isPrimary
          ? "h-14 bg-black/75 hover:bg-cyan-400/[0.08]"
          : "h-12 bg-black/65 hover:bg-cyan-400/[0.05]"
      }`}
      style={{
        borderColor: "rgba(34,211,238,0.88)",
        boxShadow:
          "0 0 12px rgba(34,211,238,0.25), 0 0 24px rgba(34,211,238,0.1)",
      }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
      </div>

      {Icon ? (
        <Icon
          className={`text-cyan-300 transition-colors duration-300 ${
            isPrimary ? "h-5 w-5" : "h-4 w-4"
          }`}
        />
      ) : (
        <span
          className={`min-w-5 text-center font-bold leading-none text-cyan-300 ${
            isPrimary ? "text-base" : "text-sm"
          }`}
        >
          {textIcon}
        </span>
      )}

      <span
        className={`font-medium tracking-wide text-white/90 transition-colors duration-300 group-hover:text-white ${
          isPrimary ? "text-sm" : "text-xs"
        }`}
      >
        {children}
      </span>
    </motion.a>
  );
}

export default function BusinessCard() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <main className="relative min-h-screen overflow-hidden bg-[#050506] px-4 py-8">
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            backgroundImage: `url("/images/oper8-backdrop.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/55 via-black/70 to-black/85" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isBooting ? 0 : 1, y: isBooting ? 20 : 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto max-w-[430px]"
        >
          <div
            className="relative overflow-hidden rounded-3xl border-2 p-6 backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(0,0,0,0.86)",
              borderColor: "rgba(34,211,238,0.92)",
              boxShadow:
                "0 0 22px rgba(34,211,238,0.34), 0 0 46px rgba(34,211,238,0.16), inset 0 0 24px rgba(0,0,0,0.78)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.055)_0%,transparent_50%)]" />

            <div className="relative space-y-4 text-center">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                  {CONTACT_INFO.name}
                </h1>
                <p className="mt-1 text-sm text-white/70">
                  {CONTACT_INFO.title} · {CONTACT_INFO.company}
                </p>
                <p className="mt-0.5 text-xs font-medium tracking-wider text-cyan-300">
                  {CONTACT_INFO.brand}
                </p>
              </div>

              <p className="text-[11px] font-bold tracking-[0.2em] text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.85)]">
                {CONTACT_INFO.tagline}
              </p>

              <p className="mx-auto max-w-[320px] text-sm leading-relaxed text-white/76">
                {CONTACT_INFO.intro}
              </p>
            </div>

            <div className="relative my-6 h-px overflow-hidden">
              <div className="absolute inset-0 bg-white/10" />
              <motion.div
                className="absolute h-full w-24 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                animate={{ x: ["-100%", "400%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="relative space-y-3">
              <GlassButton href={CONTACT_INFO.callLink} icon={Phone}>
                Call Me
              </GlassButton>
              <GlassButton href={CONTACT_INFO.whatsappLink} icon={MessageCircle}>
                WhatsApp
              </GlassButton>
              <GlassButton href={CONTACT_INFO.emailLink} icon={Mail}>
                Email Me
              </GlassButton>
              <GlassButton href={CONTACT_INFO.websiteLink} icon={Globe}>
                Website
              </GlassButton>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <GlassButton href={CONTACT_INFO.xLink} textIcon="𝕏" variant="secondary">
                X
              </GlassButton>
              <GlassButton href={CONTACT_INFO.facebookLink} textIcon="f" variant="secondary">
                Facebook
              </GlassButton>
              <div className="col-span-2">
                <GlassButton href={CONTACT_INFO.linkedinLink} textIcon="in" variant="secondary">
                  LinkedIn
                </GlassButton>
              </div>
            </div>
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: isBooting ? 0 : 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 space-y-3 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <img
                src="/images/oper8-sticker.png"
                alt="OPER8"
                className="h-8 w-auto drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]"
              />
              <span className="text-sm text-white/80">powered by TyreTag Ltd</span>
            </div>

            <p className="text-sm italic text-cyan-300">The future is visible.</p>

            <p className="text-xs tracking-[0.15em] text-white/80">
              VISIBILITY • TRACEABILITY • ACCOUNTABILITY
            </p>
          </motion.footer>
        </motion.div>
      </main>
    </>
  );
}
