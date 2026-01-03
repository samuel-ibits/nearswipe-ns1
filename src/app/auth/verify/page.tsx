"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Try to get email from local storage or previous navigation state
        const storedEmail = localStorage.getItem("verify_email");
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Verification failed");
            }

            // Success
            localStorage.removeItem("verify_email");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl w-full max-w-sm">
            <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
                <p className="text-zinc-400 text-sm">
                    We sent a verification code to <span className="text-white font-medium">{email || "your email"}</span>.
                </p>
            </div>

            {error && (
                <div className="p-3 mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1 text-center">
                        Verification Code (OTP)
                    </label>
                    <input
                        type="text"
                        required
                        maxLength={6}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-4 text-white text-center text-2xl tracking-[0.5em] font-mono focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-800"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black font-semibold py-3.5 rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Verifying..." : "Verify & Continue"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-500">
                Didn't receive code?{" "}
                <button className="text-amber-500 hover:text-amber-400 transition-colors font-medium">
                    Resend
                </button>
            </div>
        </div>
    );
}
