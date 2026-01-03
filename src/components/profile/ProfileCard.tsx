"use client";

import { Profile } from "@/lib/models/Profile";
import React from "react";

interface ProfileCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: any; // Using any for now to avoid frontend type duplication, strictly typing later
    onEdit: (profile: any) => void;
    onPreview: (profile: any) => void;
    onPublish: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    profile,
    onEdit,
    onPreview,
    onPublish,
    onDelete,
}) => {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col gap-4 text-white shadow-lg transition-all hover:bg-white/10">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                    {profile.picture ? (
                        <img
                            src={profile.picture}
                            alt={`${profile.firstName} ${profile.lastName}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                            {profile.firstName?.[0]}
                            {profile.lastName?.[0]}
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold truncate">
                        {profile.firstName} {profile.lastName}
                    </h3>
                    <p className="text-sm text-gray-400 truncate">{profile.position}</p>
                    <p className="text-xs text-gray-500 truncate">{profile.company}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    {profile.isPublished ? (
                        <span className="px-3 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                            Published
                        </span>
                    ) : (
                        <span className="px-3 py-1 text-xs font-semibold bg-gray-700 text-gray-300 rounded-full">
                            Draft
                        </span>
                    )}
                </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex flex-wrap gap-2 justify-between items-center">
                <div className="flex gap-2">
                    {!profile.isPublished && (
                        <button
                            onClick={() => onPublish(profile._id)}
                            className="px-3 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                        >
                            Publish
                        </button>
                    )}
                    <button
                        onClick={() => onPreview(profile)}
                        className="px-3 py-1.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => onEdit(profile)}
                        className="px-3 py-1.5 text-sm font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                        Edit
                    </button>
                </div>
                <button
                    onClick={() => onDelete(profile._id)}
                    className="px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
