const userInput = document.querySelector("#inputText");
const savedDiarySection = document.querySelector("#savedDiarySection");
const getText = document.querySelector("#getText");
const headingInput = document.querySelector("#headingInput");

let localDataArray = JSON.parse(localStorage.getItem("key")) || [];
getData(localDataArray);

getText.addEventListener("click", (e) => {
  e.preventDefault();

  const text = userInput.value;
  const headingText = headingInput.value;

  const obj = {
    heading: headingText,
    text: text,
  };

  localDataArray.push(obj);

  setData(localDataArray);

  userInput.value = "";
  headingInput.value = "";
});

function setData(localDataArray) {
  localStorage.setItem("key", JSON.stringify(localDataArray));

  getData(localDataArray);
}

function getData(localDataArray) {
  savedDiarySection.innerHTML = "";

  localDataArray.forEach((element, index) => {
    showJournal(element.text, element.heading, index);
  });
}

function showJournal(text, headingText, index) {
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
  savedDiarySection.appendChild(diaryContainer);

  noteDelete.addEventListener("click", () => {
    localDataArray.splice(index, 1);
    setData(localDataArray);
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
    noteSave.style.opacity = "1";

    noteSave.onclick = () => {
      journalHeading.innerText = headingEditInput.value;
      journalPara.innerText = paraEditInput.value;

      localDataArray[index].heading = headingEditInput.value;
      localDataArray[index].text = paraEditInput.value;

      setData(localDataArray);

      noteSave.style.opacity = "0.1";
    };
  });
}
