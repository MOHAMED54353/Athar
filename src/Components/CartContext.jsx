import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "athar-cart";

// بيحوّل "2499 ج.م" أو "2000" لرقم
const parsePrice = (v) => Number(String(v).replace(/[^\d.]/g, "")) || 0;

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            /* ignore */
        }
    }, [items]);

    const addToCart = (product) => {
        setItems((prev) => {
            const found = prev.find((i) => i.id === product.id);
            if (found) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    img: product.img,
                    price: parsePrice(product.price),
                    qty: 1,
                },
            ];
        });
    };

    const increase = (id) =>
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        );

    const decrease = (id) =>
        setItems((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
                .filter((i) => i.qty > 0)
        );

    const removeFromCart = (id) =>
        setItems((prev) => prev.filter((i) => i.id !== id));

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                increase,
                decrease,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
    return ctx;
}