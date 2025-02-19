import { User } from "@/types/User";
import { faker } from "@faker-js/faker";

export const users: User[] = Array.from({ length: 10 }, () => ({
  id: faker.string.alpha(11),
  organization: faker.company.name(),
  personalInfo: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    profileImage: "https://i.ibb.co/sJ29kFkQ/image.png",
    gender: faker.helpers.arrayElement(["male", "female", "other"]),
    maritalStatus: faker.helpers.arrayElement([
      "single",
      "married",
      "divorced",
    ]),
    children: faker.number.int({ min: 0, max: 5 }),
    residenceType: faker.helpers.arrayElement(["owned", "rented", "family"]),
  },
  account: {
    tier: faker.helpers.arrayElement([1, 2, 3]),
    balance: parseFloat(faker.finance.amount({ min: 1000, max: 100000 })),
    number: faker.finance.accountNumber(10),
    bank: faker.finance.accountName(),
    bvn: faker.finance.accountNumber(11),
  },
  employment: {
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    sector: faker.commerce.department(),
    duration: faker.number.int({ min: 1, max: 15 }),
    income: parseFloat(faker.finance.amount({ min: 20000, max: 250000 })),
  },
  education: {
    level: faker.helpers.arrayElement([
      "high-school",
      "bachelors",
      "masters",
      "phd",
    ]),
    institution: faker.company.name(),
    graduationYear: faker.date.past({ years: 20 }).getFullYear(),
  },
  socials: {
    twitter: faker.internet.username(),
    facebook: faker.internet.username(),
    instagram: faker.internet.username(),
    linkedin: faker.internet.username(),
  },
  guarantors: Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => ({
      name: faker.person.fullName(),
      relationship: faker.helpers.arrayElement([
        "Parent",
        "Sibling",
        "Friend",
        "Colleague",
      ]),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    })
  ),
  meta: {
    email: faker.internet.email(),
    phone: faker.phone.number(),
    joined: faker.date.past({ years: 5 }).toISOString(),
    status: faker.helpers.arrayElement(["active", "inactive", "blacklisted"]),
    loanAmount: parseFloat(faker.finance.amount({ min: 5000, max: 50000 })),
    savingsAmount: parseFloat(faker.finance.amount({ min: 1000, max: 100000 })),
  },
}));
