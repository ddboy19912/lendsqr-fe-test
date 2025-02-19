type NavLink = {
  path: string;
  label: string;
  icon: string;
  badge?: number;
  nested?: NavLink[];
  id: string;
};

type NavSection = {
  id: string;
  title?: string;
  links: NavLink[];
};

export const SIDEBAR_NAV: NavSection[] = [
  {
    id: "customers",
    title: "Customers",
    links: [
      {
        id: "customers-users",
        path: "/users",
        label: "Users",
        icon: "user-friends",
      },
      {
        id: "customers-guarantors",
        path: "/guarantors",
        label: "Guarantors",
        icon: "users",
      },
      {
        id: "customers-loans",
        path: "/loans",
        label: "Loans",
        icon: "sack",
      },
      {
        id: "customers-decision-models",
        path: "/decision-models",
        label: "Decision Models",
        icon: "handshake",
      },
      {
        id: "customers-savings",
        path: "/savings",
        label: "Savings",
        icon: "piggy-bank",
      },
      {
        id: "customers-loan-requests",
        path: "/loan-requests",
        label: "Loan Requests",
        icon: "loan",
      },
      {
        id: "customers-whitelist",
        path: "/whitelist",
        label: "Whitelist",
        icon: "user-check",
      },
      {
        id: "customers-karma",
        path: "/karma",
        label: "Karma",
        icon: "user-times",
      },
    ],
  },
  {
    id: "businesses",
    title: "Businesses",
    links: [
      {
        id: "businesses-organization",
        path: "/organization",
        label: "Organization",
        icon: "briefcase",
      },
      {
        id: "businesses-loan-products",
        path: "/loan-products",
        label: "Loan Products",
        icon: "loan",
      },
      {
        id: "businesses-savings-products",
        path: "/savings-products",
        label: "Savings Products",
        icon: "bank",
      },
      {
        id: "businesses-fees-charges",
        path: "/fees-charges",
        label: "Fees and Charges",
        icon: "coins-solid",
      },
      {
        id: "businesses-transactions",
        path: "/transactions",
        label: "Transactions",
        icon: "transaction",
      },
      {
        id: "businesses-services",
        path: "/services",
        label: "Services",
        icon: "galaxy",
      },
      {
        id: "businesses-service-account",
        path: "/service-account",
        label: "Service Account",
        icon: "user-cog",
      },
      {
        id: "businesses-settlements",
        path: "/settlements",
        label: "Settlements",
        icon: "scroll",
      },
      {
        id: "businesses-reports",
        path: "/reports",
        label: "Reports",
        icon: "chart-bar",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    links: [
      {
        id: "settings-preferences",
        path: "/preferences",
        label: "Preferences",
        icon: "sliders",
      },
      {
        id: "settings-fees-pricing",
        path: "/fees-pricing",
        label: "Fees and Pricing",
        icon: "badge-percent",
      },
      {
        id: "settings-audit-logs",
        path: "/audit-logs",
        label: "Audit Logs",
        icon: "clipboard-list",
      },
    ],
  },
];
