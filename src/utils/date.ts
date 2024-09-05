export function calculateAge(date: string) {
  const now = new Date();
  const birth = new Date(date);
  const diffMilliseconds = now.getTime() - birth.getTime();

  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = Math.floor(diffMilliseconds / millisecondsPerYear);

  if (years === 0) {
    const millisecondsPerMonth = millisecondsPerYear / 12;
    const month = Math.floor(diffMilliseconds / millisecondsPerMonth);

    if (month === 0) {
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const days = Math.floor(diffMilliseconds / millisecondsPerDay);
      return `${days} ${days > 1 ? "dias" : "dia"}`;
    }

    return `${month} ${month > 1 ? "meses" : "mês"}`;
  }

  return `${years} ${years > 1 ? "anos" : "ano"}`;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}