export function maskCep(value: string) {
  // código regex
  value = value.replace(/\D/g, ""); // só pega números
  // pega os 5 primeiros digitos e separa do resto, após junta os dois gurpos com um hífen
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  return value;
}

export function maskCellphone(value: string) {
  // código regex
  value = value.replace(/\D/g, ""); // só pega números
  // pega os 2 primeiros digitos e separa, pega os seguinte 5 e separa, pega o resto, após junta os grupos
  value = value.replace(/^(\d{2})(\d{5})(\d)/, "($1) $2-$3");
  return value;
}
