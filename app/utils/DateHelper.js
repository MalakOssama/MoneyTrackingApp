export function formattedDate(date) {
  const formattedDate =
    new Date().getFullYear() === date.getFullYear()
      ? `${date.getDate()} ${new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(date)}, ${new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(date)}`
      : `${date.getDate()} ${new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(date)} ${date.getFullYear()}`;
  return formattedDate;
}

export function sortByDate(array, order = "asc") {
  return array.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const direction = order === "asc" ? 1 : -1;
    return direction * (dateA - dateB);
  });
}
