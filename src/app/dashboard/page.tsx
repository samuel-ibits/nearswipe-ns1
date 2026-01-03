"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfilePreview } from "@/components/profile/ProfilePreview";

interface Profile {
    _id: string;
    brandName: string;
    description?: string;
    profileType: "personal" | "business" | "custom";
    socials: { platform: string; url: string }[];
    theme: string;
    isActive: boolean;
}

export default function DashboardPage() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
    const [previewProfile, setPreviewProfile] = useState<Profile | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const res = await fetch("/api/profiles");
            if (res.status === 401) {
                router.push("/auth/login");
                return;
            }
            const data = await res.json();
            setProfiles(data.profiles || []);
        } catch (error) {
            console.error("Failed to fetch profiles", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (data: any) => {
        // Remove catch block to let ProfileForm handle errors
        const method = editingProfile ? "PUT" : "POST";
        const url = editingProfile
            ? `/api/profiles/${editingProfile._id}`
            : "/api/profiles";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const responseData = await res.json();

        if (!res.ok) {
            throw new Error(responseData.message || responseData.error || "Failed to save");
        }

        await fetchProfiles();
        setIsEditing(false);
        setEditingProfile(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this profile?")) return;

        try {
            const res = await fetch(`/api/profiles/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete");
            await fetchProfiles();
        } catch (error) {
            console.error(error);
            alert("Failed to delete profile");
        }
    };

    const handlePublish = async (id: string, currentStatus: boolean) => {
        // Toggle isActive
        try {
            const res = await fetch(`/api/profiles/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !currentStatus })
            });

            if (!res.ok) throw new Error("Failed to update status");
            await fetchProfiles();
        } catch (error) {
            console.error(error);
            alert("Failed to update profile status");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            My Profiles
                        </h1>
                        <p className="text-gray-400 mt-2">
                            Manage your digital business cards.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingProfile(null);
                            setIsEditing(true);
                        }}
                        className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                    >
                        + Create New Profile
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading...</div>
                ) : isEditing ? (
                    <div className="w-full">
                        <ProfileForm
                            initialData={editingProfile}
                            onSubmit={handleSave}
                            onCancel={() => {
                                setIsEditing(false);
                                setEditingProfile(null);
                            }}
                        />
                    </div>
                ) : profiles.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl border-dashed">
                        <h3 className="text-xl font-semibold mb-2">No profiles yet</h3>
                        <p className="text-gray-400 mb-6">Create your first digital card to get started.</p>
                        <button
                            onClick={() => {
                                setEditingProfile(null);
                                setIsEditing(true);
                            }}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                        >
                            Create Profile
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profiles.map((profile) => (
                            <ProfileCard
                                key={profile._id}
                                profile={profile}
                                onEdit={(p) => {
                                    setEditingProfile(p);
                                    setIsEditing(true);
                                }}
                                onPreview={setPreviewProfile}
                                onPublish={() => handlePublish(profile._id, profile.isActive)}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {previewProfile && (
                <ProfilePreview
                    profile={previewProfile}
                    onClose={() => setPreviewProfile(null)}
                />
            )}
        </div>
    );
}
