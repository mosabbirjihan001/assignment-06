const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
};

const loadAllPets = async () => {
  loadingSpinner(true);
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  setTimeout(() => {
    displayPets(data.pets);
    storedPetData = data.pets;
    loadingSpinner(false);
  }, 2000);
};

const loadPetsByCategory = async (category) => {
  // remove active button classes if exists
  removeActiveClasses();
  // show active button
  addActiveClasses(category);

  loadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await res.json();
  setTimeout(() => {
    displayPets(data.data);
    storedPetData = data.data;
    loadingSpinner(false);
  }, 1000);
};
const loadPetsDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  console.log(data);
};

const displayCategories = (data) => {
  const categoryContainer = document.getElementById("pet-categories");
  data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="btn-${category.category}" onclick="loadPetsByCategory('${category.category}')" class="btn category-btn bg-white flex items-center gap-4 rounded-xl border px-14 py-4 cursor-pointer h-full"> 
        <img class="w-10" src="${category.category_icon}" />
        <p class="text-xl font-bold">${category.category}</p>
        </button>
        `;
    categoryContainer.appendChild(div);
  });
};

const displayPets = (data) => {
  const petContainers = document.getElementById("all-pets");

  if(data.length === 0 ){
    petContainers.classList.remove('grid')
    petContainers.innerHTML = `
    <div class="bg-gray-100 text-center p-20 rounded-xl space-y-4">
    <img class="mx-auto" src="images/error.webp" />
    <h3 class="text-3xl font-semibold">No data Available !!</h3>
    <p class="text-gray-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    </div>
    `

    return
  }
  else{
    petContainers.classList.add('grid')
  }


  data.forEach((pet) => {
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "gap-2",
      "p-4",
      "border",
      "rounded-xl",
      "font-bold"
    );
    div.innerHTML = `
        <img class="h-36 w-full rounded-xl object-cover" src="${pet.image}" />
        <h3 class="text-xl">${pet.pet_name}</h3>
        <p class="text-sm text-gray-700">Breed : ${
          pet.breed ? pet.breed : "Not Available"
        }</p>
        <p class="text-sm text-gray-700">Birth : ${
          pet.date_of_birth ? pet.date_of_birth : "Not Available"
        }</p>
        <p class="text-sm text-gray-700">Gender : ${
          pet.gender ? pet.gender : "Not Available"
        }</p>
        <p class="text-sm text-gray-700">Price : ${
          pet.price ? "$" + pet.price : "Not Available"
        }</p>
            
            <hr class="my-2" />

            <div class="flex justify-between items-center px-2">

            <button onclick="like('${
              pet.image
            }')" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4"><i class="fa-regular fa-thumbs-up"></i></button>
            <button onclick="adoptModal(this)" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4">Adopt</button>
            <button onclick="loadPetsDetails('${pet.petId}')" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4">Details</button>

            </div>
        `;
    petContainers.appendChild(div);
  });
};

// adopt button
const adoptModal = (event) => {
  let count = 3;
  const countContainer = document.getElementById("countdown-container");
  countContainer.innerText = count;
  my_modal_4.showModal();
  const interval = setInterval(() => {
    count--;
    if (count !== 0) countContainer.innerText = count;
    if (count < 1) {
      clearInterval(interval);
      my_modal_4.close();
      event.textContent = "Adopted";
      event.disabled = true;
    }
  }, 1000);
};

loadCategories();
loadAllPets();
