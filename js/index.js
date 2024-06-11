let BoxImg = document.getElementById("BoxImg");
let Img = document.getElementById("Img");
let Upload = document.getElementById("Upload");


let Saturate = document.getElementById("Saturate");
let Contrast = document.getElementById("Contrast");
let Brightness = document.getElementById("Brightness");
let Sepia = document.getElementById("Sepia");
let Grayscale = document.getElementById("Grayscale");
let Blur = document.getElementById("Blur");
let hueRotate = document.getElementById("hue-rotate");


let Download = document.getElementById("Download");
let Reset = document.getElementById("Reset");

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d')




// ==========================================================================================
window.onload = function () {
    BoxImg.style.display = 'none';
    Download.style.display = 'none';
    Reset.style.display = 'none';
}

Upload.onchange = function () {
    // console.log("Upload");

    resetValue();
    BoxImg.style.display = 'block';
    Download.style.display = 'block';
    Reset.style.display = 'block';

    let file = new FileReader();
    file.readAsDataURL(Upload.files[0]);
    file.onload = function () {
        Img.src = file.result;
    }
    Img.onload = function (){
        canvas.width = Img.width;
        canvas.height = Img.height;
        ctx.drawImage(Img,0,0,canvas.width,canvas.height);
        Img.style.display = 'none';
    }
}

// ==========================================================================================
let filters = document.querySelectorAll(".box-filters ul li input");
console.log(filters);

filters.forEach(filter => {
    filter.addEventListener("input", function () {
        ctx.filter = `
            Saturate(${Saturate.value}%)
            Contrast(${Contrast.value}%)
            Brightness(${Brightness.value}%)
            Sepia(${Sepia.value}%)
            Grayscale(${Grayscale.value})
            Blur(${Blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(Img,0,0,canvas.width,canvas.height);

    })
});

// ==========================================================================================
function resetValue(){  // ترجع تاني inputو الخصائص ال filterل صوره تانيه يجيب الصوره من غير Upload ده علشان لم اعمل 
    Img.style.filter = 'none';
    Saturate.value="100";
    Contrast.value="100";
    Brightness.value="100";
    Sepia.value="0";
    Grayscale.value="0";
    Blur.value="0";
    hueRotate.value="0";
}

Reset.addEventListener("click" , function(){
    resetValue()
})

Download.addEventListener("click" , function(){
    Download.href = canvas.toDataURL();

})