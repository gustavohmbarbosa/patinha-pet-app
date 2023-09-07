export function confirmDateVaccineted(
  scheduledDateString: string,
  vaccinatedDateString: string | null
) {
  const dataAtual = new Date();
  const vaccinatedDate = vaccinatedDateString
    ? new Date(vaccinatedDateString)
    : null;
  const scheduledDate = new Date(scheduledDateString);

  if (!vaccinatedDate) {
    return scheduledDate >= dataAtual;
  } else {
    return true;
  }
}
