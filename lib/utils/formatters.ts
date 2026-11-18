export function formatPrice(amount: number | string): string {
  // Removes anything that isn't a digit, a minus sign, or a decimal point
  const sanitized =
    typeof amount === "string" ? amount.replace(/[^0-9.-]+/g, "") : amount;
  const numericAmount = Number(sanitized);

  if (isNaN(numericAmount)) return "₱0";

  return numericAmount.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const BADGE_CONFIG: Record<
  string,
  {
    label: string;
    className?: string;
    variant?: "secondary" | "default" | "destructive" | "outline";
  }
> = {
  "mint-in-sealed-box": {
    label: "MISB",
    className:
      "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
  "mint-in-box": {
    label: "MIB",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  "back-in-box": {
    label: "BIB",
    className: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  },
  used: {
    label: "Used",
    variant: "secondary",
  },
  loose: {
    label: "Loose",
    className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  "with-issue": {
    label: "With issue",
    className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
};

export function getBadgeConfig(value: string) {
  const config = BADGE_CONFIG[value.toLowerCase()];

  if (config) return config;

  return {
    label: value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  };
}

export function formatString(value: string): string {
  return value
    .replace(/[,\-.]/g, " ")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
