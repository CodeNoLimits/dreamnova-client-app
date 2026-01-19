import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
    isAdmin: boolean;
    login: (code: string) => boolean;
    logout: () => void;
}

export const useAdminStore = create<AdminState>()(
    persist(
        (set) => ({
            isAdmin: false,
            login: (code: string) => {
                const adminCode = process.env.NEXT_PUBLIC_ADMIN_CODE || '770';
                if (code === adminCode) {
                    set({ isAdmin: true });
                    return true;
                }
                return false;
            },
            logout: () => set({ isAdmin: false }),
        }),
        {
            name: 'dreamnova-admin-storage',
        }
    )
);
