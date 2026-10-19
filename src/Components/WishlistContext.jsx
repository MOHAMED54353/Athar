import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "athar-wishlist";

export function WishlistProvider({ children }) {
    const [ids, setIds] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
        } catch {
            /* ignore */
        }
    }, [ids]);

    const toggle = (id) =>
        setIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    const has = (id) => ids.includes(id);

    return (
        <WishlistContext.Provider value={{ ids, toggle, has, count: ids.length }}>
            {children}
        </WishlistContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
    return ctx;
}