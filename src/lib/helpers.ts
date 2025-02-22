export const formatAmount = (
  amount: number | string,
  options?: {
    decimals?: number;
  }
): string => {
  const decimals = options?.decimals ?? 0;

  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(amount));
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const mainNumber = phoneNumber.split(/x/gi)[0];

  return mainNumber.replace(/(\d{3})[ .-]?(\d{3})[ .-]?(\d{4})/, "($1) $2-$3");
};

export const replaceHyphensWithSpaces = (str: string): string => {
  return str.replace(/-/g, " ");
};

const getYearSuffix = (count: number, abbreviate: boolean): string => {
  if (abbreviate) return "y";
  return count === 1 ? "year" : "years";
};

const getMonthSuffix = (count: number, abbreviate: boolean): string => {
  if (abbreviate) return "m";
  return count === 1 ? "month" : "months";
};

export const formatMonthsToYears = (
  months: number,
  abbreviate = false
): string => {
  if (months < 0) return "Invalid input";

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${getYearSuffix(years, abbreviate)}`);
  }

  if (remainingMonths > 0) {
    parts.push(
      `${remainingMonths} ${getMonthSuffix(remainingMonths, abbreviate)}`
    );
  }

  if (parts.length === 0) return "0 months";

  return parts.join(" ");
};
