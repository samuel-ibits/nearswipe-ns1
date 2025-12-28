"use client";

export default function GlobalGeneration() {
    const cities = [
        { name: "Lagos", country: "Nigeria" },
        { name: "London", country: "UK" },
        { name: "Nairobi", country: "Kenya" },
        { name: "New York", country: "USA" },
        { name: "Dubai", country: "UAE" },
        { name: "Accra", country: "Ghana" },
    ];

    const audiences = [
        "Remote Workers",
        "Startup Founders",
        "Conference Attendees",
        "Diaspora Professionals",
        "Tech Leaders",
        "Creative Directors",
    ];

    return (
        <section className="relative section-padding overflow-hidden">
            {/* Background map pattern */}
            <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
                    <path
                        d="M100,300 Q300,200 500,300 T900,300 T1100,250"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-amber-500"
                    />
                    <path
                        d="M0,350 Q200,400 400,350 T800,350 T1200,300"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                        className="text-zinc-600"
                    />
                    {/* Dots representing cities */}
                    {[150, 350, 500, 700, 850, 950].map((x, i) => (
                        <circle key={i} cx={x} cy={300 + (i % 2 === 0 ? -20 : 20)} r="4" fill="currentColor" className="text-amber-500/50" />
                    ))}
                </svg>
            </div>

            {/* Glow effects */}
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
            <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-amber-600/6 rounded-full blur-3xl" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-3 block">
                        Built for a Global Generation
                    </span>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        From Lagos to London.<br className="hidden sm:block" />
                        <span className="text-gradient">Nairobi to New York.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        One tap connects you everywhere. Designed for people who move across
                        cities and countries, building influence beyond borders.
                    </p>
                </div>

                {/* Cities */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {cities.map((city, index) => (
                        <div
                            key={city.name}
                            className="group px-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-amber-500/30 transition-all cursor-default"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-amber-500/60 group-hover:bg-amber-500 transition-colors" />
                                <div>
                                    <p className="font-semibold text-white">{city.name}</p>
                                    <p className="text-sm text-zinc-500">{city.country}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Audience tags */}
                <div className="bg-zinc-900/30 rounded-3xl border border-white/5 p-8 md:p-12">
                    <p className="text-center text-zinc-400 mb-8">
                        Designed for people who:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {audiences.map((audience, index) => (
                            <span
                                key={audience}
                                className="px-5 py-2.5 rounded-full bg-zinc-800/50 border border-white/5 text-sm text-zinc-300 hover:border-amber-500/30 hover:text-amber-500 transition-all cursor-default"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {audience}
                            </span>
                        ))}
                    </div>

                    {/* Quote */}
                    <div className="mt-12 text-center">
                        <blockquote className="text-2xl md:text-3xl font-light text-zinc-300 italic">
                            &ldquo;Your identity, <span className="text-amber-500 font-medium not-italic">always ready.</span>&rdquo;
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    );
}
