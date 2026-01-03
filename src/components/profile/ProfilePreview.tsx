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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-sm bg-white rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 border-4 border-gray-900">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                >
                    ✕
                </button>

                {/* Profile Header Background */}
                <div className="h-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

                <div className="px-6 pb-8">
                    {/* Avatar */}
                    <div className="relative -mt-16 mb-6 flex justify-center">
                        <div className="w-32 h-32 rounded-full border-8 border-white overflow-hidden bg-gradient-to-br from-amber-400 to-orange-600 shadow-xl flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                                {profile.brandName.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {profile.brandName}
                        </h2>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                            {profile.profileType}
                        </span>
                        {profile.description && (
                            <p className="text-gray-600 mt-4 leading-relaxed text-sm">
                                {profile.description}
                            </p>
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="space-y-3">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {profile.socials?.map((social: any, idx: number) => (
                            <a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all border border-gray-100 hover:shadow-md group"
                            >
                                {/* Icon Placeholder */}
                                <span className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-lg shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                                    {social.platform[0]}
                                </span>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 text-sm">{social.platform}</p>
                                    <p className="text-xs text-gray-400 truncate">{social.url}</p>
                                </div>
                                <span className="text-gray-300 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                        ))}
                    </div>

                    <div className="mt-8">
                        <button className="w-full py-4 bg-black text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:gap-2 transition-all flex items-center justify-center gap-1 group">
                            <span>Save Contact</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
