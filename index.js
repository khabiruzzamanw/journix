const userInput = document.querySelector("#inputText");
const savedDiary = document.querySelector("#savedDiary");
const getText = document.querySelector("#getText");
const headingInput = document.querySelector("#headingInput");

let localDataArray = JSON.parse(localStorage.getItem("key")) || [];

getData(localDataArray);

getText.addEventListener("click", (e) => {
  e.preventDefault();

  const text = userInput.value.trim();
  const headingText = headingInput.value.trim();


  if (text !== '' && headingText !== '') {
    const obj = {
      heading: headingText,
      text: text,
      id: Date.now()
    };

    localDataArray.push(obj);

    setData(localDataArray);

    showJournal(obj.text, obj.heading, obj.id)

    userInput.value = "";
    headingInput.value = "";
  }

});



function setData(localDataArray) {
  localStorage.setItem("key", JSON.stringify(localDataArray));
}




function getData(localDataArray) {
  localDataArray.forEach((element, index) => {
    showJournal(element.text, element.heading, element.id);
  });
}




function showJournal(text, headingText, id) {
  const diary = document.createElement("div");
  diary.setAttribute("class", "note");

  const correction = document.createElement("div");
  correction.setAttribute("class", "correction");

  const diaryContainer = document.createElement("div");
  diaryContainer.setAttribute("class", "noteContainer");

  const journalPara = document.createElement("p");
  journalPara.setAttribute("class", "notePara");
  journalPara.innerText = `${text}`;

  const journalHeading = document.createElement("h3");
  journalHeading.setAttribute("class", "noteHeading");
  journalHeading.innerText = `${headingText}`;

  const noteEdit = document.createElement("button");
  noteEdit.setAttribute("class", "noteEdit");

  const noteDelete = document.createElement("button");
  noteDelete.setAttribute("class", "noteDelete");

  const noteSave = document.createElement("button");
  noteSave.setAttribute("class", "noteSave");

  const noteEditImage = document.createElement("img");
  noteEditImage.src = "images/editNoteLight.svg";
  noteEdit.appendChild(noteEditImage);

  const noteDeleteImage = document.createElement("img");
  noteDeleteImage.src = "images/deleteLight.svg";
  noteDelete.appendChild(noteDeleteImage);

  const noteSaveImage = document.createElement("img");
  noteSaveImage.src = "images/saveLight.svg";
  noteSave.appendChild(noteSaveImage);

  diary.appendChild(journalHeading);
  diary.appendChild(journalPara);
  diaryContainer.appendChild(diary);
  diaryContainer.appendChild(correction);
  correction.appendChild(noteDelete);
  correction.appendChild(noteEdit);
  correction.appendChild(noteSave);
  savedDiary.appendChild(diaryContainer);


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

        diary.replaceChild(journalHeading, headingEditInput);
        diary.replaceChild(journalPara, paraEditInput);

        setData(localDataArray);

        noteSave.style.opacity = "0.1";
        noteEdit.style.opacity = "1";
        noteEdit.disabled = false;
      };

    };

  });

};
