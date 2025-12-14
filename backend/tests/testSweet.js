const request = require("supertest");
const app = require("../index"); // export app from index.js

describe("DELETE /api/sweets/:id", () => {
  it("should block normal user", async () => {
    const res = await request(app)
      .delete("/api/sweets/123")
      .set("Authorization", "Bearer USER_TOKEN");

    expect(res.statusCode).toBe(403);
  });
});
