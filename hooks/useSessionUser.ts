import { IAdminUser } from "@/interfaces/userInterface";
import { useEffect, useState } from "react";

export const useSessionUser = () => {
    const [user, setUser] = useState<IAdminUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const deleteSessionUser = () => {
        sessionStorage.removeItem('user');
        setUser(null);
    }

    return { user, loading, deleteSessionUser };
}