const apiKey ="R8MsqwH47m4UFYeGEuadf-gpEAvGqQDSJPTq6l2wxok";
let count = 5;
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let imageLoaded = 0;
let ready = 0;
let totalImages = 0;
let imageArray = [];
// set attribute for item
function setAttributes(item, attributes){
    for(key in attributes){
        item.setAttribute(key, attributes[key]);
    }
}
function loadImage(){
    
    imageLoaded++;
    
    if(imageLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}
//display image
function showImages(){
    imageLoaded = 0;
    totalImages = imageArray.length;
    
    // function for each element in array
    imageArray.forEach((photo) =>{
    // create <a> element
    const item = document.createElement('a');
    setAttributes(item,{
        'href' : photo.links.html,
        'target': '_blank'
    });
    //    // create <img> for phto
    const img = document.createElement('img');
    setAttributes(img,{
        'src' : photo.urls.regular,
        'alt':photo.alt_description,
        'title': photo.alt_description
    })
    //check if the images are loaded
    img.addEventListener('load',loadImage());
    //    // put <img> inside <a>,then put both inside img container element

    item.appendChild(img);
    imageContainer.appendChild(item);
    })
    
}
// get photo from unsplash api

async function getPhoto(){
    try{
        const response = await fetch(url);
        imageArray = await response.json();
        showImages();
    }catch(error){
        console.log(error);
    }
}

// load more photo when we scroll to the bottom
window.addEventListener("scroll",function(){
    if(this.window.scrollY + this.window.innerHeight >= this.document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhoto();
        
    }
});
// loading
getPhoto();
