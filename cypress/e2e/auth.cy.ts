// cypress allows us to scope such util fn under the 'cy' namespace
// see `Cypress Commands`
function getByTestId(id: string) {
  return cy.get(`[data-testid='${id}']`);
}

describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/") // check cypess.config.ts baseUrl
  });

  it("should display login form on '/' and show no current user", () => {
    getByTestId("login-form").should("exist");
    getByTestId("current-user").should("not.exist");
  });

  it("should submit user and display the current user", () => {
    // directly reply with a mock data
    cy.intercept("PUT", "https://apitsymiexist.com/auth", {
      id: "some_id",
      username: "Yume",
      age: 18,
    });

    getByTestId("username").type("Yume");
    getByTestId("age").clear().type("18");

    // triggers an api call but the api doesnt exist yet so intercept it
    getByTestId("submit-button").click(); 

    getByTestId("current-user")
      .contains("connected as Yume");
  });
})
