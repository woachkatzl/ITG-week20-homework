//VARIABLES
const categoryInput = document.querySelector("#category-select");
const entityInput = document.querySelector("#entity-select");
const btn = document.querySelector(".btn");

const resultContainer = document.querySelector("#result-container");
const errorContainer = document.querySelector("#error-container");
const watingArt = document.querySelector(".artboard");

//FUNCTIONS
const getSearchResult = (category, entity) => {
    const url = "https://swapi.dev/api/" + category + "/" + entity + "/";

    return fetch(url);
};

const clearPrevResults = () => {
    if (resultContainer.firstElementChild)
        resultContainer.firstElementChild.remove();
    else if (errorContainer.firstElementChild)
        errorContainer.firstElementChild.remove();
};

const postResult = (name) => {
    const resultElement = document.createElement("p");
    resultElement.classList.add("text-center", "fs-3", "my-4");
    resultElement.textContent = `Результат поиска: ${name}`;

    resultContainer.append(resultElement);
};

const displayError = (errorMessage) => {
    const errorElement = document.createElement("p");
    errorElement.classList.add("text-center", "fs-3", "my-4", "text-danger");
    errorElement.textContent = `Ошибка! ${errorMessage}`;

    errorContainer.append(errorElement);
};

const launchSwapi = async (event) => {
    event.preventDefault();
    clearPrevResults();

    const category = categoryInput.value;
    const entity = entityInput.value;

    watingArt.classList.toggle("waiting");

    try {
        const response = await getSearchResult(category, entity);
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`); //Почему-то не работает response.statusText
        }
        else {
            const resultObject = await response.json();
            const searchResult = resultObject.name || resultObject.title;

            postResult(searchResult);
        }
    }
    catch (error) {
        console.log(error);
        displayError(error.message);
    }
    finally {
        watingArt.classList.toggle("waiting");
        categoryInput.selectedIndex = 0;
        entityInput.selectedIndex = 0;
    }
};

btn.addEventListener("click", launchSwapi);