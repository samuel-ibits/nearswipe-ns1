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
        firstName: "",
        lastName: "",
        company: "",
        position: "",
        picture: "",
        socialMedia: [] as { platform: string; url: string }[],
        isPublished: false,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSocialChange = (index: number, field: string, value: string) => {
        const newSocials = [...formData.socialMedia];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newSocials[index] as any)[field] = value;
        setFormData((prev) => ({ ...prev, socialMedia: newSocials }));
    };

    const addSocial = () => {
        setFormData((prev) => ({
            ...prev,
            socialMedia: [...prev.socialMedia, { platform: "Website", url: "" }],
        }));
    };

    const removeSocial = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            socialMedia: prev.socialMedia.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
            <h2 className="text-xl font-bold mb-4">
                {initialData ? "Edit Profile" : "Create New Profile"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-500"
                        placeholder="John"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-500"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Company
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-500"
                        placeholder="Acme Inc."
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Position
                    </label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-500"
                        placeholder="Software Engineer"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                    Profile Picture URL
                </label>
                <input
                    type="url"
                    name="picture"
                    value={formData.picture}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-500"
                    placeholder="https://example.com/photo.jpg"
                />
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-300">
                        Social Media
                    </label>
                    <button
                        type="button"
                        onClick={addSocial}
                        className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors"
                    >
                        + Add Link
                    </button>
                </div>
                {formData.socialMedia.map((social, index) => (
                    <div key={index} className="flex gap-2">
                        <select
                            value={social.platform}
                            onChange={(e) =>
                                handleSocialChange(index, "platform", e.target.value)
                            }
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none text-white text-sm"
                        >
                            <option value="Website" className="bg-gray-800">Website</option>
                            <option value="LinkedIn" className="bg-gray-800">LinkedIn</option>
                            <option value="Twitter" className="bg-gray-800">Twitter</option>
                            <option value="Instagram" className="bg-gray-800">Instagram</option>
                            <option value="Facebook" className="bg-gray-800">Facebook</option>
                            <option value="Other" className="bg-gray-800">Other</option>
                        </select>
                        <input
                            type="text"
                            value={social.url}
                            onChange={(e) =>
                                handleSocialChange(index, "url", e.target.value)
                            }
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none text-white text-sm placeholder-gray-500"
                            placeholder="URL"
                        />
                        <button
                            type="button"
                            onClick={() => removeSocial(index)}
                            className="text-red-400 hover:bg-red-500/10 px-2 rounded"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-gray-300">
                    Publish Profile Immediately
                </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : "Save Profile"}
                </button>
            </div>
        </form>
    );
};
