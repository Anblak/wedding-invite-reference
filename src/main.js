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
const plusOneRadios = form ? Array.from(form.querySelectorAll('[name="plus_one"]')) : [];
const plusOneField = document.querySelector(".plus-one-field");
const plusOneInput = plusOneField?.querySelector("input");
const submitButton = form?.querySelector('button[type="submit"]');
const nameInput = form?.querySelector('[name="name"]');
const phoneInput = form?.querySelector('[name="phone"]');

function validateName(input, emptyMessage) {
  const value = input.value.trim();

  if (!value) {
    input.setCustomValidity(emptyMessage);
  } else if (value.length < 2) {
    input.setCustomValidity("Введіть щонайменше 2 символи.");
  } else {
    input.setCustomValidity("");
  }
}

function validatePhone() {
  const value = phoneInput.value.trim();
  const digitCount = value.replace(/\D/g, "").length;
  const hasValidCharacters = /^\+?[0-9\s()-]+$/.test(value);

  if (!value) {
    phoneInput.setCustomValidity("Введіть номер телефону.");
  } else if (!hasValidCharacters) {
    phoneInput.setCustomValidity("Номер може містити лише цифри, пробіли, +, дужки та дефіси.");
  } else if (digitCount < 10 || digitCount > 15) {
    phoneInput.setCustomValidity("Номер телефону має містити від 10 до 15 цифр.");
  } else {
    phoneInput.setCustomValidity("");
  }
}

function validateForm() {
  nameInput.value = nameInput.value.trim();
  phoneInput.value = phoneInput.value.trim();
  plusOneInput.value = plusOneInput.value.trim();

  validateName(nameInput, "Введіть прізвище та ім’я.");
  validatePhone();

  const plusOneValue = form.querySelector('[name="plus_one"]:checked')?.value;
  plusOneRadios[0].setCustomValidity(plusOneValue ? "" : "Оберіть один із варіантів.");

  if (plusOneValue === "yes") {
    validateName(plusOneInput, "Введіть прізвище та ім’я гостя.");
  } else {
    plusOneInput.setCustomValidity("");
  }

  return form.checkValidity();
}

nameInput?.addEventListener("input", () => validateName(nameInput, "Введіть прізвище та ім’я."));
phoneInput?.addEventListener("input", validatePhone);
plusOneInput?.addEventListener("input", () => validateName(plusOneInput, "Введіть прізвище та ім’я гостя."));

function updatePlusOneField() {
  const hasGuest = form.querySelector('[name="plus_one"]:checked')?.value === "yes";
  plusOneField.hidden = !hasGuest;
  plusOneInput.required = hasGuest;

  if (!hasGuest) {
    plusOneInput.value = "";
    plusOneInput.setCustomValidity("");
  }
}

plusOneRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    plusOneRadios[0].setCustomValidity("");
    updatePlusOneField();
  });
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  note.textContent = "";
  if (!validateForm()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  submitButton.disabled = true;
  note.textContent = "Надсилаємо відповідь...";

  try {
    await fetch(form.dataset.googleFormUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "entry.1548962289": formData.get("name"),
        "entry.235034788": formData.get("phone"),
        "entry.1709636242": formData.get("plus_one") === "yes" ? "Так" : "Ні",
        "entry.673450889": formData.get("guest") || "",
        "entry.1529608173": formData.get("message") || "",
      }),
    });

    form.reset();
    updatePlusOneField();
    note.textContent = "Дякуємо! Вашу відповідь надіслано.";
  } catch (error) {
    console.error(error);
    note.textContent = "Не вдалося надіслати відповідь. Перевірте з’єднання та спробуйте ще раз.";
  } finally {
    submitButton.disabled = false;
  }
});
