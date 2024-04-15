export declare global {
  namespace Cypress {
    interface Chainable {
      getByTestid<Subject>(testid: string): Chainable<Subject>;
    }
  }
}
