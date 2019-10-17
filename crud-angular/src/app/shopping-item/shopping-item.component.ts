import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from "../data.service";

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers : [DataService] //for dependency injection
})
export class ShoppingItemComponent implements OnInit {
  public shoppingItemList:any = [];
  public selectedItem : Item ;
  public toggleForm : Boolean = false;

  constructor(private dataService : DataService) { }
   
  getItems(){
    //Fetch data from '/api/items' by get request using services
    this.dataService.getShoppingItems()
    .subscribe(items => {
      this.shoppingItemList = items;
      // console.log("data from dataService - " + this.shoppingItemList);
    });
  }

  addItem(form){
    // console.log(form.value);
    let newItem :Item = {
      itemName : form.value.itemName,
      itemQuantity : form.value.itemQuantity,
      itemBought : false
    }
    this.dataService.addShoppingItems(newItem)
    .subscribe(item => {
      console.log(item);
      this.getItems();
    });
    
  }

  deleteItem(id){
    this.dataService.deleteShoppingItem(id)
    .subscribe(data => {
      console.log(data);
      this.getItems();
      // if(data.n == 1){
      //   for(var i=0;i<this.shoppingItemList.length;i++){
      //      if(id == this.shoppingItemList[i].id){
      //        this.shoppingItemList.splice(i,1);
      //      }
      //   }
      // }
    })
  }

  showEditForm(item){
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  editItem(form){
    let newItem :Item = {
      _id : this.selectedItem._id,
      itemName : form.value.itemName,
      itemQuantity : form.value.itemQuantity,
      itemBought : this.selectedItem.itemBought
    }
    this.dataService.updateShoppingItem(newItem)
    .subscribe(result => {
      console.log("New value"+ result);
      this.getItems();
    });
    this.toggleForm = !this.toggleForm; 
  }
  
  updateItemCheckbox(item){
    item.itemBought = !item.itemBought;
    this.dataService.updateShoppingItem(item)
    .subscribe(result => {
      console.log("New value"+result);
      this.getItems();
    });
  }

  ngOnInit() {
    this.getItems(); 
  }
}
 