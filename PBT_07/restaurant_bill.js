function formatVnd(amount) {
    return amount.toLocaleString("vi-VN") + "đ";
}

function getDiscountPercent(subtotal, isWednesday) {
    let discountPercent = 0;

    if (subtotal > 1000000) {
        discountPercent = 15;
    } else if (subtotal > 500000) {
        discountPercent = 10;
    }

    if (isWednesday) {
        discountPercent += 5;
    }

    return discountPercent;
}

function generateRestaurantBill(items, options = {}) {
    const isWednesday = options.isWednesday === true;
    const tipPercent = typeof options.tipPercent === "number" ? options.tipPercent : 5;

    let subtotal = 0;
    const lines = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;

        lines.push({
            index: i + 1,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: lineTotal,
        });
    }

    const discountPercent = getDiscountPercent(subtotal, isWednesday);
    const discountAmount = subtotal * discountPercent / 100;
    const afterDiscount = subtotal - discountAmount;
    const vatAmount = afterDiscount * 0.08;
    const tipAmount = afterDiscount * tipPercent / 100;
    const totalPayment = afterDiscount + vatAmount + tipAmount;

    let output = "╔══════════════════════════════════════╗\n";
    output += "║        HÓA ĐƠN NHÀ HÀNG              ║\n";
    output += "╠══════════════════════════════════════╣\n";

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const namePart = `${line.index}. ${line.name}`.padEnd(16, " ");
        const qtyPart = `x${line.quantity}`.padEnd(5, " ");
        const pricePart = `@${formatVnd(line.price).replace("đ", "")}`.padEnd(8, " ");
        const totalPart = `${formatVnd(line.total).replace("đ", "")}`;
        output += `║ ${namePart}${qtyPart}${pricePart}= ${totalPart.padEnd(8, " ")}║\n`;
    }

    output += "╠══════════════════════════════════════╣\n";
    output += `║ Tổng cộng:${"".padStart(23, " ")}${formatVnd(subtotal).padEnd(10, " ")}║\n`;
    output += `║ Giảm giá (${discountPercent}%):${"".padStart(16, " ")}${formatVnd(discountAmount).padEnd(10, " ")}║\n`;
    output += `║ VAT (8%):${"".padStart(20, " ")}${formatVnd(vatAmount).padEnd(10, " ")}║\n`;
    output += `║ Tip (${tipPercent}%):${"".padStart(19, " ")}${formatVnd(tipAmount).padEnd(10, " ")}║\n`;
    output += "╠══════════════════════════════════════╣\n";
    output += `║ THANH TOÁN:${"".padStart(21, " ")}${formatVnd(totalPayment).padEnd(10, " ")}║\n`;
    output += "╚══════════════════════════════════════╝";

    return output;
}

const items = [
    { name: "Phở bò", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả", price: 55000, quantity: 1 },
];

console.log(generateRestaurantBill(items, { isWednesday: false, tipPercent: 5 }));

if (typeof module !== "undefined") {
    module.exports = { generateRestaurantBill };
}