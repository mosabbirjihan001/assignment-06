// save /store currently fetched data
let storedPetData = [];


// loading spinner
const loadingSpinner = (show) => {

    const spinner = document.getElementById('loader')
    if(show){
       spinner.classList.remove('hidden');
       document.getElementById('all-pets').innerHTML = "" ;
    }
    else{
        spinner.classList.add('hidden')
    }
}

// remove active button styles
const removeActiveClasses = () => {
    const allButtons = document.querySelectorAll('.category-btn')
    for(btn of allButtons){
        btn.classList.remove('bg-emerald-100', 'rounded-full', 'border-teal-800', 'border-2')
        btn.classList.add('rounded-xl')
    }
    
}
// add active classes
const addActiveClasses = (category) => {
    const activeButton = document.getElementById(`btn-${category}`)
    activeButton.classList.remove('rounded-xl')
    activeButton.classList.add('bg-emerald-100', 'rounded-full', 'border-teal-800', 'border-2');

}


// handle liked buttons
const like = (imgUrl) => {
    const imgContainer = document.getElementById('liked-pets')
    const div = document.createElement('div')
    div.innerHTML = `
    <img class="rounded-lg" src="${imgUrl}" /> 

    `
    imgContainer.appendChild(div);
}

// handle sort data 
const sort = () => {
    loadingSpinner(true)
    const sortedData = storedPetData.sort((a, b) => b.price - a.price)
    setTimeout(() => {
        displayPets(sortedData);
        loadingSpinner(false);
    },500)
}