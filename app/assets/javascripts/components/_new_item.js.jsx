const NewCarrier = props => {
  let formFields = {};

  return (
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
