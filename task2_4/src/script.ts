const firstName: HTMLInputElement | null = document.querySelector(".input-first");
const lastName: HTMLInputElement | null = document.querySelector(".input-last");
const email: HTMLInputElement | null = document.querySelector(".input-email");
const password: HTMLInputElement | null = document.querySelector(".input-pass");
const confirmPass: HTMLInputElement | null = document.querySelector(".input-confirm");
const income: HTMLInputElement | null = document.querySelector(".input-income");
const age: HTMLInputElement | null = document.querySelector(".input-age");
const bio: HTMLInputElement | null = document.querySelector(".bio__content");

class Validator {
  static isEmail(input: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  }

  static isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    return passwordRegex.test(password);
  }

  static isPasswordMatch(password: string, confirmPass: string): boolean {
    return password === confirmPass;
  }

  static minLength(input: string, length: number): boolean {
    return input.length >= length;
  }

  static isValidIncome(income: string): boolean {
    const validOptions = ["Employed", "Unemployed"];
    return validOptions.includes(income);
  }

  static isAge(input: number): boolean {
    return input != null;
  }

  static isAdult(input: number) {
    return input > 17;
  }
}

class Validation {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPass: string;
  income: string;
  age: number | null;
  bio: string;

  constructor(
    firstName: HTMLInputElement | null,
    lastName: HTMLInputElement | null,
    email: HTMLInputElement | null,
    password: HTMLInputElement | null,
    confirmPass: HTMLInputElement | null,
    income: HTMLInputElement | null,
    age: HTMLInputElement | null,
    bio: HTMLInputElement | null
  ) {
    this.firstName = firstName ? firstName.value : "";
    this.lastName = lastName ? lastName.value : "";
    this.email = email ? email.value : "";
    this.password = password ? password.value : "";
    this.confirmPass = confirmPass ? confirmPass.value : "";
    this.income = income ? income.value : "";
    this.age = age ? parseInt(age.value, 10) : null;
    this.bio = bio ? bio.value : "";
  }

  checkName(inputElement: HTMLInputElement | null): void {
    if (inputElement && !Validator.minLength(inputElement.value, 3)) {
      this.showError(inputElement, "Enter 3 or more characters");
    } else if (inputElement) {
      this.clearError(inputElement);
    }
  }

  checkEmail(inputElement: HTMLInputElement | null): void {
    if (inputElement && !Validator.isEmail(inputElement.value)) {
      this.showError(inputElement, "Enter a valid email address");
    } else if (inputElement) {
      this.clearError(inputElement);
    }
  }

  checkPassword(
    password: HTMLInputElement | null,
    confirmPass: HTMLInputElement | null
  ): void {
    if (password && !Validator.isPasswordValid(password.value)) {
      this.showError(
        password,
        "Password must be at least 6 characters, include an upCcase letter, a lowCase letter, and Num"
      );
      if (confirmPass) {
        confirmPass.value = "";
      }
    } else if (
      password &&
      confirmPass &&
      !Validator.isPasswordMatch(password.value, confirmPass.value)
    ) {
      this.showError(confirmPass, "Passwords do not match");
      if (password) this.clearError(password);
    } else {
      if (password) this.clearError(password);
      if (confirmPass) this.clearError(confirmPass);
    }
  }

  checkIncome(inputElement: HTMLInputElement | null): void {
    if (inputElement && !Validator.isValidIncome(inputElement.value)) {
      this.showError(inputElement, "Select a valid income source");
    } else if (inputElement) {
      this.clearError(inputElement);
    }
  }

  checkAge(inputElement: HTMLInputElement | null): void {
    if (inputElement) {
      const age = parseInt(inputElement.value, 10);
      if (!Validator.isAge(age)) {
        this.showError(inputElement, "Enter a valid age");
      } else if (!Validator.isAdult(age)) {
        this.showError(inputElement, "You must be at least 18 years old");
      } else {
        this.clearError(inputElement);
      }
    }
  }

  checkBio(inputElement: HTMLInputElement | null) {
    if (inputElement && !Validator.minLength(inputElement.value, 10)) {
      this.showError(inputElement, "Describe yourself(10 or more characters)");
    } else if (inputElement) {
      this.clearError(inputElement);
    }
  }

  private showError(inputElement: HTMLInputElement, message: string): void {
    inputElement.value = "";
    inputElement.style.border = "1px solid red";
    inputElement.classList.add("error");
    inputElement.placeholder = message;
  }

  private clearError(inputElement: HTMLInputElement): void {
    inputElement.style.border = "1px solid #b8b6bf";
    inputElement.classList.remove("error");
  }
}

document
  .querySelector(".create__button")
  ?.addEventListener("click", (): void => {
    const validation = new Validation(
      firstName,
      lastName,
      email,
      password,
      confirmPass,
      income,
      age,
      bio
    );

    validation.checkName(firstName);
    validation.checkName(lastName);
    validation.checkEmail(email);
    validation.checkPassword(password, confirmPass);
    validation.checkIncome(income);
    validation.checkAge(age);
    validation.checkBio(bio);
  });
