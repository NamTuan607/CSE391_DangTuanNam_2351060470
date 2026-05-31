const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/640x640/2563eb/ffffff?text=iPhone+16", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/640x640/0f766e/ffffff?text=Samsung+S24", rating: 4.4, inStock: true },
    { id: 3, name: "Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/640x640/1d4ed8/ffffff?text=Pixel+9", rating: 4.6, inStock: true },
    { id: 4, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/640x640/0f172a/ffffff?text=MacBook+Pro", rating: 4.8, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/640x640/475569/ffffff?text=Dell+XPS+15", rating: 4.7, inStock: true },
    { id: 6, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://placehold.co/640x640/111827/ffffff?text=ThinkPad+X1", rating: 4.5, inStock: false },
    { id: 7, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/640x640/38bdf8/ffffff?text=iPad+Air", rating: 4.6, inStock: true },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/640x640/8b5cf6/ffffff?text=Xiaomi+Pad+6", rating: 4.2, inStock: true },
    { id: 9, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/640x640/ef4444/ffffff?text=AirPods+Pro", rating: 4.3, inStock: true },
    { id: 10, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://placehold.co/640x640/f59e0b/ffffff?text=Galaxy+Buds", rating: 4.1, inStock: true },
    { id: 11, name: "Apple Watch", price: 10990000, category: "accessory", image: "https://placehold.co/640x640/14b8a6/ffffff?text=Apple+Watch", rating: 4.7, inStock: false },
    { id: 12, name: "Surface Pro", price: 28990000, category: "tablet", image: "https://placehold.co/640x640/3b82f6/ffffff?text=Surface+Pro", rating: 4.5, inStock: true },
];

const categories = ["all", ...new Set(products.map(product => product.category))];
const state = {
    search: "",
    category: "all",
    sort: "featured",
    cartCount: 0,
    selectedProduct: null,
};

const app = document.querySelector("#app");
app.appendChild(buildShell());

const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const categoryBar = document.querySelector("#categoryBar");
const productGrid = document.querySelector("#productGrid");
const cartBadge = document.querySelector("#cartBadge");
const darkToggle = document.querySelector("#darkToggle");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalTitle = document.querySelector("#modalTitle");
const modalImage = document.querySelector("#modalImage");
const modalCategory = document.querySelector("#modalCategory");
const modalRating = document.querySelector("#modalRating");
const modalStock = document.querySelector("#modalStock");
const modalPrice = document.querySelector("#modalPrice");
const modalAddBtn = document.querySelector("#modalAddBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");

function buildShell() {
    const shell = document.createElement("div");
    shell.className = "shell";

    const topbar = document.createElement("header");
    topbar.className = "topbar";

    const brand = document.createElement("div");
    brand.className = "brand";
    const title = document.createElement("h1");
    title.textContent = "Interactive Product Catalog";
    const subtitle = document.createElement("p");
    subtitle.textContent = "Search, filter, sort, and inspect products with pure DOM rendering.";
    brand.append(title, subtitle);

    const actions = document.createElement("div");
    actions.className = "actions";

    const cartBtn = document.createElement("button");
    cartBtn.type = "button";
    cartBtn.className = "cart-btn";
    cartBtn.setAttribute("aria-label", "Cart badge");
    cartBtn.textContent = "🛒";
    const badge = document.createElement("span");
    badge.id = "cartBadge";
    badge.className = "badge";
    badge.textContent = "0";
    cartBtn.appendChild(badge);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "toggle-btn";
    toggle.id = "darkToggle";
    toggle.setAttribute("aria-label", "Toggle dark mode");
    toggle.textContent = "◐";

    actions.append(cartBtn, toggle);
    topbar.append(brand, actions);

    const toolbar = document.createElement("section");
    toolbar.className = "toolbar";

    const search = document.createElement("input");
    search.id = "searchInput";
    search.className = "search";
    search.type = "search";
    search.placeholder = "Search products...";
    search.setAttribute("aria-label", "Search products");

    const sort = document.createElement("select");
    sort.id = "sortSelect";
    sort.className = "sort";
    sort.setAttribute("aria-label", "Sort products");
    [
        ["featured", "Sort by: Featured"],
        ["price-asc", "Giá tăng"],
        ["price-desc", "Giá giảm"],
        ["name-asc", "Tên A-Z"],
        ["rating-desc", "Đánh giá cao nhất"],
    ].forEach(([value, label]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        sort.appendChild(option);
    });

    const spacer = document.createElement("div");
    const spacer2 = document.createElement("div");
    toolbar.append(search, sort, spacer, spacer2);

    const categoryWrap = document.createElement("section");
    categoryWrap.className = "categories";
    categoryWrap.id = "categoryBar";

    const grid = document.createElement("section");
    grid.className = "grid";
    grid.id = "productGrid";

    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBackdrop.id = "modalBackdrop";

    const modal = document.createElement("div");
    modal.className = "modal";

    const modalImg = document.createElement("img");
    modalImg.id = "modalImage";
    modalImg.alt = "Product image";

    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    const modalTitle = document.createElement("h2");
    modalTitle.id = "modalTitle";
    const modalCategory = document.createElement("div");
    modalCategory.id = "modalCategory";
    modalCategory.className = "category-pill";
    const modalRating = document.createElement("div");
    modalRating.id = "modalRating";
    const modalStock = document.createElement("div");
    modalStock.id = "modalStock";
    const modalPrice = document.createElement("div");
    modalPrice.id = "modalPrice";
    modalPrice.className = "price";

    const modalActions = document.createElement("div");
    modalActions.className = "card-actions";
    const modalAddBtn = document.createElement("button");
    modalAddBtn.type = "button";
    modalAddBtn.className = "primary-btn";
    modalAddBtn.id = "modalAddBtn";
    modalAddBtn.textContent = "Thêm giỏ";
    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "close-btn";
    closeBtn.id = "closeModalBtn";
    closeBtn.textContent = "Close";

    modalActions.append(modalAddBtn, closeBtn);
    modalBody.append(modalTitle, modalCategory, modalRating, modalStock, modalPrice, modalActions);
    modal.append(modalImg, modalBody);
    modalBackdrop.appendChild(modal);

    shell.append(topbar, toolbar, categoryWrap, grid, modalBackdrop);
    return shell;
}

function formatPrice(value) {
    return value.toLocaleString("vi-VN") + "đ";
}

function renderCategories() {
    categoryBar.textContent = "";
    categories.forEach(category => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `category-btn${state.category === category ? " active" : ""}`;
        button.dataset.category = category;
        button.textContent = category === "all" ? "All" : category;
        categoryBar.appendChild(button);
    });
}

function getFilteredProducts() {
    let list = [...products];

    if (state.category !== "all") {
        list = list.filter(product => product.category === state.category);
    }

    if (state.search.trim()) {
        const keyword = state.search.trim().toLowerCase();
        list = list.filter(product => product.name.toLowerCase().includes(keyword));
    }

    switch (state.sort) {
        case "price-asc":
            list.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            list.sort((a, b) => b.price - a.price);
            break;
        case "name-asc":
            list.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "rating-desc":
            list.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }

    return list;
}

function renderProducts() {
    const list = getFilteredProducts();
    productGrid.textContent = "";

    if (list.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "No products match your search.";
        productGrid.appendChild(empty);
        return;
    }

    list.forEach(product => {
        const card = document.createElement("article");
        card.className = "card";
        card.tabIndex = 0;
        card.dataset.id = product.id;

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const body = document.createElement("div");
        body.className = "card-body";

        const top = document.createElement("div");
        top.className = "card-top";
        const heading = document.createElement("h3");
        heading.textContent = product.name;
        const stock = document.createElement("span");
        stock.className = `stock${product.inStock ? "" : " out"}`;
        stock.textContent = product.inStock ? "In stock" : "Out of stock";
        top.append(heading, stock);

        const category = document.createElement("span");
        category.className = "category-pill";
        category.textContent = product.category;

        const meta = document.createElement("div");
        meta.className = "meta";
        const rating = document.createElement("span");
        rating.textContent = `⭐ ${product.rating}`;
        const label = document.createElement("span");
        label.textContent = `ID ${product.id}`;
        meta.append(rating, label);

        const price = document.createElement("div");
        price.className = "price";
        price.textContent = formatPrice(product.price);

        const actions = document.createElement("div");
        actions.className = "card-actions";
        const addBtn = document.createElement("button");
        addBtn.type = "button";
        addBtn.className = "primary-btn";
        addBtn.dataset.action = "add";
        addBtn.textContent = "Thêm giỏ";
        const viewBtn = document.createElement("button");
        viewBtn.type = "button";
        viewBtn.className = "close-btn";
        viewBtn.dataset.action = "view";
        viewBtn.textContent = "Details";
        actions.append(addBtn, viewBtn);

        body.append(top, category, meta, price, actions);
        card.append(image, body);
        productGrid.appendChild(card);
    });
}

function searchProducts(event) {
    state.search = event.target.value;
    renderProducts();
}

function filterByCategory(category) {
    state.category = category;
    renderCategories();
    renderProducts();
}

function sortProducts(event) {
    state.sort = event.target.value;
    renderProducts();
}

function openModal(product) {
    state.selectedProduct = product;
    modalTitle.textContent = product.name;
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalCategory.textContent = `Category: ${product.category}`;
    modalRating.textContent = `Rating: ${product.rating}`;
    modalStock.textContent = product.inStock ? "In stock" : "Out of stock";
    modalPrice.textContent = formatPrice(product.price);
    modalBackdrop.classList.add("open");
}

function closeModal() {
    state.selectedProduct = null;
    modalBackdrop.classList.remove("open");
}

function addToCart(product) {
    state.cartCount += 1;
    cartBadge.textContent = String(state.cartCount);
    cartBadge.hidden = false;
    state.selectedProduct = product;
}

searchInput.addEventListener("input", searchProducts);
sortSelect.addEventListener("change", sortProducts);
categoryBar.addEventListener("click", (event) => {
    const button = event.target.closest(".category-btn");
    if (!button) {
        return;
    }
    filterByCategory(button.dataset.category);
});

productGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (!card) {
        return;
    }

    const product = products.find(item => String(item.id) === card.dataset.id);
    if (!product) {
        return;
    }

    if (event.target.matches('[data-action="add"]')) {
        addToCart(product);
        return;
    }

    openModal(product);
});

productGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
        return;
    }

    const card = event.target.closest(".card");
    if (!card) {
        return;
    }

    const product = products.find(item => String(item.id) === card.dataset.id);
    if (product) {
        openModal(product);
    }
});

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
closeModalBtn.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) {
        closeModal();
    }
});
modalAddBtn.addEventListener("click", () => {
    if (state.selectedProduct) {
        addToCart(state.selectedProduct);
    }
});

renderCategories();
renderProducts();
cartBadge.hidden = true;
