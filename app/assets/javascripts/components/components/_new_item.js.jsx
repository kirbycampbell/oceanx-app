// This is the new item form
const NewCarrier = props => {
  let formFields = {};

  return (
    // Once the form submit is clicked it connects to props.handleFormSubmit and sends in the name and built values.
    <form
      onSubmit={e => {
        props.handleFormSubmit(formFields.name.value, formFields.built.value);
        e.target.removeEventListener();
      }}
    >
      <input
        ref={input => (formFields.name = input)}
        placeholder="Enter the name of the item"
      />
      <input
        ref={input => (formFields.built = input)}
        placeholder="How Old is the vessel?"
      />
      <button>Submit</button>
    </form>
  );
};
