var BookmarkNameInput = document.getElementById("BookmarkName");
var WebsiteURLInput = document.getElementById("WebsiteURL");

var BookmarkList = [];

if (localStorage.getItem("BookmarkContainer") !== null) {
  BookmarkList = JSON.parse(localStorage.getItem("BookmarkContainer"));

  displayData();
}

function createBookmark() {
  if (
    validationInputs(BookmarkNameInput) &&
    validationInputs(WebsiteURLInput)
  ) {
    var Bookmark = {
      name: BookmarkNameInput.value,
      url: WebsiteURLInput.value,
    };
    BookmarkList.push(Bookmark);
    displayData();
    localStorage.setItem("BookmarkContainer", JSON.stringify(BookmarkList));
    clearForm();
  }
}

function clearForm() {
  BookmarkNameInput.value = null;
  WebsiteURLInput.value = null;

  BookmarkNameInput.classList.remove("is-valid");
  WebsiteURLInput.classList.remove("is-valid");
}

function displayData() {
  var cartona = " ";
  for (var i = 0; i < BookmarkList.length; i++) {
    cartona += `<tr>
      <td>${i + 1}</td>
      <td>${BookmarkList[i].name}</td>
      <td>
      <a href='${
        BookmarkList[i].url
      }' target="_blank"> <button class="btn  text-light btn-sm px-3 my-color">
      <span><i class="fa-solid fa-eye"></i></span> Visit
    </button></a>
      </td>
      <td>
        <button onclick="deleteItem(${i})" class="btn btn-danger btn-sm px-3">
          <span><i class="fa-solid fa-trash-can"></i></span> Delete
        </button>
      </td>
    </tr>`;
  }
  document.getElementById("tableData").innerHTML = cartona;
}

function deleteItem(indexItem) {
  BookmarkList.splice(indexItem, 1);
  displayData();
  localStorage.setItem("BookmarkContainer", JSON.stringify(BookmarkList));
}

function validationInputs(element) {
  var text = element.value;
  var regex = {
    BookmarkName: /^(.*[a-z]){3}$/i,
    WebsiteURL:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  };
  if (regex[element.id].test(text) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}
