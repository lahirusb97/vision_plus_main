export const birthdayToAge = (birthday: string) => {
  if (!birthday || typeof birthday !== "string") {
    return "";
  }

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) {
    return "";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 0) {
    return "";
  }

  return age;
};
