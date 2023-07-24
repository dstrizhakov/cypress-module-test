// import Button from './button'

const Button = (props) => {
  return <button>{props.children}</button>;
};

it("uses custom text for the button label", () => {
  cy.mount(<Button>Click me!</Button>);
  cy.get("button").should("contains.text", "Click me!");
});
