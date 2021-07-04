let data = [];

const fetchData = () => {
  //verinin çekildiği yer
  fetch("/data.json")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //json'dan okunan verinin data array'ine atanması
      data = responseData;

      //veri geldikten sonra filtreleme butonu görünür olsun
      let filterButton = document.querySelector("#filterButton");
      filterButton.setAttribute("style", "");

      //verinin html içerisinde listelendiği fonksiyon
      listData(responseData);
    })
    .catch((err) => {
      //hata yönetimi
      console.log(err);
    });
};

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
  let list = document.querySelector(".list");
  list.innerHTML = data.map((element) => {
    return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name}
            <span class='bold'>email:</span> ${element.email}
        </li>
        `;
  });
};

//verinin filtrelenmesini sağlayan fonksiyon
//TODO
const filterData = (filter) => {
  switch (filter) {
    case "isActive":
      let filteredActive = data.filter((element) => element.isActive === true);
      listData(filteredActive);
      break;
    case "isAdult":
      let filteredAge = data.filter((element) => element.isAdult === true);
      listData(filteredAge);
      break;
    case "filterName":
      let filteredName = data.filter(
        (element) => element.name[0] == nameLetter
      );
      listData(filteredName);
      break;

    default:
      break;
  }
};

const getData = () => {
  let nameFirst = document.getElementById("name").value;
  nameFirst = nameFirst.toUpperCase();
  let active = document.getElementById("isActive");
  let adult = document.getElementById("isAdult");

  if (active.checked) {
    let filteredActive = data.filter((element) => element.isActive === true);
    listData(filteredActive);
  } else if (adult.checked) {
    let filteredAdult = data.filter((element) => element.age >= 18);
    listData(filteredAdult);
  }
};
