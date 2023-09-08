export function confirmDateVaccinated(
  scheduledDateString: string,
  vaccinatedDateString: string | null
) {
  const today = new Date();

  const vaccinatedDate = vaccinatedDateString
    ? new Date(vaccinatedDateString)
    : null;

  const scheduledDate = new Date(scheduledDateString);

  if (!vaccinatedDate) {
    return scheduledDate >= today;
  } else {
    return true;
  }
}
