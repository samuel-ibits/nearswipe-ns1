"use client";

export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Tap Your Card",
            description: "Simply tap your NFC card on any smartphone. No app needed on their end.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            number: "02",
            title: "Profile Opens Instantly",
            description: "Your digital profile opens immediately in their browser. Clean, professional, impressive.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            number: "03",
            title: "Grow Your Network",
            description: "They save your contact. You save theirs. Follow up and build meaningful connections.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section id="how-it-works" className="relative section-padding bg-[#080808]">
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-3 block">
                        How It Works
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        Simple. <span className="text-gradient">Fast.</span> Universal.
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Connect with anyone in seconds. No apps to download, no QR codes to scan.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connection lines (desktop) */}
                    <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-px">
                        <div className="w-full h-full bg-gradient-to-r from-amber-500/50 via-amber-500/20 to-amber-500/50" />
                    </div>

                    {steps.map((step, index) => (
                        <div key={step.number} className="relative group">
                            {/* Card */}
                            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 h-full card-hover">
                                {/* Step number */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-5xl font-bold text-zinc-800 group-hover:text-amber-500/20 transition-colors">
                                        {step.number}
                                    </span>
                                    <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3
                                    className="text-xl font-semibold mb-3 text-white"
                                    style={{ fontFamily: "var(--font-outfit)" }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-zinc-400">
                                    {step.description}
                                </p>
                            </div>

                            {/* Mobile connector */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden flex justify-center my-4">
                                    <svg className="w-6 h-6 text-amber-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
