const USER_KEY = "username";
const PASS_KEY = "password";

const userInput = document.querySelector("#username");
const passInput = document.querySelector("#password");
const saveBtn = document.querySelector("#saveBtn");

userInput.value = localStorage.getItem(USER_KEY) || "";
passInput.value = localStorage.getItem(PASS_KEY) || "";

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem(USER_KEY, userInput.value);
  localStorage.setItem(PASS_KEY, passInput.value);
});