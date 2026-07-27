const maskEmail = (email) => {
  if (!email) return "";

  const [name, domain] = email.split("@");

  if (name.length <= 2) {
    return `${name[0]}***@${domain}`;
  }

  return `${name.substring(0, 2)}***@${domain}`;
};

export default maskEmail;