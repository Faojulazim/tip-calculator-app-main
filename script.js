const tipAmountField = document.getElementById("tipAmountField");
const totalPersonField = document.getElementById("totalPersonField");
const billField = document.getElementById("billField");
const customField = document.getElementById("customField");
const peopleField = document.getElementById("peopleField");
const tipAll = document.querySelectorAll("button#tipBtn");
const form = document.querySelector("form");
let value = null;

//function to validate the bill and people Field
function validation() {
  let isValid = true;
  const peopleFieldValue = peopleField.value;
  const billFieldValue = billField.value;
  if (!billFieldValue.length) {
    isValid = false;
    billField.parentElement.parentElement.lastElementChild.classList.remove(
      "hidden"
    );
    tipAmountField.innerText = "$0.00";
    totalPersonField.innerText = "$0.00";
  } else if (billFieldValue < 1) {
    isValid = false;
    billField.parentElement.parentElement.lastElementChild.classList.remove(
      "hidden"
    );
    tipAmountField.innerText = "$0.00";
    totalPersonField.innerText = "$0.00";
  } else {
    billField.parentElement.parentElement.lastElementChild.classList.add(
      "hidden"
    );
  }
  if (!peopleFieldValue.length) {
    isValid = false;
    peopleField.parentElement.parentElement.lastElementChild.classList.remove(
      "hidden"
    );
    tipAmountField.innerText = "$0.00";
    totalPersonField.innerText = "$0.00";
  } else if (peopleFieldValue < 1) {
    isValid = false;
    peopleField.parentElement.parentElement.lastElementChild.classList.remove(
      "hidden"
    );
    tipAmountField.innerText = "$0.00";
    totalPersonField.innerText = "$0.00";
  } else {
    peopleField.parentElement.parentElement.lastElementChild.classList.add(
      "hidden"
    );
  }
  return isValid;
}

//if customField is clicked then change the styles of tipAll and change the value to null
customField.addEventListener("click", (e) => {
  if (!customField.value.length) {
    customField.parentElement.parentElement
      .querySelector("p")
      .classList.remove("hidden");
    customField.parentElement.parentElement.querySelector("p").innerText =
      "Can't be empty";
  }
  tipAll.forEach((elem) => {
    if (elem.classList.contains("bg-StrongCyan")) {
      elem.classList.remove("bg-StrongCyan");
      elem.classList.add("hover:text-VeryDarkCyan");
      elem.classList.add("bg-VeryDarkCyan");
      elem.classList.remove("text-VeryDarkCyan");
      elem.classList.add("hover:bg-StrongCyan");
      value = null;
    }
  });
});

//logic for clicking the buttons
tipAll.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    value = elem.innerText;
    validation();
    getData();
    customField.value = "";

    elem.classList.add("bg-StrongCyan");
    elem.classList.remove("hover:text-VeryDarkCyan");
    elem.classList.remove("bg-VeryDarkCyan");
    elem.classList.add("text-VeryDarkCyan");
    elem.classList.add("hover:bg-StrongCyan");
    tipAll.forEach((anotherElem) => {
      if (elem !== anotherElem) {
        anotherElem.classList.add("hover:bg-StrongCyan");
        anotherElem.classList.remove("bg-StrongCyan");
        anotherElem.classList.add("hover:text-VeryDarkCyan");
        anotherElem.classList.add("bg-VeryDarkCyan");
        anotherElem.classList.remove("text-VeryDarkCyan");
      }
    });
  });
});

//change the value as per the value availability
function changeData(value) {
  if (validation()) {
    validation();
    const equationPrimary = billField.value * (value / 100);
    const equationSecondary =
      parseFloat(billField.value) + parseFloat(equationPrimary);
    const equationThird =
      parseFloat(equationSecondary) / parseFloat(peopleField.value);
    tipAmountField.innerText = isNaN(equationThird)
      ? `$${equationPrimary.toFixed(2)}`
      : `$${equationThird.toFixed(2)}`;
    totalPersonField.innerText =
      isNaN(equationPrimary / peopleField.value) ||
      !isFinite(equationPrimary / peopleField.value)
        ? `$0.00`
        : `$${(equationPrimary / peopleField.value).toFixed(2)}`;
  }
}

//if value is present (button is clicked) if not then the customField value will be used
function getData() {
  const customFieldValue = customField.value;
  if (value) {
    changeData(value);
    customField.parentElement.parentElement
      .querySelector("p")
      .classList.add("hidden");
  } else {
    if (!customFieldValue.length) {
      customField.parentElement.parentElement
        .querySelector("p")
        .classList.remove("hidden");
      customField.parentElement.parentElement.querySelector("p").innerText =
        "Can't be empty";
      tipAmountField.innerText = `$0.00`;
      totalPersonField.innerText = `$0.00`;
    } else if (customFieldValue < 1) {
      customField.parentElement.parentElement
        .querySelector("p")
        .classList.remove("hidden");
      customField.parentElement.parentElement.querySelector("p").innerText =
        "Invalid Value";
      tipAmountField.innerText = "$0.00";
      totalPersonField.innerText = "$0.00";
    } else if (customFieldValue > 100) {
      customField.parentElement.parentElement
        .querySelector("p")
        .classList.remove("hidden");
      customField.parentElement.parentElement.querySelector("p").innerText =
        "Invalid Value";
      tipAmountField.innerText = "$0.00";
      totalPersonField.innerText = "$0.00";
    } else {
      customField.parentElement.parentElement
        .querySelector("p")
        .classList.add("hidden");
      changeData(customField.value);
    }
  }
}

//input event listener for every input field
form.addEventListener("input", (e) => {
  validation();
  getData();
});
billField.addEventListener("input", (e) => {
  validation();
  getData();
});
customField.addEventListener("input", (e) => {
  validation();
  getData();
});
peopleField.addEventListener("input", (e) => {
  validation();
  getData();
});
