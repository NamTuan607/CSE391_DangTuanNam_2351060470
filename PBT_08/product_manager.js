const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

function getInStock(items) {
    return items.filter(product => product.stock > 0);
}

function filterProducts(items, category, minPrice, maxPrice) {
    return items.filter(product => {
        return product.category === category && product.price >= minPrice && product.price <= maxPrice;
    });
}

function sortByPrice(items, order = "asc") {
    return [...items].sort((a, b) => {
        return order === "desc" ? b.price - a.price : a.price - b.price;
    });
}

function cheapestByCategory(items) {
    const categories = items.map(product => product.category).filter((category, index, array) => array.indexOf(category) === index);

    return categories.reduce((result, category) => {
        const productsInCategory = items.filter(product => product.category === category);
        const cheapest = [...productsInCategory]
            .sort((a, b) => a.price - b.price)
            .find((_, index) => index === 0);
        result[category] = cheapest;
        return result;
    }, {});
}

function totalInventoryValue(items) {
    return items.reduce((total, product) => total + product.price * product.stock, 0);
}

function formatPrice(value) {
    return value.toLocaleString("vi-VN") + "đ";
}

function formatProductList(items) {
    return items.map(product => ({
        name: product.name,
        formattedPrice: formatPrice(product.price)
    }));
}

function averageRating(items) {
    if (items.length === 0) {
        return 0;
    }

    return items.reduce((total, product) => total + product.rating, 0) / items.length;
}

function searchProducts(items, keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return items.filter(product => product.name.toLowerCase().includes(lowerKeyword));
}

console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString("vi-VN") + "đ");

if (typeof module !== "undefined") {
    module.exports = {
        products,
        getInStock,
        filterProducts,
        sortByPrice,
        cheapestByCategory,
        totalInventoryValue,
        formatProductList,
        averageRating,
        searchProducts,
    };
}