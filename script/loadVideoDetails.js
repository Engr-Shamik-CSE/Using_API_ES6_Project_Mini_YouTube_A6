console.log("loadVideoDetail.js is loaded");
const loadVideoDetails = (videoID) =>{
    console.log(videoID);

    // https://openapi.programming-hero.com/api/phero-tube/video/aaac
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
    fetch(url)
    .then(res => res.json())
    .then( data =>{
        // console.log(data)
        displayVideoDetails(data.video)
});
};
const displayVideoDetails = (video) =>{
    // console.log(video);
    const show_details_modal = document.getElementById("show_details_modal");
    show_details_modal.showModal();
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML=`
        <div class="card bg-base-100 shadow-sm gap-5 flex items-center">
                    <figure class="relative w-full">
                        <img class="rounded-lg h-[370px] w-full object-cover" src="${video.thumbnail}"
                            alt="thumbnal-image" />
                        <span class="bg-black absolute bottom-2 right-2 px-3 py-1 text-white text-sm rounded">3hrs 56min
                            ago</span>
                    </figure>
                    <div class="w-full grid place-items-center  gap-5 px-0 pl-2">
                        <div class="thummbnail-info space-y-1 pb-5 pr-1">
                            <h2 class="font-bold text-lg line-clamp-2 text-center">
                                ${video.title}
                            </h2>
                            <p class="font-bold text-base">
                                ${video.description}
                            </p>
                            <p class="text-lg text-gray-400 flex gap-2 items-center">
                                Author: ${video.authors[0].profile_name} <img class="w-5 h-5"
                                    src="https://img.icons8.com/?size=32&id=2AuMnRFVB9b1&format=png"
                                    alt="verified-icon">
                            </p>
                            <p class="text-lg text-gray-400">
                                ${video.others.views} views
                            </p>
                        </div>
                    </div>
                </div>
    `;
};