import { defineRule } from "vee-validate";
import { required, email } from "@vee-validate/rules";

// No message specified.
defineRule("email", email);
defineRule("future", (value) => {
  const today = new Date();
  if (
    value >= new Date(today.getFullYear(), today.getMonth(), today.getDate())
  ) {
    return true;
  }

  return "Past date not allowed";
});

// Override the default message.
defineRule("required", (value) => {
  return !required(value) || "This field is required";
});
