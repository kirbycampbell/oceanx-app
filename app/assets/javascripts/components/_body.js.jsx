class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carriers: []
    };
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
  render() {
    return <AllCarriers carriers={this.state.carriers} />;
  }
}
