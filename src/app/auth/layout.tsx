
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo or Brand Element could go here */}

                {children}

                <div className="mt-8 text-center">
                    <p className="text-zinc-500 text-xs">
                        &copy; {new Date().getFullYear()} NearSwipe. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
