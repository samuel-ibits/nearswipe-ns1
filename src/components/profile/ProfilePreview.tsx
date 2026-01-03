"use client";

import React from "react";

interface ProfilePreviewProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: any;
    onClose: () => void;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({
    profile,
    onClose,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                >
                    ✕
                </button>

                {/* Profile Header Background */}
                <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                <div className="px-6 pb-8">
                    {/* Avatar */}
                    <div className="relative -mt-12 mb-4">
                        <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-md">
                            {profile.picture ? (
                                <img
                                    src={profile.picture}
                                    alt={profile.firstName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                                    {profile.firstName?.[0]}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {profile.firstName} {profile.lastName}
                        </h2>
                        <p className="text-gray-600 font-medium">{profile.position}</p>
                        <p className="text-gray-500 text-sm">{profile.company}</p>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-3">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {profile.socialMedia?.map((social: any, idx: number) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
                            >
                                {/* Fallback Icon */}
                                <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-xs font-bold text-gray-600">
                                    {social.platform[0]}
                                </span>
                                <span className="flex-1 font-medium text-gray-700">
                                    {social.platform}
                                </span>
                                <span className="text-xs text-gray-400">↗</span>
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <button className="w-full py-3 bg-black text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Save Contact
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
