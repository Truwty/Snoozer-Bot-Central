const notice = document.querySelector("[data-cookie-notice]");
const dialog = document.querySelector("[data-cookie-dialog]");

document.querySelectorAll("[data-dismiss-notice]").forEach((button) => {
  button.addEventListener("click", () => {
    notice?.setAttribute("hidden", "");
  });
});

document.querySelectorAll("[data-open-cookie-info]").forEach((button) => {
  button.addEventListener("click", () => {
    if (dialog instanceof HTMLDialogElement) dialog.showModal();
  });
});

document.querySelectorAll("[data-close-cookie-info]").forEach((button) => {
  button.addEventListener("click", () => {
    if (dialog instanceof HTMLDialogElement) dialog.close();
  });
});

if (dialog instanceof HTMLDialogElement) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
