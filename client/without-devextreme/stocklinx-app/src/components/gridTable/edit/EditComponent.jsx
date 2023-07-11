const EditComponent = ({ gridData, rowIndex }) => {
  return (
    <div className="edit-container">
      <div className="element" onClick={() => console.log(gridData[rowIndex])}>
        <box-icon type="solid" name="edit-alt" size="1.5rem" />
      </div>
      <div className="element" onClick={() => console.log(rowIndex)}>
        <box-icon type="solid" name="x-square" size="1.5rem" />
      </div>
    </div>
  );
};
export default EditComponent;
