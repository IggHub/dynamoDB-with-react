import React, {Component} from 'react';

export default class DynamoDBQuery extends Component {
  render(){
    const handleFlavor = this.props.handleFlavor;
    const createItem = this.props.createItem;
    const readItem = this.props.readItem;
    const readAllItems = this.props.readAllItems;
    const deleteItem = this.props.deleteItem;
    const flavor = this.props.flavor;
    return (
      <form>
        <input onChange={handleFlavor} value={flavor} type="text" />
        <button type="submit" onClick={createItem}>Create item</button>
        <button type="submit" onClick={readItem}>Read item</button>
        <button type="submit" onClick={readAllItems}>Display All</button>
        <button type="submit" onClick={deleteItem}>Delete</button>
      </form>
    )
  }
}
