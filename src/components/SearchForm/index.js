import React, { Component } from "react";
import { Grid} from 'semantic-ui-react'


class SearchForm extends Component {
constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
    InputText: '',
    images: [],
};
this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
}


//fetches images from api and stores images related to search term in the images array
FetchImages(){
    var searchTerm=this.state.InputText;
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=22b7d5bde5eb0e61538db8f0206e48a6&tags='+searchTerm+'&per_page=100&page=1&format=json&nojsoncallback=1')
    .then(function(response){
    return response.json();
    })
    .then(function(jsonObject){
    alert(JSON.stringify(jsonObject));
    let imageArray = jsonObject.photos.photo.map((pic) => {
    var imageSrc = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
    return(
    <img alt="image" src={imageSrc}></img>
    )
    })
    this.setState({images: imageArray});
    }.bind(this))
}


handleSearchTermChange(event){
        this.setState( {InputText:event.target.value} );
} 

onSubmit(event) {
    event.preventDefault();
    this.FetchImages();
}

//dynamically creates grid 
createGrid() {
    let grid = []
    for (let i = 0; i < this.state.images.length; i++) {
    grid.push(
    <Grid.Column mobile={16} tablet={8} computer={4}>
       {this.state.images[i]}
    </Grid.Column>
    )
}
return grid
}


render() {
return (
<div id="search-form">
   <form onSubmit={this.onSubmit}>
      <p className="header">Enter Text to Search</p>
      <input type="text" name="InputText" onChange={this.handleSearchTermChange}  required="required" />
      <input type="submit" defaultValue="Search" />
   </form>
   <div >
      <Grid doubling columns={5} >
         <Grid.Row>
            {this.createGrid()}
         </Grid.Row>
      </Grid>
   </div>
</div>
);
}
}
export default (SearchForm);