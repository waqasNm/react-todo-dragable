import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value,ind,edit,del,save,cancel,changeDetect }) =>
  <li>
    {value.name}
    <span className="edit" onClick={edit.bind(this, ind)}>
      <i className="fa fa-pencil" aria-hidden="true"></i>
    </span>
    <span className="close" onClick={del.bind(this,ind)}>&times;</span>
    <br />
    {value.isTrue ? (
      [<div className="row" key={ind}>
        <div className="col-6 col-md-6">
          <input type="text" onChange={changeDetect.bind(this,ind)} className="form-control input" placeholder="Enter text..."  />
          <span className="save" onClick={save.bind(this, ind,value)} ><i className="fa fa-floppy-o" aria-hidden="true"></i></span>
          <span className="edit-close" onClick={cancel.bind(this, ind)}><i className="fa fa-times" aria-hidden="true"></i></span>
        </div>
      </div>
      ]
    ) : (
        <span className="edit" onClick={edit.bind(this, ind)}>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </span>
      )}
  </li>
);

const SortableList = SortableContainer(({ items,edit,save,cancel,del,changeDetect }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} 
          ind={index} 
          value={value} 
          edit={edit} 
          del={del} 
          save={save} 
          cancel={cancel}
          changeDetect={changeDetect} />
      ))}
    </ul>
  );
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      data: arrayMove(this.state.data, oldIndex, newIndex),
    });
  };
  componentDidMount() {
  }
  addItem() {
    if (this.refs.item.value !== "") {
      let fireData = {
        name: this.refs.item.value,
        isTrue: false
      }
      let arr = this.state.data;
      arr.push(fireData)
      this.setState({ data: arr })
      this.refs.item.value = "";
    } else {
      console.log("Enter Item");
    }
  }
  delItem(key) {
    console.log(key)
    let arr = this.state.data;
    arr.splice(key, 1);
    this.setState({ data: arr })
  }
  editItem(key) {
    console.log(key);
    let data = this.state.data;
    console.log(data);
    data[key].isTrue = true;
    this.setState({ data: data });
  }
  cancelEdit(key) {
    console.log(key);
    let data = this.state.data;
    console.log(data);
    data[key].isTrue = false;
    this.setState({ data: data });
  }
  saveItem(key,value) {
    if(this.state.value){
      let arr = this.state.data;
      arr[key] = { name: this.state.value, isTrue: false };
      this.setState({ data: arr })
    }
  }

  onEditChange(ind,event){
    event.persist()
    if (event.target.value !== "") {
      let item = event.target.value;
      this.setState({value:item})
    } else {
      console.log("Enter some Item")
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title text-center">Welcome to React Dragable Listing App</h1>
        </header>
        <div className="main">
          <h2>Listing App</h2>
          <input type="text" placeholder="Title..." className="input-tab" ref="item" />
          <span className="add-btn" onClick={this.addItem.bind(this)}>Add Item</span>
        </div>

        {/* <ul className = "App-intro">
          {this.state.data.map((val, index) => {
              return <li key = {index}>{val.name}
                 <span className = "edit" onClick={this.editItem.bind(this,index)}>
                      <i className ="fa fa-pencil" aria-hidden="true"></i>
                 </span>
                 <span className = "close" onClick={this.delItem.bind(this,index)}>&times;</span>   
                 <br/>
                    {this.state.data[index].isTrue ? (
                      [<div className = "row" key={index}>
                          <div className = "col-6 col-md-6">
                            <input type="text" className="form-control input" placeholder="Enter text..." ref = {"edit" +index} />
                            <span className = "save" onClick = {this.saveItem.bind(this,index)} ><i className="fa fa-floppy-o" aria-hidden="true"></i></span>
                            <span className = "edit-close" onClick={this.cancelEdit.bind(this,index)}><i className="fa fa-times" aria-hidden="true"></i></span>                         
                          </div>
                      </div>
                      ]
                    ) : (
                      <span className = "edit" onClick={this.editItem.bind(this,index)}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </span>
                    )}             
              </li>
            })
          }
        </ul> */}
        <SortableList items={this.state.data} onSortEnd={this.onSortEnd} pressDelay={200} lockAxis="y" 
          edit={this.editItem.bind(this)}
          del={this.delItem.bind(this)}
          save={this.saveItem.bind(this)}
          cancel={this.cancelEdit.bind(this)}
          changeDetect={this.onEditChange.bind(this)} />
      </div>
    );
  }
}

export default App;
