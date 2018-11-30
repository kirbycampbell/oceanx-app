class Carrier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  // This switches the editable state from true to false.
  handleEdit() {
    if (this.state.editable) {
      let name = this.name.value;
      let built = this.built.value;
      let id = this.props.carrier.id;
      let carrier = { id: id, name: name, built: built };
      // This calls its parent's (Body) function of handleUpdate and passes in the new carrier data.
      this.props.handleUpdate(carrier);
    }
    this.setState({
      editable: !this.state.editable
    });
  }
  // If state is not editable, it renders normally.
  // If it is editable, it renders the update form for you to type into.
  render() {
    let name = this.state.editable ? (
      <input
        type="text"
        ref={input => (this.name = input)}
        defaultValue={this.props.carrier.name}
      />
    ) : (
      <h3>The {this.props.carrier.name}</h3>
    );
    let built = this.state.editable ? (
      <input
        type="text"
        ref={input => (this.built = input)}
        defaultValue={this.props.carrier.built}
      />
    ) : (
      <p>Built {this.props.carrier.built} years ago</p>
    );
    // Below Clicking Edit, toggles it on for you to change.
    // And clicking delete shoots the delete method in Body off and passes the id of that item.
    return (
      <div>
        {name}
        {built}
        <button onClick={() => this.handleEdit()}>
          {this.state.editable ? "Submit" : "Edit"}
        </button>
        <button onClick={() => this.props.handleDelete(this.props.carrier.id)}>
          Delete
        </button>
        <p>---------------------------</p>
      </div>
    );
  }
}
