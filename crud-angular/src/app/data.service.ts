import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  
  constructor(private http:HttpClient) { }

  getShoppingItems(){
    return this.http.get("https://pure-crag-54749.herokuapp.com/api/items");
    // .map(res => res.json); 
  }
  addShoppingItems(newItem){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post("https://pure-crag-54749.herokuapp.com/api/items",newItem,{ headers:headers});
  }
  deleteShoppingItem(id){
    return this.http.delete("https://pure-crag-54749.herokuapp.com/api/items/"+id); 
  }
  updateShoppingItem(newItem){
    let headers = new HttpHeaders();
    headers.append('Content-type','application/json');
    return this.http.put("https://pure-crag-54749.herokuapp.com/api/items/"+newItem._id,newItem,{headers: headers});
  }
}
 