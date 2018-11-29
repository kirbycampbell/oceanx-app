class Carrier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false
    };
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    if (this.state.editable) {
      let name = this.name.value;
      let built = this.built.value;
      let id = this.props.carrier.id;
      let carrier = { id: id, name: name, built: built };
      this.props.handleUpdate(carrier);
    }
    this.setState({
      editable: !this.state.editable
    });
  }

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
    let description = this.state.editable ? (
      <input
        type="text"
        ref={input => (this.built = input)}
        defaultValue={this.props.carrier.built}
      />
    ) : (
      <p>Built {this.props.carrier.built} years ago</p>
    );

    return (
      <div>
        {name}
        {description}
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
