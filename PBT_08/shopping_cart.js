function createCart() {
    let items = [];
    let discountAmount = 0;

    function formatVnd(value) {
        return value.toLocaleString("vi-VN");
    }

    function getEffectiveTotal() {
        const baseTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return Math.max(baseTotal - discountAmount, 0);
    }

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
                return;
            }

            items.push({ ...product, quantity });
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(entry => entry.id === productId);
            if (!item) {
                return;
            }

            if (newQuantity <= 0) {
                items = items.filter(entry => entry.id !== productId);
                return;
            }

            item.quantity = newQuantity;
        },

        getTotal() {
            return getEffectiveTotal();
        },

        applyDiscount(code) {
            const baseTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

            if (code === "SALE10") {
                discountAmount = baseTotal * 0.1;
            } else if (code === "SALE20") {
                discountAmount = baseTotal * 0.2;
            } else if (code === "FREESHIP") {
                discountAmount = Math.min(discountAmount + 30000, baseTotal);
            }
        },

        printCart() {
            const baseTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const finalTotal = getEffectiveTotal();

            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const total = item.price * item.quantity;
                const line = `│ ${String(i + 1).padEnd(1)} │ ${item.name.padEnd(13)} │ ${String(item.quantity).padStart(2)} │ ${formatVnd(item.price).padStart(11)} │ ${formatVnd(total).padStart(11)} │`;
                console.log(line);
            }
            console.log("├──────────────────────────────────────────────┤");
            console.log(`│ Tổng cộng:${formatVnd(baseTotal).padStart(31)}đ │`);
            if (discountAmount > 0) {
                console.log(`│ Giảm giá:${formatVnd(discountAmount).padStart(31)}đ │`);
            }
            console.log(`│ Thanh toán:${formatVnd(finalTotal).padStart(29)}đ │`);
            console.log("└──────────────────────────────────────────────┘");
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            discountAmount = 0;
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();
cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount());
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());

if (typeof module !== "undefined") {
    module.exports = { createCart };
}