import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import UploadImages from "./components/images-upload.component";

// import {useLocalStorage} from "react-use-storage";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        index:0,
        name:"",
        price:Number,
        file: null,
        action:"ADD PRODUCT",//default ADD ITEM
        items:[
          { name: "Iphone8", price: 777, img: <img src ={window.location.origin + '/images/iphonexs-max.png'} alt={"anh1"}  />},
          { name: "Iphone9", price: 888, img: <img src ={window.location.origin +'/images/ss-s21.png'} alt={"anh2"}/> },
          { name: "Iphone10", price: 999, img: <img src ={window.location.origin + '/images/xiaomi10.png'} alt={"anh3"}/> },
        ]
    }
    this.changeName = this.changeName.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.handleChange = this.handleChange.bind(this)  
  }
  changeName = (e)=>{
      this.setState({
        name:e.target.value
      })
  }
  changePrice = (e)=>{
      this.setState({
        price:e.target.value
      })
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }

  addItem =()=>{
      if(!this.state.items.find(item=>item.name===this.state.name)){
        this.setState({
          items:[
            ...this.state.items,
            { name:this.state.name,price:this.state.price,image:this.state.progressInfos}
          ],
          name:"",
          price:"",
          image:'files',
        })
      }
  }
  
  Edit = (item,index)=>{
    this.setState({
      action:'UPDATE ITEM',
      name:item.name,
      price:item.price,
      image:item.image,
      index:index
    });
  }

  updateItem = ()=>{
    let data = this.state.items;
    data.map((item,index)=>{
              if(this.state.index===index){
                item.name = this.state.name;
                item.price = parseInt(this.state.price);
                item.image = this.state.image;
              }
    })
    //set update items
    this.setState({
      items:data,
      name:"",
      price:"",
      image:"",
      action:'ADD_ITEM'
    })
    
  }

  deleteItem=(name)=>this.setState({
    items:this.state.items.filter(item=>item.name!=name)
  })
  render(){
    return (
      <div className="container">
          <div className="row">
            <div className="col-md-4">
                <h1>{this.state.action}</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="" className="form-control" onChange={this.changeName} value={this.state.name}/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name=""  className="form-control" onChange={this.changePrice} value={this.state.price}/>
                </div>
                <div className="form-group">       
                  <button type="button" className="btn btn-success"  onClick={this.state.action=='ADD PRODUCT'?this.addItem:this.updateItem}>Add Products</button>
                </div>
                <div className="content">
                  <UploadImages />
      </div>

            </div>

            <div className="col-md-8">
                <h1>List Products</h1>
                <table className="table">
                  <thead>
                      <tr>
                          <th>STT</th>
                          <th>Products Name</th>
                          <th>Product Cost</th>
                          <th>Image</th>
                          <th>Update</th>
                          <th>Delete</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.items.map((item,index)=>(
                          <tr key={index}>
                              <td>{index}</td>
                              <td>{item.name}</td>
                              <td>{item.price} $</td>
                              <td>{item.img}</td>
                              <td><label className="badge badge-warning" onClick={()=>this.Edit(item,index)}>Update</label></td>
                              <td><label className="badge badge-danger" onClick={()=>this.deleteItem(item.name)}>Delete</label></td>
                          </tr>
                        ))
                      }
                  </tbody>
                </table>
            </div> 
          </div>
      </div>
    );
  }
}

    export default App;