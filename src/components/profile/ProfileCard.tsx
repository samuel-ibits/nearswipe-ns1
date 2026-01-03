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
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col gap-4 text-white shadow-lg transition-all hover:bg-white/10 group">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl font-bold text-white shadow-inner">
                    {profile.brandName.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold truncate text-white group-hover:text-amber-400 transition-colors">
                        {profile.brandName}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">{profile.profileType}</p>
                    <p className="text-sm text-gray-400 truncate line-clamp-2">{profile.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    {profile.isActive ? (
                        <span className="px-3 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                            Active
                        </span>
                    ) : (
                        <span className="px-3 py-1 text-xs font-semibold bg-gray-700 text-gray-300 rounded-full">
                            Inactive
                        </span>
                    )}
                </div>
            </div>

            <div className="border-t border-white/5 pt-4 flex flex-wrap gap-2 justify-between items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => onPublish(profile._id)} // This now toggles active status
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${profile.isActive
                                ? "bg-amber-600/20 text-amber-400 hover:bg-amber-600/30"
                                : "bg-green-600 hover:bg-green-500 text-white"
                            }`}
                    >
                        {profile.isActive ? "Deactivate" : "Activate"}
                    </button>
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
