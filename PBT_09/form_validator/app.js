const app = document.querySelector("#app");

app.appendChild(buildForm());

const elements = {
    form: document.querySelector("#registerForm"),
    name: document.querySelector("#name"),
    nameStatus: document.querySelector("#nameStatus"),
    email: document.querySelector("#email"),
    emailError: document.querySelector("#emailError"),
    password: document.querySelector("#password"),
    passwordBar: document.querySelector("#passwordBar"),
    passwordLabel: document.querySelector("#passwordLabel"),
    confirm: document.querySelector("#confirm"),
    confirmStatus: document.querySelector("#confirmStatus"),
    phone: document.querySelector("#phone"),
    submit: document.querySelector("#submitBtn"),
    modalBackdrop: document.querySelector("#modalBackdrop"),
    modalClose: document.querySelector("#modalClose"),
    modalSummary: document.querySelector("#modalSummary"),
};

function buildForm() {
    const card = document.createElement("section");
    card.className = "card";

    const header = document.createElement("header");
    header.className = "header";
    const heading = document.createElement("h1");
    heading.textContent = "Real-time Form Validator";
    const description = document.createElement("p");
    description.textContent = "Validate every field as you type, with a strong password meter and a success modal.";
    header.append(heading, description);

    const form = document.createElement("form");
    form.id = "registerForm";
    form.className = "form-grid";

    form.append(
        createField("Name", "name", "text", "2-50 characters", true),
        createField("Email", "email", "email", "name@example.com", true),
        createPasswordField(),
        createField("Confirm Password", "confirm", "password", "Re-enter password", true),
        createField("Phone", "phone", "tel", "0901-234-567", true),
    );

    const actions = document.createElement("div");
    actions.className = "actions";

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.id = "submitBtn";
    submitBtn.className = "primary";
    submitBtn.disabled = true;
    submitBtn.textContent = "Submit";

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "secondary";
    resetBtn.textContent = "Reset";

    actions.append(submitBtn, resetBtn);
    form.append(actions);

    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBackdrop.id = "modalBackdrop";

    const modal = document.createElement("div");
    modal.className = "modal";

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Đăng ký thành công!";
    const modalSummary = document.createElement("div");
    modalSummary.className = "summary";
    modalSummary.id = "modalSummary";

    const modalClose = document.createElement("button");
    modalClose.type = "button";
    modalClose.className = "primary";
    modalClose.id = "modalClose";
    modalClose.textContent = "Close";

    modal.append(modalTitle, modalSummary, modalClose);
    modalBackdrop.appendChild(modal);

    card.append(header, form, modalBackdrop);
    return card;
}

function createField(labelText, id, type, placeholder, showStatus = false) {
    const field = document.createElement("div");
    field.className = "field";

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.id = id;
    input.type = type;
    input.placeholder = placeholder;
    input.setAttribute("aria-label", labelText);

    const helper = document.createElement("div");
    helper.className = showStatus ? "inline-status" : "error";
    helper.id = `${id}${showStatus ? "Status" : "Error"}`;

    field.append(label, input, helper);
    return field;
}

function createPasswordField() {
    const field = document.createElement("div");
    field.className = "field";

    const label = document.createElement("label");
    label.setAttribute("for", "password");
    label.textContent = "Password";

    const input = document.createElement("input");
    input.id = "password";
    input.type = "password";
    input.placeholder = "Enter password";
    input.setAttribute("aria-label", "Password");

    const meter = document.createElement("div");
    meter.className = "password-meter";
    const bar = document.createElement("div");
    bar.className = "password-bar";
    bar.id = "passwordBar";
    meter.appendChild(bar);

    const labelText = document.createElement("div");
    labelText.className = "meter-label";
    labelText.id = "passwordLabel";
    labelText.textContent = "Yếu";

    field.append(label, input, meter, labelText);
    return field;
}

function validateName() {
    const value = elements.name.value.trim();
    const valid = value.length >= 2 && value.length <= 50;
    elements.nameStatus.textContent = valid ? "✅ Valid name" : "❌ 2-50 characters required";
    elements.nameStatus.className = `inline-status ${valid ? "success" : ""}`;
    return valid;
}

function validateEmail() {
    const value = elements.email.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
        elements.emailError.textContent = "Email is required.";
        return false;
    }
    if (!regex.test(value)) {
        elements.emailError.textContent = "Please enter a valid email address.";
        return false;
    }
    elements.emailError.textContent = "";
    return true;
}

function scorePassword(value) {
    let score = 0;
    if (value.length >= 8) score += 1;
    if (/[a-z]/.test(value)) score += 1;
    if (/[A-Z]/.test(value)) score += 1;
    if (/[0-9]/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    return score;
}

function validatePassword() {
    const value = elements.password.value;
    const score = scorePassword(value);
    const width = [0, 20, 40, 60, 80, 100][score];
    const colors = ["#e11d48", "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#059669"];
    const labels = ["Yếu", "Rất yếu", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];

    elements.passwordBar.style.width = `${width}%`;
    elements.passwordBar.style.background = colors[score];
    elements.passwordLabel.textContent = labels[score];

    return score >= 3;
}

function validateConfirm() {
    const valid = elements.confirm.value.length > 0 && elements.confirm.value === elements.password.value;
    elements.confirmStatus.textContent = valid ? "✅ Passwords match" : "❌ Passwords do not match";
    elements.confirmStatus.className = `inline-status ${valid ? "success" : ""}`;
    return valid;
}

function formatPhoneInput(value) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const parts = [digits.slice(0, 4), digits.slice(4, 7), digits.slice(7, 10)].filter(Boolean);
    return parts.join("-");
}

function validatePhone() {
    const digits = elements.phone.value.replace(/\D/g, "");
    return digits.length === 10;
}

function updateSubmitState() {
    const isValid = validateName() && validateEmail() && validatePassword() && validateConfirm() && validatePhone();
    elements.submit.disabled = !isValid;
}

function showModal() {
    const summary = [
        `Name: ${elements.name.value.trim()}`,
        `Email: ${elements.email.value.trim()}`,
        `Phone: ${elements.phone.value}`,
    ];
    elements.modalSummary.textContent = "";
    summary.forEach(line => {
        const item = document.createElement("div");
        item.textContent = line;
        elements.modalSummary.appendChild(item);
    });
    elements.modalBackdrop.classList.add("open");
}

function hideModal() {
    elements.modalBackdrop.classList.remove("open");
}

[elements.name, elements.email, elements.password, elements.confirm].forEach(input => {
    input.addEventListener("input", () => {
        if (input === elements.name) {
            validateName();
        } else if (input === elements.email) {
            validateEmail();
        } else if (input === elements.password) {
            validatePassword();
            validateConfirm();
        } else if (input === elements.confirm) {
            validateConfirm();
        }
        updateSubmitState();
    });
});

elements.phone.addEventListener("input", (event) => {
    const formatted = formatPhoneInput(event.target.value);
    event.target.value = formatted;
    updateSubmitState();
});

elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!elements.submit.disabled) {
        showModal();
    }
});

elements.modalClose.addEventListener("click", hideModal);
elements.modalBackdrop.addEventListener("click", (event) => {
    if (event.target === elements.modalBackdrop) {
        hideModal();
    }
});

elements.form.querySelector(".secondary").addEventListener("click", () => {
    elements.form.reset();
    elements.nameStatus.textContent = "";
    elements.emailError.textContent = "";
    elements.confirmStatus.textContent = "";
    elements.passwordBar.style.width = "0";
    elements.passwordLabel.textContent = "Yếu";
    updateSubmitState();
});

updateSubmitState();
