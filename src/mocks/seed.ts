import { faker } from "@faker-js/faker";

// Using fixed seed for consistent data
const SEED = 123456789;

export const initializeMockData = () => {
  faker.seed(SEED);
};
