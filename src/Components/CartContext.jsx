import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "athar-cart";

// بيحوّل "2499 ج.م" أو "2000" لرقم
const parsePrice = (v) => Number(String(v).replace(/[^\d.]/g, "")) || 0;

// نفس المنتج بمقاس/لون مختلف = سطر مختلف
const makeKey = (id, size, color) => `${id}|${size || ""}|${color || ""}`;

const loadItems = () => {
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        // توافق مع الكارت القديم (من غير key)
        return raw.map((i) => ({ ...i, key: i.key || String(i.id) }));
    } catch {
        return [];
    }
};

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadItems);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            /* ignore */
        }
    }, [items]);

    const addToCart = (product, { size = "", color = "", qty = 1 } = {}) => {
        const key = makeKey(product.id, size, color);
        setItems((prev) => {
            const found = prev.find((i) => i.key === key);
            if (found) {
                return prev.map((i) =>
                    i.key === key ? { ...i, qty: i.qty + qty } : i
                );
            }
            return [
                ...prev,
                {
                    key,
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    img: product.img,
                    price: parsePrice(product.price),
                    size,
                    color,
                    qty,
                },
            ];
        });
    };

    const increase = (key) =>
        setItems((prev) =>
            prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
        );

    const decrease = (key) =>
        setItems((prev) =>
            prev
                .map((i) => (i.key === key ? { ...i, qty: i.qty - 1 } : i))
                .filter((i) => i.qty > 0)
        );

    const removeFromCart = (key) =>
        setItems((prev) => prev.filter((i) => i.key !== key));

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