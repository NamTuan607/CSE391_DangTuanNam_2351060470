const images = [
    { src: "https://placehold.co/1200x800/2563eb/ffffff?text=Gallery+1", title: "Ocean Blue", description: "Arrow keys navigate, numbers jump, space toggles slideshow." },
    { src: "https://placehold.co/1200x800/0f766e/ffffff?text=Gallery+2", title: "Forest Green", description: "Use keyboard shortcuts to move around quickly." },
    { src: "https://placehold.co/1200x800/7c3aed/ffffff?text=Gallery+3", title: "Purple Light", description: "Accessible controls and visible focus rings are included." },
    { src: "https://placehold.co/1200x800/f59e0b/ffffff?text=Gallery+4", title: "Amber Glow", description: "Escape closes the modal or the command palette." },
    { src: "https://placehold.co/1200x800/ef4444/ffffff?text=Gallery+5", title: "Crimson Grid", description: "Ctrl+K opens the command palette overlay." },
];

const commands = [
    { label: "Open first image", action: () => setImage(0) },
    { label: "Open last image", action: () => setImage(images.length - 1) },
    { label: "Toggle slideshow", action: () => togglePlay() },
    { label: "Show modal", action: () => openModal() },
    { label: "Close overlays", action: () => closeAllOverlays() },
];

const state = {
    index: 0,
    playing: false,
    timer: null,
    paletteOpen: false,
    modalOpen: false,
    commandIndex: 0,
    filteredCommands: commands,
};

const app = document.querySelector("#app");
app.appendChild(buildShell());

const heroImage = document.querySelector("#heroImage");
const captionTitle = document.querySelector("#captionTitle");
const captionText = document.querySelector("#captionText");
const thumbs = document.querySelector("#thumbs");
const playToggle = document.querySelector("#playToggle");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalClose = document.querySelector("#modalClose");
const paletteBackdrop = document.querySelector("#paletteBackdrop");
const paletteInput = document.querySelector("#paletteInput");
const commandList = document.querySelector("#commandList");

function buildShell() {
    const shell = document.createElement("div");
    shell.className = "shell";

    const header = document.createElement("header");
    header.className = "header";
    const titleBlock = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = "Keyboard App";
    const subtitle = document.createElement("p");
    subtitle.textContent = "A compact gallery with shortcuts, modal, and a VS Code-style command palette.";
    titleBlock.append(title, subtitle);

    const toolbar = document.createElement("div");
    toolbar.className = "toolbar";
    const openPaletteBtn = document.createElement("button");
    openPaletteBtn.type = "button";
    openPaletteBtn.className = "button";
    openPaletteBtn.textContent = "Ctrl+K Command Palette";
    openPaletteBtn.setAttribute("aria-label", "Open command palette");
    openPaletteBtn.addEventListener("click", openPalette);

    const openModalBtn = document.createElement("button");
    openModalBtn.type = "button";
    openModalBtn.className = "button";
    openModalBtn.textContent = "Open Modal";
    openModalBtn.setAttribute("aria-label", "Open image modal");
    openModalBtn.addEventListener("click", openModal);

    toolbar.append(openPaletteBtn, openModalBtn);
    header.append(titleBlock, toolbar);

    const grid = document.createElement("section");
    grid.className = "grid";

    const gallery = document.createElement("section");
    gallery.className = "gallery";
    gallery.setAttribute("aria-label", "Image gallery");

    const hero = document.createElement("div");
    hero.className = "gallery-hero";
    const heroImage = document.createElement("img");
    heroImage.id = "heroImage";
    heroImage.alt = "Gallery image";
    hero.appendChild(heroImage);

    const caption = document.createElement("div");
    caption.className = "gallery-caption";
    const captionLeft = document.createElement("div");
    const captionTitle = document.createElement("strong");
    captionTitle.id = "captionTitle";
    const captionText = document.createElement("div");
    captionText.id = "captionText";
    captionLeft.append(captionTitle, captionText);

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.className = "play-toggle";
    playButton.id = "playToggle";
    playButton.textContent = "Play";
    playButton.setAttribute("aria-label", "Toggle slideshow");

    caption.append(captionLeft, playButton);

    const thumbsWrap = document.createElement("div");
    thumbsWrap.className = "thumbs";
    thumbsWrap.id = "thumbs";

    gallery.append(hero, caption, thumbsWrap);

    const help = document.createElement("aside");
    help.className = "help-panel";
    const helpTitle = document.createElement("h2");
    helpTitle.textContent = "Keyboard shortcuts";
    const helpList = document.createElement("ul");
    [
        "Arrow Left / Right: move between images",
        "1-9: jump to image",
        "Space: play/pause slideshow",
        "Escape: close modal or command palette",
        "Ctrl+K: open command palette",
    ].forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        helpList.appendChild(li);
    });
    help.append(helpTitle, helpList);

    grid.append(gallery, help);

    const modalBackdrop = document.createElement("div");
    modalBackdrop.className = "modal-backdrop";
    modalBackdrop.id = "modalBackdrop";
    const modal = document.createElement("div");
    modal.className = "modal";
    const modalImg = document.createElement("img");
    modalImg.id = "modalImage";
    modalImg.alt = "Expanded gallery image";
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    const modalTitle = document.createElement("h2");
    modalTitle.id = "modalTitle";
    const modalClose = document.createElement("button");
    modalClose.type = "button";
    modalClose.className = "close";
    modalClose.id = "modalClose";
    modalClose.textContent = "Close";
    modalClose.setAttribute("aria-label", "Close modal");
    modalBody.append(modalTitle, modalClose);
    modal.append(modalImg, modalBody);
    modalBackdrop.appendChild(modal);

    const paletteBackdrop = document.createElement("div");
    paletteBackdrop.className = "palette-backdrop";
    paletteBackdrop.id = "paletteBackdrop";
    const palettePanel = document.createElement("div");
    palettePanel.className = "command-panel";
    const paletteInput = document.createElement("input");
    paletteInput.id = "paletteInput";
    paletteInput.className = "palette-input";
    paletteInput.type = "search";
    paletteInput.placeholder = "Type a command...";
    paletteInput.setAttribute("aria-label", "Command palette search");
    const commandList = document.createElement("div");
    commandList.className = "command-list";
    commandList.id = "commandList";
    palettePanel.append(paletteInput, commandList);
    paletteBackdrop.appendChild(palettePanel);

    shell.append(header, grid, modalBackdrop, paletteBackdrop);
    return shell;
}

