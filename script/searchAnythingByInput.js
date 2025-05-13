
const searchAnythingByInput = document.getElementById("search-input");
searchAnythingByInput.addEventListener("keyup",(e)=>{
    const searchInputText = e.target.value;
    loadVideos(searchInputText);
});