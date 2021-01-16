/*
Adding Search Funcionalities
*/
function Search_by_ID(value) {
  const search_item = value;
  const span_items = document.querySelectorAll(".table-success .t_id");
  span_items.forEach(function (item) {
    if (item.textContent.toLowerCase().indexOf(search_item) != -1) {
      item.closest("tr").style = "display: hidden";
    } else {
      item.closest("tr").style = "display:none";
    }
  });
}

const element1 = document.querySelector(".search"); //id
const element2 = document.querySelector("#search"); //class

document.body.addEventListener("keyup", (event) => {
  console.log(event.target, event);
  if (event.target == element1) {
    Search_by_ID(element1.value);
  } else if (event.target == element2) {
    Search_by_ID(element2.value);
  }
});