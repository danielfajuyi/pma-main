import ListItem from "./ListItem";

function List({ data, currentPage }) {
  const reversed = [...data].reverse()
  // setting page range
  function pageRange() {
    const pageLimit = 21;
    const rangeStart = (currentPage - 1) * pageLimit;
    const rangeEnd = currentPage * pageLimit;

    return reversed.filter(
      (item, index) => index >= rangeStart && index < rangeEnd && item
    );
  }

  return (
    <section className="property container">
      {data.length < 1 && (
        <div className="empty-search-text">Sorry No Result Found!</div>
      )}
      <div className="row">
        {pageRange().map((item) => (
          <ListItem
            key={item._id}
            id={item._id}
            uuid={item.uuid}
            firstCategory={item?.category[0]}
            secondCategory={item?.category[1]}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}
export default List;
