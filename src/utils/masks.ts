import { regexNumberPositive } from "./regex";

export function maskCep(value: string) {
  return value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
}

export function maskCellphone(value: string) {
  const maskedValue = value.replace(/\D/g, "");

  if (!value.length || !maskedValue.length) {
    return "";
  }

  if (maskedValue.length > 11) {
    return maskedValue.slice(0, 11);
  }

  if (maskedValue.length <= 2) {
    return `(${maskedValue}`;
  }

  if (maskedValue.length <= 7) {
    return `(${maskedValue.slice(0, 2)}) ${maskedValue.slice(2)}`;
  }

  if (maskedValue.length <= 11) {
    return `(${maskedValue.slice(0, 2)}) ${maskedValue.slice(
      2,
      7
    )}-${maskedValue.slice(7)}`;
  }

  return `(${maskedValue.slice(0, 2)}) ${maskedValue.slice(
    2,
    7
  )}-${maskedValue.slice(7, 11)}`;
}

export function maskCpf(value: string) {
  value = value.replace(/\D/g, '');

  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d)/, '$1.$2');
  value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return value;
}

export function removeMask(value: string) {
  return value.replace(/\D/g, "");
}

export function maskNumberPositive(value: string) {
  const cleanedText = value.replace(/[^0-9.]/g, "");

  if (regexNumberPositive.test(cleanedText)) {
    return cleanedText;
  }
}
