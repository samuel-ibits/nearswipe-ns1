"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const products = [
    {
        id: "classic",
        name: "NearSwipe Classic",
        description: "The essential smart card for professionals starting their digital journey.",
        price: "$29",
        originalPrice: "$49",
        features: [
            "Premium PVC NFC card",
            "Basic profile customization",
            "Unlimited taps",
            "1 year app access",
            "Email support",
        ],
        popular: false,
        gradient: "from-zinc-600 to-zinc-700",
    },
    {
        id: "pro",
        name: "NearSwipe Pro",
        description: "Advanced features for power networkers and ambitious professionals.",
        price: "$59",
        originalPrice: "$89",
        features: [
            "Premium metal NFC card",
            "Advanced profile themes",
            "Analytics dashboard",
            "Unlimited taps",
            "Priority support",
            "Lifetime updates",
        ],
        popular: true,
        gradient: "from-amber-500 to-amber-600",
    },
    {
        id: "enterprise",
        name: "NearSwipe Enterprise",
        description: "Custom solutions for teams and organizations with advanced needs.",
        price: "$149",
        originalPrice: "$199",
        features: [
            "Custom branded cards",
            "Team management portal",
            "Bulk ordering discounts",
            "API access",
            "Dedicated account manager",
            "White-label options",
            "SLA guarantee",
        ],
        popular: false,
        gradient: "from-purple-500 to-purple-600",
    },
];

export default function ShopPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />

                <div className="container-custom relative z-10 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <span className="text-sm text-amber-500 font-medium">Shop NearSwipe</span>
                    </span>

                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                        style={{ fontFamily: "var(--font-outfit)" }}
                    >
                        Choose Your <span className="text-gradient">NearSwipe Card</span>
                    </h1>

                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Premium NFC cards designed for professionals. One tap to share your complete digital identity.
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="pb-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className={`relative group rounded-2xl bg-zinc-900/50 border transition-all duration-300 hover:scale-[1.02] ${product.popular
                                    ? "border-amber-500/50 shadow-lg shadow-amber-500/10"
                                    : "border-white/10 hover:border-white/20"
                                    }`}
                            >
                                {/* Popular badge */}
                                {product.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black text-sm font-semibold">
                                        Most Popular
                                    </div>
                                )}

                                {/* Card preview */}
                                <div className="p-6 pt-8">
                                    <div className={`w-full aspect-[1.586/1] rounded-xl bg-gradient-to-br ${product.gradient} mb-6 p-4 flex flex-col justify-between relative overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-20">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                                        </div>
                                        <div className="flex justify-between relative z-10">
                                            <div className="w-8 h-8 rounded bg-black/30 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <svg className="w-6 h-6 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M6 12c0-3 2.69-6 6-6M10 12a2 2 0 104 0 2 2 0 00-4 0zM2 12c0-5.52 4.48-10 10-10" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
                                                {product.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <h3
                                        className="text-xl font-bold text-white mb-2"
                                        style={{ fontFamily: "var(--font-outfit)" }}
                                    >
                                        {product.name}
                                    </h3>
                                    <p className="text-zinc-400 text-sm mb-4">
                                        {product.description}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2 mb-6">
                                        <span className="text-3xl font-bold text-white">{product.price}</span>
                                        <span className="text-zinc-500 line-through">{product.originalPrice}</span>
                                    </div>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-6">
                                        {product.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                                                <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <button
                                        className={`w-full py-3 rounded-xl font-semibold transition-all ${product.popular
                                            ? "btn-primary"
                                            : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                                            }`}
                                    >
                                        Get {product.name.split(" ")[1]}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 border-t border-white/5">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-zinc-500">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Free worldwide shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>30-day money back guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Secure checkout</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Lifetime updates</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Home */}
            <section className="pb-20">
                <div className="container-custom text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
