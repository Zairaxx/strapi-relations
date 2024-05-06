let getData = async (url) => {
  let response = await axios.get(url);
  return response.data;
};

let loadPage = async () => {
  let dishes = await getData("http://localhost:1337/api/dishes?populate=*");
  console.log(dishes);

  dishes.data.forEach((dish) => {
    document.querySelector(
      "#menu"
    ).innerHTML += `<li><p>${dish.attributes.name} - ${dish.attributes.price} kr - ${dish.attributes.category.data?.attributes.name}</p>
    <img  height="100" src="http://localhost:1337${dish.attributes.picture.data?.attributes.url}" />
    </li>`;
  });
};

let createDish = async () => {
  let inputName = document.querySelector("#dishName").value;
  let inputPrice = +document.querySelector("#dishPrice").value;
  let inputCategory = document.querySelector("#dishCategory").value;
  axios.post("http://localhost:1337/api/dishes", {
    data: {
      name: inputName,
      price: inputPrice,
      category: inputCategory,
      picture: "5"
    },
  });
};

loadPage();

document.querySelector("#addDish").addEventListener("click", createDish);