function renderGallery() {
    heroImage.src = images[state.index].src;
    captionTitle.textContent = `${state.index + 1}. ${images[state.index].title}`;
    captionText.textContent = images[state.index].description;
    thumbs.textContent = "";

    images.forEach((image, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `thumb${index === state.index ? " active" : ""}`;
        button.dataset.index = index;
        button.setAttribute("aria-label", `Open ${image.title}`);
        const thumbImage = document.createElement("img");
        thumbImage.src = image.src;
        thumbImage.alt = image.title;
        button.appendChild(thumbImage);
        thumbs.appendChild(button);
    });
}

function setImage(index) {
    state.index = (index + images.length) % images.length;
    renderGallery();
    if (state.modalOpen) {
        updateModal();
    }
}

function nextImage() {
    setImage(state.index + 1);
}

function previousImage() {
    setImage(state.index - 1);
}

function togglePlay() {
    state.playing = !state.playing;
    playToggle.textContent = state.playing ? "Pause" : "Play";
    if (state.playing) {
        state.timer = setInterval(nextImage, 2500);
    } else {
        clearInterval(state.timer);
        state.timer = null;
    }
}

function updateModal() {
    modalImage.src = images[state.index].src;
    modalImage.alt = images[state.index].title;
    modalTitle.textContent = images[state.index].title;
}

function openModal() {
    state.modalOpen = true;
    updateModal();
    modalBackdrop.classList.add("open");
}

function closeModal() {
    state.modalOpen = false;
    modalBackdrop.classList.remove("open");
}

function openPalette() {
    state.paletteOpen = true;
    state.commandIndex = 0;
    paletteBackdrop.classList.add("open");
    filterCommands("");
    paletteInput.focus();
}

function closePalette() {
    state.paletteOpen = false;
    paletteBackdrop.classList.remove("open");
    paletteInput.value = "";
}

function closeAllOverlays() {
    closeModal();
    closePalette();
}

function filterCommands(query) {
    const term = query.trim().toLowerCase();
    state.filteredCommands = commands.filter(command => command.label.toLowerCase().includes(term));
    state.commandIndex = 0;
    renderCommands();
}

function renderCommands() {
    commandList.textContent = "";
    if (state.filteredCommands.length === 0) {
        const empty = document.createElement("div");
        empty.textContent = "No commands found.";
        commandList.appendChild(empty);
        return;
    }

    state.filteredCommands.forEach((command, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `command-item${index === state.commandIndex ? " active" : ""}`;
        button.dataset.index = index;
        button.textContent = command.label;
        commandList.appendChild(button);
    });
}

function runCommand(index) {
    const command = state.filteredCommands[index];
    if (!command) {
        return;
    }
    command.action();
    closePalette();
}

renderGallery();
renderCommands();

thumbs.addEventListener("click", (event) => {
    const button = event.target.closest(".thumb");
    if (!button) {
        return;
    }
    setImage(Number(button.dataset.index));
});

playToggle.addEventListener("click", togglePlay);
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", event => {
    if (event.target === modalBackdrop) {
        closeModal();
    }
});
paletteBackdrop.addEventListener("click", event => {
    if (event.target === paletteBackdrop) {
        closePalette();
    }
});
paletteInput.addEventListener("input", event => filterCommands(event.target.value));
commandList.addEventListener("click", event => {
    const button = event.target.closest(".command-item");
    if (!button) {
        return;
    }
    runCommand(Number(button.dataset.index));
});

window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
        return;
    }

    if (state.paletteOpen) {
        if (event.key === "Escape") {
            closePalette();
            return;
        }
        if (event.key === "ArrowDown") {
            state.commandIndex = Math.min(state.commandIndex + 1, Math.max(state.filteredCommands.length - 1, 0));
            renderCommands();
            return;
        }
        if (event.key === "ArrowUp") {
            state.commandIndex = Math.max(state.commandIndex - 1, 0);
            renderCommands();
            return;
        }
        if (event.key === "Enter") {
            runCommand(state.commandIndex);
            return;
        }
    }

    if (event.key === "Escape") {
        closeAllOverlays();
    } else if (event.key === "ArrowRight") {
        nextImage();
    } else if (event.key === "ArrowLeft") {
        previousImage();
    } else if (event.key === " ") {
        event.preventDefault();
        togglePlay();
    } else if (/^[1-9]$/.test(event.key)) {
        const number = Number(event.key) - 1;
        if (number < images.length) {
            setImage(number);
        }
    }
});
