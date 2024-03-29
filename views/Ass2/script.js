var hoverBox = document.getElementsByClassName("infodata");
for(let i=0;i<hoverBox.length;i++){
    hoverBox[i].addEventListener("mouseover",()=>{
        hoverBox[i].style.backgroundColor="#0A2259";
       // console.log(hoverBox[i]);
        hoverBox[i].childNodes[1].classList.add("inInfodataAdd");
        hoverBox[i].childNodes[5].classList.remove("button22");
        hoverBox[i].childNodes[5].classList.add("button21");
        hoverBox[i].childNodes[3].style.color="white";
        hoverBox[i].childNodes[1].childNodes[1].childNodes[3].style.color="#AAAAAA";
    });
    hoverBox[i].addEventListener("mouseout",()=>{
        hoverBox[i].style.backgroundColor="white";
      //  console.log(hoverBox[i]);
        hoverBox[i].childNodes[1].classList.remove("inInfodataAdd");
        hoverBox[i].childNodes[5].classList.remove("button21");
        hoverBox[i].childNodes[5].classList.add("button22");
        hoverBox[i].childNodes[3].style.color="#0A2259";
        hoverBox[i].childNodes[1].childNodes[1].childNodes[3].style.color="#6A88B6";
    });
    
}
function pluscarosual(){
    const prev = document.getElementById('btn1');
    const next= document.getElementById('btn2');
    const list = document.getElementById('item-list');
    prev.addEventListener("click",()=>{
        list.scrollLeft-=(30);
    });
    next.addEventListener("click",()=>{
        list.scrollLeft+=(30);
    })
}
var elm = "wordpress";
function wordclick(id){
    let old=document.getElementById(elm);
    old.style="display:none";
    var newelm=document.getElementById(id);
    newelm.style="display:block";
    elm=id;
}