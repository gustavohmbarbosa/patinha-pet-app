export function confirmDateVaccineted(
  scheduledDateString: string,
  vaccinatedDateString: string | null
) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const vaccinatedDate =
    vaccinatedDateString !== null ? new Date(vaccinatedDateString) : null;
  if (vaccinatedDate) vaccinatedDate.setHours(0, 0, 0, 0);
  const scheduledDate = new Date(scheduledDateString);
  scheduledDate.setHours(0, 0, 0, 0);

  if (!vaccinatedDate) {
    return scheduledDate >= today;
  } else {
    return true;
  }
}
