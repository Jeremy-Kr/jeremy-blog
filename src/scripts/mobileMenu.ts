const menuToggle = document.getElementById("menu-toggle") as HTMLButtonElement | null;
const mobileMenu = document.getElementById("mobile-menu") as HTMLDivElement | null;
const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop") as HTMLDivElement | null;
const closeMenu = document.getElementById("close-menu") as HTMLButtonElement | null;

function openMenu(): void {
  if (mobileMenu && mobileMenuBackdrop) {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenuBackdrop.classList.remove("hidden");
  }
}

function closeMenuFunc(): void {
  if (mobileMenu && mobileMenuBackdrop) {
    mobileMenu.classList.add("translate-x-full");
    mobileMenuBackdrop.classList.add("hidden");
  }
}

if (menuToggle && mobileMenu && mobileMenuBackdrop && closeMenu) {
  menuToggle.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeMenuFunc);
  mobileMenuBackdrop.addEventListener("click", closeMenuFunc);
}

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeMenuFunc();
  }
});