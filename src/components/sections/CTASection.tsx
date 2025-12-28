"use client";

export default function CTASection() {
    return (
        <section id="get-card" className="relative section-padding overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#080808]" />

            {/* Glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-2xl" />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main content */}
                    <div className="mb-10">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-sm text-amber-500 font-medium">Ready to level up?</span>
                        </span>

                        <h2
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            Upgrade the Way <br className="hidden sm:block" />
                            <span className="text-gradient">You Connect</span>
                        </h2>

                        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                            Join thousands of professionals building meaningful connections worldwide.
                            Your next opportunity is just one tap away.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                        <a
                            href="#"
                            className="btn-primary text-lg px-8 py-4 glow-accent group"
                        >
                            <span>Get Your NFC Card</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="btn-secondary text-lg px-8 py-4"
                        >
                            <span>Talk to Sales</span>
                        </a>
                    </div>

                    {/* Trust signals */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Free shipping worldwide</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>30-day money back</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Lifetime updates</span>
                        </div>
                    </div>

                    {/* Card preview */}
                    <div className="mt-16 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10 pointer-events-none" />

                        <div className="flex justify-center gap-4 transform perspective-1000">
                            {/* Left card */}
                            <div className="w-48 sm:w-56 aspect-[1.586/1] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shadow-xl transform -rotate-6 translate-y-4 opacity-60">
                                <div className="p-4 h-full flex flex-col justify-between">
                                    <div className="w-6 h-6 rounded bg-amber-500/30" />
                                    <div>
                                        <div className="w-16 h-2 bg-zinc-700 rounded mb-1" />
                                        <div className="w-12 h-1.5 bg-zinc-700 rounded" />
                                    </div>
                                </div>
                            </div>

                            {/* Center card */}
                            <div className="w-56 sm:w-64 aspect-[1.586/1] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-amber-500/30 shadow-2xl transform z-20">
                                <div className="p-5 h-full flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <svg className="w-6 h-6 text-amber-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M6 12c0-3 2.69-6 6-6M10 12a2 2 0 104 0 2 2 0 00-4 0zM2 12c0-5.52 4.48-10 10-10" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold" style={{ fontFamily: "var(--font-outfit)" }}>NearSwipe</p>
                                        <p className="text-zinc-500 text-xs">Your Digital Identity</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right card */}
                            <div className="w-48 sm:w-56 aspect-[1.586/1] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shadow-xl transform rotate-6 translate-y-4 opacity-60">
                                <div className="p-4 h-full flex flex-col justify-between">
                                    <div className="w-6 h-6 rounded bg-amber-500/30" />
                                    <div>
                                        <div className="w-16 h-2 bg-zinc-700 rounded mb-1" />
                                        <div className="w-12 h-1.5 bg-zinc-700 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
