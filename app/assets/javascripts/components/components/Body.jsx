class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carriers: []
    };
    // Binds all of the below methods to this!
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.addNewCarrier = this.addNewCarrier.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteCarrier = this.deleteCarrier.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateCarrier = this.updateCarrier.bind(this);
  }

  // Form Submit - Creating new Carrier
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
  // Renders the new Carrier to screen
  addNewCarrier(carrier) {
    this.setState({
      carriers: this.state.carriers.concat(carrier)
    });
  }

  // initially sets up the view from the api endpoint
  componentDidMount() {
    fetch("/api/v1/carriers.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ carriers: data });
      });
  }

  // Updates the database with new data
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

  // Gets rid of old item, and pushes new item on.  In carrier I made the carriers sort by id.
  updateCarrier(carrier) {
    let newCarriers = this.state.carriers.filter(c => c.id !== carrier.id);
    newCarriers.push(carrier);
    this.setState({
      carriers: newCarriers
    });
  }

  // Deletes the item from the database.
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

  // This updates the state after deleting the item
  deleteCarrier(id) {
    newCarriers = this.state.carriers.filter(carrier => carrier.id !== id);
    this.setState({
      carriers: newCarriers
    });
  }
  // FULL ON RENDER.  NewCarrier Form and then all Carriers below that.
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
