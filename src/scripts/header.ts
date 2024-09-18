let lastScrollTop = 0;
const header = document.getElementById("header") as HTMLElement | null;

window.addEventListener("scroll", () => {
  const scrollTop =  window.scrollY || document.documentElement.scrollTop;
  if (header) {
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
  }
  lastScrollTop = scrollTop;
});