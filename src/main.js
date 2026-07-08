const loaderEnvelope = document.querySelector(".loader-envelope");

if (loaderEnvelope) {
  let isOpened = false;

  function openInvitation() {
    if (isOpened) return;
    isOpened = true;
    loaderEnvelope.classList.add("is-opening");
    document.body.classList.remove("invite-locked");
    window.setTimeout(() => {
      loaderEnvelope.remove();
    }, 720);
  }

  loaderEnvelope.addEventListener("click", openInvitation);
  window.setTimeout(openInvitation, 5000);
}

const countdown = document.querySelector(".countdown");

if (countdown) {
  const target = new Date(countdown.dataset.weddingDate).getTime();
  const daysEl = document.querySelector("#days");
  const hoursEl = document.querySelector("#hours");
  const minutesEl = document.querySelector("#minutes");
  const secondsEl = document.querySelector("#seconds");

  function updateCountdown() {
    const diff = Math.max(0, target - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

const form = document.querySelector("#rsvp-form");
const note = document.querySelector("#form-note");
const plusOneCheckbox = document.querySelector("#plus-one");
const plusOneField = document.querySelector(".plus-one-field");
const plusOneInput = plusOneField?.querySelector("input");

plusOneCheckbox?.addEventListener("change", () => {
  const isChecked = plusOneCheckbox.checked;
  plusOneField.hidden = !isChecked;
  plusOneInput.required = isChecked;
  if (!isChecked) {
    plusOneInput.value = "";
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  plusOneField.hidden = true;
  plusOneInput.required = false;
  note.textContent = "Дякуємо, відповідь збережено локально для демо.";
});
