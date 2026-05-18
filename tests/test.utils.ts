import { faker } from "@faker-js/faker";

export const generateUsername = (): string => {
  return faker.internet.username();
};

export const generateEmail = (): string => {
  return faker.internet.email();
};

export const generateStrongPassword = (): string => {
  return faker.internet.password({
    length: 15,
    pattern: /[A-Za-z0-9!@#$%^&*]/,
  });
};
