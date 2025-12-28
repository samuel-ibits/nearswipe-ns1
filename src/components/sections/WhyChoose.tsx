"use client";

export default function WhyChoose() {
    const benefits = [
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: "iOS & Android",
            description: "Works seamlessly on any smartphone. No compatibility issues, ever.",
            accent: "from-blue-500 to-cyan-500",
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: "Eco-Friendly",
            description: "No paper waste. One card replaces thousands of business cards.",
            accent: "from-green-500 to-emerald-500",
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            title: "Premium Design",
            description: "Sleek, sophisticated cards that signal credibility and professionalism.",
            accent: "from-amber-500 to-orange-500",
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Lightning Fast",
            description: "Instant connection. No fumbling with apps or waiting for loads.",
            accent: "from-yellow-500 to-amber-500",
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Secure & Private",
            description: "You control what you share. GDPR compliant and secure.",
            accent: "from-purple-500 to-pink-500",
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            ),
            title: "Built for Scale",
            description: "Perfect for individuals, teams, and enterprise. Grow without limits.",
            accent: "from-indigo-500 to-blue-500",
        },
    ];

    return (
        <section className="relative section-padding bg-[#080808]">
            {/* Top border accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-3 block">
                        Why People Choose NearSwipe
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        No paper. <span className="text-gradient">No limits.</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Everything you need to network like a professional in the digital age.
                    </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <div
                            key={benefit.title}
                            className="group relative p-6 rounded-2xl bg-zinc-900/30 border border-white/5 card-hover overflow-hidden"
                        >
                            {/* Hover gradient */}
                            <div
                                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${benefit.accent}`}
                            />

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.accent} bg-opacity-10 flex items-center justify-center text-white mb-4 relative`}>
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${benefit.accent} opacity-20`} />
                                <div className="relative">{benefit.icon}</div>
                            </div>

                            {/* Content */}
                            <h3
                                className="text-lg font-semibold text-white mb-2"
                                style={{ fontFamily: "var(--font-outfit)" }}
                            >
                                {benefit.title}
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
