"use client";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center animated-bg overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px"
                    }}
                />
            </div>

            <div className="container-custom section-padding pt-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Text Content */}
                    <div className="stagger-children text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-sm text-amber-500 font-medium">Built for Africa & Beyond</span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            One Tap.{" "}
                            <span className="text-gradient">Global Presence.</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-8">
                            A smart NFC card and app designed for ambitious professionals
                            connecting across Africa and the world.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#get-card" className="btn-primary text-base group">
                                <span>Get Your Card</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a href="#how-it-works" className="btn-secondary text-base">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>See How It Works</span>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
                            <div className="text-center lg:text-left">
                                <p className="text-3xl font-bold text-white">10K+</p>
                                <p className="text-sm text-zinc-500">Active Users</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-3xl font-bold text-white">50+</p>
                                <p className="text-sm text-zinc-500">Countries</p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-3xl font-bold text-white">1M+</p>
                                <p className="text-sm text-zinc-500">Connections Made</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Glow behind card */}
                            <div className="absolute inset-0 bg-amber-500/20 blur-3xl scale-110 rounded-full" />

                            {/* NFC Card */}
                            <div className="relative animate-float">
                                <div className="w-72 sm:w-80 md:w-96 aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shadow-2xl overflow-hidden">
                                    {/* Card content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                        {/* Logo area */}
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            {/* NFC Symbol */}
                                            <svg className="w-8 h-8 text-amber-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M6 12c0-3 2.69-6 6-6M10 12a2 2 0 104 0 2 2 0 00-4 0zM2 12c0-5.52 4.48-10 10-10" strokeLinecap="round" />
                                            </svg>
                                        </div>

                                        {/* Name area */}
                                        <div>
                                            <p className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-outfit)" }}>NearSwipe</p>
                                            <p className="text-zinc-500 text-sm">Your Digital Identity</p>
                                        </div>
                                    </div>

                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                                </div>

                                {/* Phone mockup nearby */}
                                <div className="absolute -right-8 -bottom-8 w-36 sm:w-44 bg-zinc-900 rounded-3xl border border-white/10 p-2 shadow-xl transform rotate-6">
                                    <div className="bg-zinc-800 rounded-2xl aspect-[9/16] flex flex-col items-center justify-center p-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 mb-2" />
                                        <div className="w-16 h-2 bg-zinc-700 rounded mb-1" />
                                        <div className="w-12 h-2 bg-zinc-700 rounded mb-3" />
                                        <div className="w-full h-6 bg-amber-500/20 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-zinc-500 text-xs">Scroll to explore</span>
                <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex justify-center pt-2">
                    <div className="w-1.5 h-3 bg-amber-500 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
