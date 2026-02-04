
let localDataArray = JSON.parse(localStorage.getItem("key")) || [];

themeChanger();
noteCreation();
getData(localDataArray);


function noteCreation() {

  const addButton = document.querySelector("#addButton");
  const inputItem = document.querySelector("#inputItem");
  const addNoteButton = document.querySelector("#addNoteButton");
  const doneNoteButton = document.querySelector("#doneNoteButton");

  addNoteButton.addEventListener('click', () => {

    inputItem.style.display = 'flex';
    doneNoteButton.style.display = 'block';

  });

  doneNoteButton.addEventListener('click', () => {
    inputItem.style.display = 'none';
    doneNoteButton.style.display = 'none';
  });

  addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const textInput = document.querySelector("#textInput");
    const headingInput = document.querySelector("#headingInput");

    const text = textInput.value.trim();
    const headingText = headingInput.value.trim();

    const timeDateDigit = new Date();
    const timeDigit = timeDateDigit.toLocaleTimeString();
    const dateDigit = timeDateDigit.toLocaleDateString('en-Gb').replace(/\//g, ".");


    if (text !== '' && headingText !== '') {
      const obj = {
        heading: headingText,
        text: text,
        id: Date.now(),
        date: dateDigit,
        time: timeDigit
      };

      localDataArray.push(obj);

      setData(localDataArray);

      showJournal(obj.text, obj.heading, obj.id, obj.date, obj.time)

      textInput.value = "";
      headingInput.value = "";
    }

  });


};




function setData(localDataArray) {
  localStorage.setItem("key", JSON.stringify(localDataArray));
};




function getData(localDataArray) {
  localDataArray.forEach((element, index) => {
    showJournal(element.text, element.heading, element.id, element.date, element.time);
  });
};




function showJournal(text, headingText, id, date, time) {
  const savedDiary = document.querySelector("#savedDiary");
  const diaryContainer = document.createElement("div");
  diaryContainer.setAttribute("class", "noteContainer");

  diaryContainer.innerHTML = `
                     <div class="note">
                     <span class="createdDate">${date}</span>
                     <h3 class="noteHeading">${headingText}</h3>
                     <p class="notePara">${text}</p>
                     <span class="createdTime">${time}</span>
                     </div>
                     <div class="correction">
                     <button class="noteEdit"> <img src="images/editNoteLight.svg" class=""></button>
                     <button class="noteDelete"> <img src="images/deleteLight.svg" class=""></button>
                     <button class="noteSave"> <img src="images/saveLight.svg" class=""></button>
                     </div>

                    `
  savedDiary.appendChild(diaryContainer);

  const diary = diaryContainer.querySelector(".note");
  const correction = diaryContainer.querySelector(".correction");
  const journalHeading = diaryContainer.querySelector(".noteHeading");
  const journalPara = diaryContainer.querySelector(".notePara");
  const noteEdit = diaryContainer.querySelector(".noteEdit");
  const noteDelete = diaryContainer.querySelector(".noteDelete");
  const noteSave = diaryContainer.querySelector(".noteSave");




  noteDelete.addEventListener("click", () => {

    localDataArray = localDataArray.filter((journal) => {

      return journal.id !== id;
    });

    setData(localDataArray);
    diaryContainer.remove();
  });


  noteEdit.addEventListener("click", () => {
    const headingEditInput = document.createElement("input");
    headingEditInput.setAttribute("class", "headingEdittng");
    headingEditInput.value = journalHeading.innerText;

    diary.replaceChild(headingEditInput, journalHeading);

    const paraEditInput = document.createElement("textarea");
    paraEditInput.setAttribute("class", "paraEdittng");
    paraEditInput.value = journalPara.innerText;

    diary.replaceChild(paraEditInput, journalPara);

    noteEdit.style.opacity = "0.1";
    noteEdit.disabled = true;
    noteSave.style.opacity = "1";


    noteSave.onclick = () => {

      const editableObject = localDataArray.find((element) => {

        return element.id === id;
      })
      if (editableObject) {

        if (editableObject.heading !== headingEditInput.value || editableObject.innerText !== paraEditInput.value) {

          editableObject.heading = headingEditInput.value;
          editableObject.text = paraEditInput.value;

          journalHeading.innerText = headingEditInput.value;
          journalPara.innerText = paraEditInput.value;
        }

        setData(localDataArray);
        diary.replaceChild(journalHeading, headingEditInput);
        diary.replaceChild(journalPara, paraEditInput);


        noteSave.style.opacity = "0.1";
        noteEdit.style.opacity = "1";
        noteEdit.disabled = false;
      };

    };

  });

};







function themeChanger() {
  const theme = document.querySelector("#theme");

  theme.addEventListener("mouseover", () => {
    theme.style.cursor = "pointer";
  });

  theme.addEventListener("click", () => {
    const themeData = document.body.classList;

    if (themeData.contains('dark')) {
      themeData.replace('dark', 'light');

      theme.src = "images/lightMode.svg";

    } else {
      themeData.replace('light', 'dark');

      theme.src = "images/darkMode.svg";

    };

  });

};