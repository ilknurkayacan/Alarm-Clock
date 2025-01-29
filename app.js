var second=0;
var minute=0;
var hour=0;
var d=new Date();


const ui=new UI();

let dk;
let saat;
let countColor=0;

document.addEventListener("DOMContentLoaded",function(){

    loadItem();
    divAlert();
    ui.dutyForm.addEventListener("submit", handleForm);

    for(let btn of ui.filterbuton){
        btn.addEventListener("click", handlebuttonSelect);
    }
    ui.clearbtn.addEventListener("click", clearItem);
})

//itemı komple sil
function clearItem(){
    ui.dutyList.innerHTML="";
    localStorage.clear("shoppinglist")
    divAlert();
}


function divAlert(){
    const isEmpty=ui.dutyList.querySelectorAll("li").length === 0;

    const alertd=document.querySelector(".alert")
    const btnkapat=document.querySelector(".filter-buttons");

    alertd.classList.toggle("d-none", !isEmpty);
    btnkapat.classList.toggle("d-none", isEmpty);
    ui.clearbtn.classList.toggle("d-none", isEmpty);
      
}
//take the clock value
ui.alarmHour.addEventListener("click",()=>{
    saat=ui.alarmHour.value;
    console.log(saat)
})

//take the minute value
ui.alarmMinute.addEventListener("click",()=>{
    dk=ui.alarmMinute.value
    console.log(dk)
})

//control the alarm values
ui.btn.addEventListener("click",()=>{
    alert(`Alarm ${saat}:${dk} olarak ayarlanmıştır`)
})

//set the alarm
setInterval(
    function(){
        countColor++;
        d=new Date();
        second=d.getSeconds()*6;
        minute=d.getMinutes()*6;
        hour=d.getHours()*30 + Math.round(minute/12);
        ui.second.style.transform="rotate("+second+"deg)"
        ui.hour.style.transform="rotate("+hour+"deg)"
        ui.minute.style.transform="rotate("+minute+"deg)"

        if(d.getHours() == saat && d.getMinutes() == dk){
            if(!ui.alarm.classList.contains("dur")){
                console.log("calısıyor")
                //ui.border.classList.toggle("clock-change")
                ui.alarm.play();
            }
            else{
                ui.hayaletbtn.click();
            }
  
        }else{
            ui.alarm.classList.remove("dur")
        }
        if(countColor==59){
           // ui.border.classList.toggle("clock-change")
            countColor = 0;
        }
        
    },1000)

    //stop the alarm
 ui.hayaletbtn.addEventListener("click",()=>{
    ui.alarm.classList.add("dur")
    ui.alarm.pause();

 })




//add a duty
const createEleman=(item)=>{
    
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked=item.completed;
    checkbox.addEventListener("change", changeSlect)

    const div=document.createElement("div");
    div.textContent=item.name;
    div.id="divname";
    div.classList.add("item-name")
    div.addEventListener("click", openEditable);
    //editi kapatmak için bllur eventi kullanılır
    div.addEventListener("blur", closeEditMode)
    //enter tuşuna basmayı engelleme
    div.addEventListener("keydown", closeEnter)


    const deleteicon=document.createElement("i");
    deleteicon.className="fa-solid fa-x text-danger delete-icon";



    const li=document.createElement("li");
    li.className="border rounded p-3 mb-1";

    li.appendChild(checkbox);
    li.appendChild(div);
    li.appendChild(deleteicon);

    return li;

}

//add item
function addItem(item){
    const x=lastindex();
    console.log(x);
    const li=createEleman({
        id:lastindex(),
        name:item,
        completed:false,
    });
    
    ui.dutyList.appendChild(li)
    item.value="";
    document.querySelector("#nameinput").value="";

    updateOnlist();
    localStoreShop();
    divAlert();

}
function lastindex(){
    return ui.dutyList.childElementCount+1
}

//control the input value
function handleForm(e){
    e.preventDefault();

    const inputtext=document.getElementById("nameinput");
    if(inputtext.value.trim().length === 0)
    {
        alert("Boş bıraktınız");
        return;

    }
    addItem(inputtext.value);
}

//delete İtem
function deleteItem(e){
    const li=e.target.parentElement;
    ui.dutyList.removeChild(li)
    localStoreShop();
    divAlert()
}

//change duty pozition
function changeSlect(e){
    console.log(e.target)
    console.log(e.target.parentElement)
    const li=e.target.parentElement;
    li.toggleAttribute("item-completed", e.target.checked)

    updateOnlist();
    localStoreShop();

}

//edit the item
function openEditable(e){
    const li=e.target.parentElement;
    if(li.hasAttribute("item-completed") == false){
        e.target.contentEditable=true;
    }
}
function closeEditMode(e){
    e.target.contentEditable == false

    localStoreShop();

}

function closeEnter(e){
    if(e.key == "Enter")
    {
        e.preventDefault();
        closeEditMode(e);
    }
}

//elemanların konumlarını düzenle

function handlebuttonSelect(e){

    e.target.classList.add("red")

}
//butonları seçili olana göre revize ettik
function handlebuttonSelect(e){
    const filterbut=e.target;

    for(let btn of ui.filterbuton){
        btn.classList.add("btn-secondary")
        btn.classList.remove("btn-primary")
    }
    filterbut.classList.add("btn-primary")
    filterbut.classList.remove("btn-secondary")

    buttonFiltrele(filterbut.getAttribute("item-filter"))


}

//butonlar filtrele
function buttonFiltrele(filterbuton){
    const li_item=ui.dutyList.querySelectorAll("li");
    for(let lix of li_item){
        lix.classList.remove("d-flex");
        lix.classList.remove("d-none");

        const complet=lix.hasAttribute("item-completed");

        if(filterbuton =="incompleted"){
            lix.classList.toggle(complet ? "d-none" : "d-flex")
        }
        else if(filterbuton == "completed"){
            lix.classList.toggle(complet ? "d-flex" : "d-none")
        }else{
            lix.classList.toggle("d-flex")
        }
    }

}
//liste güncelle
function updateOnlist(){
    const activebuton=document.querySelector(".btn-primary[item-filter]");
    buttonFiltrele(activebuton.getAttribute("item-filter"))
}

//itemlerı tarayıcıda depolama
function localStoreShop(){
    
    const li_item=ui.dutyList.querySelectorAll("li");
    const listed=[];

    for(let li of li_item){

        const id=li.getAttribute("item-id");
        const name=li.querySelector(".item-name").textContent;
        const completed=li.hasAttribute("item-completed");

        listed.push({id,name,completed});
    }

    localStorage.setItem("dutylist", JSON.stringify(listed))
}

//bellekteki verileri yukleme
function loadItem(){

    const listed=JSON.parse(localStorage.getItem("dutylist")) || [];

    for(let li of listed){
        const item=createEleman(li);
        ui.dutyList.appendChild(item);
    }
}