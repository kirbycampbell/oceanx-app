const AllCarriers = (props) => {
    const carriers = props.carriers.map(carrier => {
      return (
        <div key={carrier.id}>
          <h1>The {carrier.name}</h1>
          <p>Built {carrier.built} years ago.</p>
        </div>
      );
    });
    return <div>{carriers}</div>;
  }
}
