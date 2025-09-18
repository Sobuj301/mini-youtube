console.log('connected')

function loadingRemove(){
    const loading = document.getElementById("loading");
    loading.classList.remove("hidden")
    const videoContent = document.getElementById('video-content')
    videoContent.classList.add('hidden')
    
}
function loadingAdd(){
    const loading = document.getElementById("loading");
    loading.classList.add("hidden")
    const videoContent = document.getElementById('video-content')
    videoContent.classList.remove('hidden')
    
}



// remove active button
function removeActiveClass() {
    const activeButton = document.getElementsByClassName('active')
    for(const btn of activeButton) {
        btn.classList.remove("active")
    }

}

// category data load
function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

// video content load
function loadVideo(search = "") {
    loadingRemove()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            document.getElementById("btn-all").classList.add("active")
            displayVideo(data.videos)
        })
}

// category wise data load

function categoryLoad(id) {
    loadingRemove()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const clickButton = document.getElementById(`btn-${id}`)
            clickButton.classList.add('active')
            displayVideo(data.category)
        })
}


function displayVideo(videos) {
    const videoContent = document.getElementById('video-content')
    if (videos.length === 0) {
        loadingAdd()
        videoContent.innerHTML = `
            <div class="col-span-4 flex flex-col justify-center items-center py-10">
                <img class="w-[100px]" src="assets/Icon.png" alt="">
                <p class="text-sm font-medium mt-3">Oops !!! Sorry,Content Not Here</p>
            </div>
        `
         return
    }
    videoContent.innerHTML = ""
    const video = videos.forEach(video => {
        const videoDiv = document.createElement('div')
        videoDiv.innerHTML = `
            <div class="card">
                <figure class="relative">
                    <img class="w-full h-[200px] object-cover" src=${video.thumbnail} alt="Shoes" />
                    <p class="absolute bottom-2 right-2  text-white bg-black py-1 px-1 rounded-sm">3hrs 56 min ago</p>
                </figure>
                <div class="flex gap-3 py-3">
                    <div class="avatar">
                        <div class="w-10 h-10 rounded-full">
                            <img src=${video.authors[0].profile_picture} />
                        </div>
                    </div>
                    <div>
                        <h2 class="font-semibold text-xl mb-2">${video.title}</h2>
                        <p class="text-gray-400 flex gap-2">${video.authors[0].profile_name}<img class="w-6" src="https://img.icons8.com/?size=100&id=36872&format=png&color=000000" alt=""></p>
                        <p class="text-gray-400 ">${video.others.views}</p>
                    </div>
                </div>
            </div>
        `

        videoContent.append(videoDiv)
        loadingAdd()
    })
}

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories')
    for (const category of categories) {
        const div = document.createElement('div')
        div.innerHTML = `
         <button id=btn-${category.category_id} onclick="categoryLoad(${category.category_id})" class="btn hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
       `
        categoriesContainer.append(div)
    }
}


document.getElementById('input-field').addEventListener('keyup',(e)=>{
    const inputText = e.target.value;
    console.log(inputText)
    loadVideo(inputText)
})


loadCategories()