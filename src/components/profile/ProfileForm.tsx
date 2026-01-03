"use client";

import React, { useState, useEffect } from "react";
// Lucide icons would be good here if available, using text for now or simple svgs

interface ProfileFormProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
}) => {
    const [formData, setFormData] = useState({
        brandName: "",
        description: "",
        profileType: "personal", // 'business' | 'personal' | 'custom'
        socials: [] as { platform: string; url: string }[],
        isActive: true,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                brandName: initialData.brandName || "",
                description: initialData.description || "",
                profileType: initialData.profileType || "personal",
                socials: initialData.socials || [],
                isActive: initialData.isActive ?? true,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked; // Type assertion since Select/TextArea don't have checked

        setError(null); // Clear error on change
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSocialChange = (index: number, field: string, value: string) => {
        const newSocials = [...formData.socials];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newSocials[index] as any)[field] = value;
        setFormData((prev) => ({ ...prev, socials: newSocials }));
    };

    const addSocial = () => {
        setFormData((prev) => ({
            ...prev,
            socials: [...prev.socials, { platform: "Website", url: "" }],
        }));
    };

    const removeSocial = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            socials: prev.socials.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await onSubmit(formData);
        } catch (err: any) {
            console.error("Form submission error:", err);
            // Extract error message if it's an object from API
            const msg = err.message || "An error occurred";
            // If backend returns { error: "..." }, check that too
            const backendError = err.error || msg;
            setError(backendError);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-white max-w-2xl mx-auto p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400">
                    {initialData ? "Edit Profile" : "Create New Profile"}
                </h2>
                {error && (
                    <div className="text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded border border-red-400/20">
                        {error}
                    </div>
                )}
            </div>

            {/* Profile Type & Brand Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Profile Type
                    </label>
                    <select
                        name="profileType"
                        value={formData.profileType}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500/50 outline-none text-white appearance-none"
                    >
                        <option value="personal">Personal</option>
                        <option value="business">Business</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Display Name / Brand
                    </label>
                    <input
                        type="text"
                        name="brandName"
                        required
                        value={formData.brandName}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500/50 outline-none text-white placeholder-gray-600"
                        placeholder="e.g. John Doe or Acme Corp"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    Bio / Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-500/50 outline-none text-white placeholder-gray-600 resize-none"
                    placeholder="Tell us about yourself..."
                />
            </div>

            {/* Social Media */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-300">
                        Links & Socials
                    </label>
                    <button
                        type="button"
                        onClick={addSocial}
                        className="text-xs px-3 py-1.5 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 rounded-full transition-colors font-medium"
                    >
                        + Add Link
                    </button>
                </div>
                <div className="space-y-3">
                    {formData.socials.map((social, index) => (
                        <div key={index} className="flex gap-2 group">
                            <select
                                value={social.platform}
                                onChange={(e) =>
                                    handleSocialChange(index, "platform", e.target.value)
                                }
                                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none text-white text-sm focus:border-amber-500/50"
                            >
                                <option value="Website" className="bg-gray-900">Website</option>
                                <option value="LinkedIn" className="bg-gray-900">LinkedIn</option>
                                <option value="Twitter" className="bg-gray-900">Twitter</option>
                                <option value="Instagram" className="bg-gray-900">Instagram</option>
                                <option value="Facebook" className="bg-gray-900">Facebook</option>
                                <option value="Other" className="bg-gray-900">Other</option>
                            </select>
                            <input
                                type="text"
                                value={social.url}
                                onChange={(e) =>
                                    handleSocialChange(index, "url", e.target.value)
                                }
                                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 outline-none text-white text-sm placeholder-gray-600 focus:border-amber-500/50"
                                placeholder="https://..."
                            />
                            <button
                                type="button"
                                onClick={() => removeSocial(index)}
                                className="text-gray-500 hover:text-red-400 px-2 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    {formData.socials.length === 0 && (
                        <div className="text-center py-4 border border-dashed border-white/10 rounded-lg text-gray-600 text-sm">
                            No links added yet.
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 py-2">
                <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-300 cursor-pointer select-none">
                    Set as Active Profile
                </label>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-lg transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating..." : "Create Profile"}
                </button>
            </div>
        </form>
    );
};
