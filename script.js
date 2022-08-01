console.log("welcome to notes app.");
showNotes();

// if user adds a note , add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click',(e)=>{
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);
    if(addTxt.value!=""){
        notesObj.push(addTxt.value);
    }
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
});


// Function to show elements from localStorage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((element,index) => {
        html+=`
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text" id="noteData">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>
            `;
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length!=0){
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to show ! Use "Add a Note" section above to add notes`;
    }
}

// Function to delete a note
function deleteNote(index){
    // console.log('I am deleting',index);
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
};


let removeAll = document.getElementById("removeAll");
removeAll.addEventListener('click',deleteAll);

function deleteAll(){
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(0,notesObj.length);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",()=>{
    let inputVal = search.value.toLowerCase();
    // console.log("Input event fired!",inputVal);
    let notesCards = document.getElementsByClassName("noteCard");
    Array.from(notesCards).forEach((element)=>{
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    });
});

let content = document.body.innerHTML;
let downloadNotes = document.getElementById("downloadNotes");
downloadNotes.addEventListener('click',()=>{
    // console.log(content);
    // let notesCards = document.getElementsByClassName("noteCard");
    // document.body.innerHTML = "";
    // for(let i = 0;i<notesCards.length;i++){
    //     document.body.innerHTML+=notesCards[i].getElementsByClassName("card-text")[0];
    // }
    // document.body.innerHTML = content;
    // console.log(content);
    window.print();
});