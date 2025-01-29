class UI{

    //ui items set
    constructor(){
        this.minute=document.querySelector("#minute")
        this.hour=document.querySelector("#hour")
        this.second=document.querySelector("#second")
        this.alarm=document.querySelector("#alarm");
        this.container=document.querySelector(".app-container")
        this.btn=document.querySelector(".btn")
        this.alarmMinute=document.querySelector("#minuteselect")
        this.alarmHour=document.querySelector("#hourselect")
        this.hayaletbtn=document.querySelector("#hayalet")
        this.dutyList=document.querySelector(".duty-list")
        this.dutyForm=document.querySelector(".duty-form")
        this.border=document.querySelector(".clock");

        this.filterbuton=document.querySelectorAll(".filter-buttons button")

        this.clearbtn=document.querySelector(".clear")
    }
}