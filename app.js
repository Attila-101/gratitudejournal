let noteListDiv = document.querySelector(".note-list"); 
let noteID = 1;
function Note(id, contents){
  this.id = id;
  this.contents = contents;
}

// add event listeners 
function eventListeners(){
  document.addEventListener("DOMContentLoaded", displayNotes);
  document.getElementById("add-btn").addEventListener("click", addNewNote); 
  
  noteListDiv.addEventListener("click", deleteNote);
}
eventListeners();

// get notes from storage
function getDataFromStorage(){
  return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
}

// add a new note to the list 
function addNewNote(){
  const noteContents = document.getElementById("note-contents");
  
  if(validateInput(noteContents)){
    let notes = getDataFromStorage();
    
    let noteItem = new Note(noteID, noteContents.value);
    noteID++;
    notes.push(noteItem);
    createNote(noteItem);
    
    // save notes in the local storage 
    localStorage.setItem("notes", JSON.stringify(notes));
    noteContents.value = "";
  }
  
}

//  validate input so field cannot be empty 
function validateInput(contents){
  if(contents.value !== ""){
    return true;
  }
}

// create a new note div and add the date of creation
function createNote(noteItem){
  let date = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const div = document.createElement("div");
  div.classList.add("note-item");
  div.setAttribute("data-id", noteItem.id);
  div.innerHTML = `
        <p class="date">${date.toLocaleString('en-US', options)}</p> 
        <p>${noteItem.contents}</p>
        <button type = "button" class = "delete-btn">Delete</buttton>
  `;
  noteListDiv.insertBefore(div, noteListDiv.firstChild);
}

// display all the notes from the local storage
function displayNotes(){
  let notes = getDataFromStorage();
  if(notes.length > 0) {
    noteID = notes[notes.length - 1].id;
    noteID++;
  }else {
    noteID = 1;
  }
  notes.forEach(item => {
    createNote(item);
  });
}

// delete a note 
function deleteNote(e){
  if (e.target.classList.contains("delete-btn")) {
    
    e.target.parentElement.remove();
    let divID = e.target.parentElement.dataset.id;
    let notes = getDataFromStorage();
    let newNotesList = notes.filter(item => {
      return item.id !== parseInt(divID);
    });
    localStorage.setItem("notes", JSON.stringify(newNotesList));
  }
}