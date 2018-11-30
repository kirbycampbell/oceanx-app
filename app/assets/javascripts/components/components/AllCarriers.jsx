const AllCarriers = props => {
  // This statement sorts the carriers by id, that way when updating they stay in order.
  const sorted = props.carriers.sort((a, b) => a.id - b.id);
  //This statement maps all carriers from props to const carriers.
  const carriers = sorted.map(carrier => {
    return (
      <div key={carrier.id}>
        <Carrier
          carrier={carrier}
          handleDelete={props.handleDelete}
          handleUpdate={props.handleUpdate}
        />
      </div>
    );
  });

  // This phrase literally renders it to the screen.
  return <div>{carriers}</div>;
};
