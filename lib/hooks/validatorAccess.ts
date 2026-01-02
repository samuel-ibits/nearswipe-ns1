// hooks/useAuthRedirect.js
// import { parseCookies, destroyCookie } from 'nookies';

export async function validatorAccessRedirect() {

    if (typeof window === 'undefined') return;

    try {
        const res = await fetch('/api/validation/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // if (!res.ok) {
        //     // throw new Error('Invalid token');
        //     return false;
        // }

        const data = await res.json();
        return data; // ✅ Return validated user data
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
};
