// // "category": [
// {
// "category_id": "1001",

const loadCategoryVideos = (cat_id) =>{
    showLoader();
    
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${cat_id}`;
      fetch(url)
        .then((res) => res.json())
        .then(data => displayVideos(data.category));// console.Log(cat_id);
    /*
    url for Music:
    https://openapi.programming-hero.com/api/phero-tube/category/1001
    
    url for Comedy:
    https://openapi.programming-hero.com/api/phero-tube/category/1003
    
    url for Drawing:
    https://openapi.programming-hero.com/api/phero-tube/category/1005
    */
}