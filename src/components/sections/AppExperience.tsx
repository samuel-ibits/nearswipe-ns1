"use client";

export default function AppExperience() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            title: "Professional Profile",
            description: "Create a stunning digital profile with your photo, bio, and contact info",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            ),
            title: "Social Links",
            description: "Add all your social profiles, portfolio, and website links in one place",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Save Contacts",
            description: "Automatically save new connections and organize your growing network",
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: "Real-time Updates",
            description: "Update your details anytime. Changes reflect instantly everywhere",
        },
    ];

    return (
        <section id="features" className="relative section-padding overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#0a0a0a] to-[#080808]" />

            {/* Accent glow */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Phone Mockup */}
                    <div className="relative flex justify-center lg:order-1">
                        <div className="relative">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-amber-500/15 blur-3xl scale-110 rounded-full" />

                            {/* Phone frame */}
                            <div className="relative w-64 sm:w-72 bg-zinc-900 rounded-[3rem] p-3 border border-white/10 shadow-2xl">
                                {/* Screen */}
                                <div className="bg-zinc-800 rounded-[2.5rem] overflow-hidden">
                                    {/* Status bar */}
                                    <div className="flex justify-between items-center px-6 py-3 bg-zinc-900">
                                        <span className="text-xs text-zinc-400">9:41</span>
                                        <div className="flex gap-1">
                                            <div className="w-4 h-2 bg-zinc-600 rounded-sm" />
                                            <div className="w-4 h-2 bg-zinc-600 rounded-sm" />
                                            <div className="w-6 h-2 bg-green-500 rounded-sm" />
                                        </div>
                                    </div>

                                    {/* App content */}
                                    <div className="p-4 space-y-4">
                                        {/* Profile header */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600" />
                                            <div>
                                                <div className="w-24 h-3 bg-white rounded mb-2" />
                                                <div className="w-16 h-2 bg-zinc-600 rounded" />
                                            </div>
                                        </div>

                                        {/* Social links grid */}
                                        <div className="grid grid-cols-3 gap-2">
                                            {["#1877F2", "#E4405F", "#0A66C2", "#1DA1F2", "#FF0000", "#25D366"].map((color, i) => (
                                                <div
                                                    key={i}
                                                    className="aspect-square rounded-xl flex items-center justify-center"
                                                    style={{ background: color + "20" }}
                                                >
                                                    <div className="w-6 h-6 rounded-full" style={{ background: color }} />
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA button */}
                                        <div className="w-full h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl" />

                                        {/* Info cards */}
                                        <div className="space-y-2">
                                            <div className="h-10 bg-zinc-700/50 rounded-lg" />
                                            <div className="h-10 bg-zinc-700/50 rounded-lg" />
                                        </div>
                                    </div>
                                </div>

                                {/* Home indicator */}
                                <div className="flex justify-center mt-2">
                                    <div className="w-24 h-1 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:order-0">
                        <span className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-3 block">
                            The App Experience
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                            style={{ fontFamily: "var(--font-outfit)" }}
                        >
                            Powerful. Simple. <span className="text-gradient">Smart.</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 max-w-lg">
                            Your network deserves more than paper. Manage your professional identity
                            from anywhere with our intuitive mobile app.
                        </p>

                        {/* Features list */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-xl bg-zinc-900/30 border border-white/5 card-hover group"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 mb-3 group-hover:bg-amber-500 group-hover:text-black transition-all">
                                        {feature.icon}
                                    </div>
                                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                                    <p className="text-sm text-zinc-500">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
