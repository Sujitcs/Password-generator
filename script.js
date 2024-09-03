const passwordBox = document.getElementById("password");
const lengthDisplay = document.getElementById("lengthDisplay");
const lengthSlider = document.getElementById("lengthSlider");
const similarChars = "iI1loO0";

// Character sets
const charSets = {
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbols: "@#$%^&*()+-_=?<>/|{}[]"
};

// Update the password length display when the slider is adjusted
lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

function createPassword() {
  const length = parseInt(lengthSlider.value, 10);
  const includeSymbols = document.getElementById("includeSymbols").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeLowercase = document.getElementById("includeLowercase").checked;
  const includeUppercase = document.getElementById("includeUppercase").checked;
  const excludeDuplicates = document.getElementById("excludeDuplicates").checked;
  const excludeSimilar = document.getElementById("excludeSimilar").checked;

  let availableChars = "";

  // Build the character set based on user preferences
  if (includeUppercase) availableChars += charSets.upperCase;
  if (includeLowercase) availableChars += charSets.lowerCase;
  if (includeNumbers) availableChars += charSets.number;
  if (includeSymbols) availableChars += charSets.symbols;

  // Exclude similar characters if selected
  if (excludeSimilar) {
    availableChars = [...availableChars].filter(char => !similarChars.includes(char)).join("");
  }

  // Check if we have at least one character to choose from
  if (!availableChars.length || length <= 0) {
    passwordBox.value = "Unable to create a password with the current settings.";
    return;
  }

  // Generate password
  let password = "";
  const usedChars = new Set();
  
  for (let i = 0; i < length; i++) {
    let randomChar;
    
    do {
      randomChar = availableChars[Math.floor(Math.random() * availableChars.length)];
    } while (excludeDuplicates && usedChars.has(randomChar));

    password += randomChar;
    usedChars.add(randomChar);
  }

  passwordBox.value = password;
}

function copyPassword() {
  passwordBox.select();
  document.execCommand("copy");

  // Show "Copied!" notification
  const copiedNotification = document.createElement("div");
  copiedNotification.innerText = "Copied!";
  copiedNotification.classList.add("copied-notification");
  document.body.appendChild(copiedNotification);

  // Remove the notification after 1.5 seconds
  setTimeout(() => copiedNotification.remove(), 1500);
}
