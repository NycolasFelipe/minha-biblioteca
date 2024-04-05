export default function isScrolling(ms = 200) {
  if (typeof window.lastScrollTime !== "undefined") {
    return window.lastScrollTime && new Date().getTime() < window.lastScrollTime + ms;
  }
}
