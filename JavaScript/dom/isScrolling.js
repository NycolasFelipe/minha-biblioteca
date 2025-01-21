/**
 * This function checks if the user is currently scrolling in the browser window.
 * It takes an optional millisecond threshold (`ms`) to define how recent a scroll
 * event is considered "current scrolling".
 * 
 * @param {number} ms [Optional]: A threshold in milliseconds to define how recent a scroll
 * event is considered "current scrolling". Default is 200ms.
 * @returns {boolean}
 * 
 * @example
 * // Assuming this code is inside a browser environment
 * const isUserScrolling = isScrolling(); // Check for current scrolling
 * 
 * if (isUserScrolling) {
 *   console.log("User is currently scrolling!");
 * } else {
 *   console.log("User is not currently scrolling.");
 * }
 * 
 * @author Nycolas Felipe
 */
const isScrolling = (ms = 200) => {
  if (typeof window.lastScrollTime !== "undefined") {
    return window.lastScrollTime && new Date().getTime() < window.lastScrollTime + ms;
  }
}

export default isScrolling;