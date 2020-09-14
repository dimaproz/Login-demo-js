function getContainer() {
  return document.querySelector(".notifications-container");
}
function getAlertLength() {
  return document.querySelectorAll(".notifications-container .alert").length;
}
function alertTemplate(msg, className, index) {
  return `
        <div class="alert ${className}" data-index="${index}">${msg}</div>
    `;
}

function notifyContainerTemplate() {
  return `<div class="notifications-container" style="position: fixed; top: 10px; right: 10px; z-index: 99;"></div>`;
}
function createNotifyContainer() {
  const template = notifyContainerTemplate();
  document.body.insertAdjacentHTML("beforeend", template);
}
export function notify({
  msg = "invalid message",
  className = "alert-warning",
  timeout = 2000,
} = {}) {
  if (!getContainer()) {
    createNotifyContainer();
  }
  const index = getAlertLength();
  const template = alertTemplate(msg, className, index);
  const container = getContainer();
  container.insertAdjacentHTML("beforeend", template);

  setTimeout(() => closeNotify(index), timeout);
}

export function closeNotify(index) {
  let alert;

  if (index === undefined) {
    alert = document.querySelector(".notifications-container .alert");
  } else {
    alert = document.querySelector(
      `.notifications-container .alert[data-index="${index}"]`
    );
  }

  if (!alert) {
    console.warn("Alert not found!");
    return;
  }

  const container = getContainer();
  container.removeChild(alert);
}
