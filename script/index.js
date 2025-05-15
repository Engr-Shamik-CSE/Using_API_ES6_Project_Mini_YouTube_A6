const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}

function loadCategories() {
    // 1 - fetch the data and get promise
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        // 2 - convert promise to json
        .then((res) => res.json())
        // 3 - Send data to display
        .then((data) => displayCategories(data.categories))// Once JSON is parsed, call the displayCategories function with the 'categories' array
        .catch((error) => console.error("Error:", error));
}

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");

    // Clear existing content
    categoryContainer.innerHTML = "";

    // Add the "All" category button which will not come from API
    const allDiv = document.createElement("div");
    allDiv.innerHTML = `
      <button onclick = "loadVideos()" class="btn btn-sm bg-[#E1002D] text-white hover:bg-[#E1002D] hover:text-white active-category">All</button>
    `;
    categoryContainer.appendChild(allDiv);

    //Now we will add 3 category button from API
    // Loop through categories
    for (let cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#E1002D] hover:text-white active-category">
          ${cat.category}
        </button>
      `;
        categoryContainer.appendChild(categoryDiv);
    }

    //Active Button: now add for--of loop for showing Active button
    const buttons = categoryContainer.getElementsByClassName('active-category');
    for (const btn of buttons) {
        btn.addEventListener("click", function () {
            // Remove active classes from all category buttons
            for (const b of buttons) {
                b.classList.remove("bg-[#E1002D]", "text-white");
            }

            // Add active class to the clicked button
            this.classList.add("bg-[#E1002D]", "text-white");
        });
    }
}
const loadVideos = (searchInputText = "") => {
    showLoader();
    // console.log("Initial Render");
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchInputText}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.error("Error:", error));
}
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    // Clear previous contents
    videoContainer.innerHTML = "";

    //if there is no video in a category button
    if (videos.length == 0) {
        videoContainer.innerHTML = `
            <div class="col-span-full flex justify-center items-center min-h-[80vh]">
                <div class="text-center grid place-items-center gap-4">
                    <img class="sm:w-[100px] lg:w-[300px]" src="./assests/Icon.png" alt="forEmptyContent">
                    <h2 class="font-bold text-xl lg:font-semibold lg:text-7xl ">Opps!! Sorry, There is no <br>content here</h2>
                </div>
            </div>
      `;
        hideLoader();
    }

    //if there are videos then then do the following codes
    videos.forEach(video => {
        // console.log(video);
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm gap-5 flex items-center">
              <figure class="relative w-full">
                  <img onclick="loadVideoDetails('${video.video_id}')" class="rounded-lg h-[180px] xl:h-[200px] 2xl:h-[220px] w-full object-cover" src="${video.thumbnail}" alt="thumbnal-image" />
                  <span class="bg-black absolute bottom-2 right-2 px-3 py-1 text-white text-sm rounded">3hrs 56min ago</span>
              </figure>
              <div class="w-full flex gap-4 px-0 pl-2">
                  <div class="avatar">
                      <div class="ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2 w-12 h-12">
                          <img class=""  src="${video.authors[0].profile_picture}" />
                      </div>
                  </div>
                  <div class="thummbnail-info space-y-1 pb-5 pr-1">
                      <h2 class="font-bold text-lg line-clamp-2">
                          ${video.title}
                      </h2>
                      <p class="text-lg text-gray-400 flex gap-2 items-center">
                          ${video.authors[0].profile_name}
                          ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=2AuMnRFVB9b1&format=png" alt="verified-icon"> ` : ``}

                      </p>
                      <p class="text-lg text-gray-400">
                          ${video.others.views} views
                      </p>
                  </div>
              </div>

              <div class="-mt-3 pb-6">
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn font-semibold rounded-md hover:bg-[#E1002D] hover:text-white outline-1 outline-offset-2 hover:outline-[#E1002D] ">See More Details</button>
              </div>
          </div>
      `;
        videoContainer.append(videoCard);
    });
    // }, 300);
    hideLoader();
}

loadCategories();
loadVideos();
