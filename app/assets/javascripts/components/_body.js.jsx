class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carriers: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewCarrier = this.addNewCarrier.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteCarrier = this.deleteCarrier.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateCarrier = this.updateCarrier.bind(this);
  }

  handleFormSubmit(name, built) {
    let body = JSON.stringify({ carrier: { name: name, built: built } });

    fetch("http://localhost:3000/api/v1/carriers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        return response.json();
      })
      .then(carrier => {
        this.addNewCarrier(carrier);
      });
  }

  addNewCarrier(carrier) {
    this.setState({
      carriers: this.state.carriers.concat(carrier)
    });
  }

  componentDidMount() {
    fetch("/api/v1/carriers.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ carriers: data });
      });
  }

  handleUpdate(carrier) {
    fetch(`http://localhost:3000/api/v1/carriers/${carrier.id}`, {
      method: "PUT",
      body: JSON.stringify({ carrier: carrier }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.updateCarrier(carrier);
    });
  }

  updateCarrier(carrier) {
    let newCarriers = this.state.carriers.filter(c => c.id !== carrier.id);
    newCarriers.push(carrier);
    this.setState({
      carriers: newCarriers
    });
  }

  handleDelete(id) {
    // I added this up top so that it would delete quicker visually and then hit database.
    //Probably not a good idea though, since if it doesn't end up deleting from the database, you wouldn't know.
    // Maybe could add a re-rendering of the state after though, so if it didn't delete, it comes back?
    this.deleteCarrier(id);
    fetch(`http://localhost:3000/api/v1/carriers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      this.deleteCarrier(id);
    });
  }

  deleteCarrier(id) {
    newCarriers = this.state.carriers.filter(carrier => carrier.id !== id);
    this.setState({
      carriers: newCarriers
    });
  }
  render() {
    return (
      <div>
        <NewCarrier handleFormSubmit={this.handleFormSubmit} />
        <AllCarriers
          carriers={this.state.carriers}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}
