const getLastActivity = (lastActivity) => {
  const today = new Date();
  const last = new Date(lastActivity);
  if (
    last.getDate() == today.getDate() &&
    last.getMonth() == today.getMonth() &&
    last.getFullYear() == today.getFullYear()
  ) {
    return `Online today`;
  }
  if (
    today.getDate() - last.getDate() === 1 &&
    last.getMonth() == today.getMonth() &&
    last.getFullYear() == today.getFullYear()
  ) {
    return `Online yesterday`;
  }
  return `Online at ${last.getDate()}/${last.getMonth()}/${last.getFullYear()()}`;
};

export default getLastActivity;
