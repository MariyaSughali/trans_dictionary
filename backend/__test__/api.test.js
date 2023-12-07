const request = require("supertest");
const app = require("../controller");

// getData

describe("Get /getData", () => {
  it("Should return set of data", async () => {
    const res = await request(app).get("/getData");
    expect(res.status).toBe(200);
  });

  it("Response time should be less than 200ms", async () => {
    const startTime = Date.now();
    const res = await request(app).get("/getData");
    const endTime = Date.now();
    const resTime = endTime - startTime;
    expect(res.status).toBe(200);
    expect(resTime).toBeLessThan(200);
  });

  it("Response data should be an array", async () => {
    const res = await request(app).get("/getData");
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// getcategory

describe("Get /getcategory", () => {
  it("Should return set of data", async () => {
    const res = await request(app).get("/getcategory/1");
    expect(res.status).toBe(200);
  });

  it("Response time should be less than 200ms", async () => {
    const startTime = Date.now();
    const res = await request(app).get("/getcategory/1");
    const endTime = Date.now();
    const resTime = endTime - startTime;
    expect(res.status).toBe(200);
    expect(resTime).toBeLessThan(200);
  });

  it("Response data should be an array", async () => {
    const res = await request(app).get("/getcategory/1");
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// getlanguage

describe("Get /getlanguage", () => {
  it("Should return set of data", async () => {
    const res = await request(app).get("/getlanguage");
    expect(res.status).toBe(200);
  });

  it("Response time should be less than 200ms", async () => {
    const startTime = Date.now();
    const res = await request(app).get("/getlanguage");
    const endTime = Date.now();
    const resTime = endTime - startTime;
    expect(res.status).toBe(200);
    expect(resTime).toBeLessThan(200);
  });

  it("Response data should be an array", async () => {
    const res = await request(app).get("/getlanguage");
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// getsubcategory

describe("GET /getsubcategory/:category", () => {
  it("Should return a set of data", async () => {
    const res = await request(app).get("/getsubcategory/1");
    expect(res.status).toBe(200);
  });

  it("Response time should be less than 200ms", async () => {
    const startTime = Date.now();
    const res = await request(app).get("/getsubcategory/1");
    const endTime = Date.now();
    const resTime = endTime - startTime;
    expect(res.status).toBe(200);
    expect(resTime).toBeLessThan(200);
  });
});

//isactive
describe("PUT /isactive/:id", () => {
  it("Should update isactive field in the database", async () => {
    const idToUpdate = 1;
    const response = await request(app)
      .put(`/isactive/${idToUpdate}`)
      .send({ isactive: true });
    expect(response.status).toBe(200);
  });

  it("Should handle invalid ID with a 404 response", async () => {
    const invalidId = 999999;
    const response = await request(app)
      .put(`/isactive/${invalidId}`)
      .send({ isactive: true });
    expect(response.status).toBe(404);
  });
});

// //updatedata
// describe("PUT /updateData", () => {
//   it("should update data successfully", async () => {
//     const testData = {
//       category: "B",
//       subcategory: "b3",
//       language: "Tamil",
//       jsonData: [
//         {
//           original_word: "happy",
//           translated_word: "மகிழ்ச்சி",
//         },
//         {
//           original_word: "angry",
//           translated_word: "கோபமான",
//         },
//       ],
//     };
//     const response = await request(app)
//       .put("/updateData")
//       .send(testData)
//       .expect(200);

//     expect(response.text).toBe("Data received and processed.");
//   });
// });

describe("GET /getDataByCategory/:category_id", () => {
  it("should return data for a valid category ID", async () => {
    const validCategoryId = "1";

    const response = await request(app).get(
      `/getDataByCategory/${validCategoryId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("GET /getDataBysubCategory/:category_id", () => {
  it("should return data for a valid category ID", async () => {
    const validCategoryId = "1";

    const response = await request(app).get(
      `/getDataBysubCategory/${validCategoryId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("GET /getlanguage/:languageId", () => {
  it("should return data for a valid language_id", async () => {
    const validLanguageId = "1";

    const response = await request(app).get(`/getlanguage/${validLanguageId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
