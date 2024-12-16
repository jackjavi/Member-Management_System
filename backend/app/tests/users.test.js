import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { server } from "../../index.mjs";
import sequelize from "../../utils/database.mjs";
import populateDatabase from "../../utils/populateDatabase.mjs";

const request = supertest(server);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset the database
  await populateDatabase(); // Populate default data
});

afterAll(async () => {
  if (server && server.close) {
    await new Promise((resolve) => server.close(resolve)); // Close the server
  }
  await sequelize.close(); // Close the database connection
});

describe("POST /api/v1/users/register", () => {
  it("should create a new user", async () => {
    const user = {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: "password",
    };

    const response = await request.post("/api/v1/users/register").send(user);
    expect(response.status).toBe(201);
  });
});

describe("POST /api/v1/users/login", () => {
  it("should login the user", async () => {
    const user = {
      email: "admin@gmail.com",
      password: "admin",
    };

    const response = await request.post("/api/v1/users/login").send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });
});
