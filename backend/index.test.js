// Tests for all the API endpoints
const request = require("supertest");
require("dotenv").config();

const baseURL = "http://localhost:4000";
const { FROM_ADDRESS } = process.env;

let authToken = "";
let postID = "";
const dummyPost = {
  title: "test",
  imageURL: "http://test.com/image",
  content: "This is a test.",
};
const dummyUser = {
  name: "TEST",
  email: FROM_ADDRESS,
  password: "testing-password",
};

describe("GET /posts", () => {
  test("should return 200", async () => {
    const response = await request(baseURL).get("/posts");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /posts/:id", () => {
  beforeAll(async () => {
    const registerResponse = await request(baseURL).post("/register").send(dummyUser);
    authToken = registerResponse.body.token;

    const postResponse = await request(baseURL)
      .post("/new")
      .set({ Authorization: `Bearer ${authToken}` })
      .send(dummyPost);
    postID = postResponse.body._id;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete(`/delete/${postID}`)
      .set({ Authorization: `Bearer ${authToken}` });

    await request(baseURL)
      .delete("/delete-user")
      .set({ Authorization: `Bearer ${authToken}` });
  });

  test("should return 200", async () => {
    const response = await request(baseURL).get(`/posts/${postID}`);
    expect(response.statusCode).toBe(200);
  });
  test("should return the given post", async () => {
    const response = await request(baseURL).get(`/posts/${postID}`);
    expect(response.body._id).toBe(postID);
  });
});

describe("GET /admin/posts", () => {
  beforeAll(async () => {
    const registerResponse = await request(baseURL).post("/register").send(dummyUser);
    authToken = registerResponse.body.token;

    const postResponse = await request(baseURL)
      .post("/new")
      .set({ Authorization: `Bearer ${authToken}` })
      .send(dummyPost);
    postID = postResponse.body._id;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete(`/delete/${postID}`)
      .set({ Authorization: `Bearer ${authToken}` });

    await request(baseURL)
      .delete("/delete-user")
      .set({ Authorization: `Bearer ${authToken}` });
  });

  test("should return 200", async () => {
    const response = await request(baseURL)
      .get("/admin/posts")
      .set({ Authorization: `Bearer ${authToken}` });
    expect(response.statusCode).toBe(200);
  });
  test(`should return a single post with the id: ${postID}`, async () => {
    const response = await request(baseURL)
      .get("/admin/posts")
      .set({ Authorization: `Bearer ${authToken}` });
    expect(response.body[0]._id).toBe(postID);
  });
});

describe("POST /new", () => {
  beforeAll(async () => {
    const registerResponse = await request(baseURL).post("/register").send(dummyUser);
    authToken = registerResponse.body.token;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete(`/delete/${postID}`)
      .set({ Authorization: `Bearer ${authToken}` });

    await request(baseURL)
      .delete("/delete-user")
      .set({ Authorization: `Bearer ${authToken}` });
  });

  test("should return 201 and the new post", async () => {
    const response = await request(baseURL)
      .post("/new")
      .set({ Authorization: `Bearer ${authToken}` })
      .send(dummyPost);
    postID = response.body._id;
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(dummyPost.title);
  });
});

describe("POST /register", () => {
  afterAll(async () => {
    await request(baseURL)
      .delete("/delete-user")
      .set({ Authorization: `Bearer ${authToken}` });
  });

  test("should return 201", async () => {
    const response = await request(baseURL).post("/register").send(dummyUser);
    authToken = response.body.token;
    expect(response.statusCode).toBe(201);
  });

  test("should return a token", async () => {
    const response = await request(baseURL).post("/register").send(dummyUser);
    authToken = response.body.token;
    expect(response.body.token).not.toBeNull();
  });
});

describe("POST /login", () => {
  beforeAll(async () => {
    const registerResponse = await request(baseURL).post("/register").send(dummyUser);
    authToken = registerResponse.body.token;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete("/delete-user")
      .set({ Authorization: `Bearer ${authToken}` });
  });

  test("should return 200 and a token", async () => {
    const response = await request(baseURL)
      .post("/login")
      .send({ email: dummyUser.email, password: dummyUser.password });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).not.toBeNull();
    authToken = response.body.token;
  });
});

describe("PATCH /edit/:id", () => {
  beforeAll(async () => {
    const registerResponse = await request(baseURL).post("/register").send(dummyUser);
    authToken = registerResponse.body.token;

    const postResponse = await request(baseURL)
      .post("/new")
      .set({ Authorization: `Bearer ${authToken}` })
      .send(dummyPost);
    postID = postResponse.body._id;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete(`/delete/${postID}`)
      .set({ Authorization: `Bearer ${authToken}` });

    await request(baseURL)
      .delete("/delete-user")
      .set({ Authorization: `Bearer ${authToken}` });
  });

  test("should return 201", async () => {
    const response = await request(baseURL)
      .patch(`/edit/${postID}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .send({ ...dummyPost, title: "TEST!" });
    expect(response.statusCode).toBe(201);
  });
  test("should return the updated post", async () => {
    const response = await request(baseURL)
      .patch(`/edit/${postID}`)
      .set({ Authorization: `Bearer ${authToken}` })
      .send({ ...dummyPost, title: "TEST!" });
    expect(response.body.selectedPost.title).toBe("TEST!");
  });
});

describe("DELETE /delete/:id", () => {
  beforeAll(async () => {
    const registerResponse = await request(baseURL).post("/register").send(dummyUser);
    authToken = registerResponse.body.token;

    const postResponse = await request(baseURL)
      .post("/new")
      .set({ Authorization: `Bearer ${authToken}` })
      .send(dummyPost);
    postID = postResponse.body._id;
  });
  afterAll(async () => {
    await request(baseURL)
      .delete("/delete-user")
      .set({ Authorization: `Bearer ${authToken}` });
  });

  test("should return 200", async () => {
    const response = await request(baseURL)
      .delete(`/delete/${postID}`)
      .set({ Authorization: `Bearer ${authToken}` });
    expect(response.statusCode).toBe(200);
  });
});
