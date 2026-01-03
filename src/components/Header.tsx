"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ContactModal from "./ContactModal";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#how-it-works", label: "How It Works" },
        { href: "#features", label: "Features" },
        { href: "#use-cases", label: "Use Cases" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-5"
                    }`}
            >
                <div className="container-custom px-4 md:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <span
                            className="text-xl font-bold tracking-tight group-hover:text-amber-500 transition-colors"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            NearSwipe
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsContactModalOpen(true)}
                            className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
                        >
                            Talk to Sales
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                        </button>
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/auth/login" className="text-sm font-medium text-white hover:text-amber-500 transition-colors">
                            Login
                        </Link>
                        <Link href="/auth/signup" className="btn-primary text-sm">
                            Get Your Card
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden absolute top-full left-0 right-0 glass overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 border-t border-white/5" : "max-h-0"
                        }`}
                >
                    <nav className="flex flex-col p-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-zinc-400 hover:text-white transition-colors py-2"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsContactModalOpen(true);
                            }}
                            className="text-zinc-400 hover:text-white transition-colors py-2 text-left"
                        >
                            Talk to Sales
                        </button>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <Link
                                href="/auth/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-2 rounded-lg bg-white/5 text-center text-white hover:bg-white/10 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/signup" // Changed to signup flow for 'Get Your Card' as it leads to onboarding
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-2 rounded-lg bg-amber-500 text-center text-black font-semibold hover:bg-amber-400 transition-colors"
                            >
                                Get Card
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </>
    );
}
