const foodContainer = document.querySelector(".foodList");

const foodFactory = (food) => {
    return `
    <ul>
        <li><strong>Name: </strong>${food.name}</li>
        <li><strong>Category: </strong>${food.category}</li>
        <li><strong>Ethnicity: </strong>${food.ethnicity}</li>
        <li><strong>Ingredients: </strong>${food.ingredients}</li>
        <li><strong>Country: </strong>${food.country}</li>
        <li><strong>Calories: </strong>${food.calPerServing}</li>
        <li><strong>Fat: </strong>${food.fatPerServing}</li>
        <li><strong>Sugar: </strong>${food.sugarPerServing}</li>
    </ul>`
}

const addFoodToDom = (foodAsHTML) => {
    foodContainer.innerHTML += foodAsHTML;
}

// ========================================================
fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    // console.log(productInfo);
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    if (productInfo.product.countries) {
                        food.country = productInfo.product.countries
                    } else {
                        food.country = "no countries listed"
                    }

                    if (productInfo.product.nutriments.energy_serving) {
                        food.calPerServing = productInfo.product.nutriments.energy_serving
                    } else {
                        food.calPerServing = "no calories listed"
                    }

                    if (productInfo.product.nutriments.fat_serving) {
                        food.fatPerServing = productInfo.product.nutriments.fat_serving
                    } else {
                        food.fatPerServing = "no fat per serving listed"
                    }

                    if (productInfo.product.nutriments.sugar_serving) {
                        food.sugarPerServing = productInfo.product.nutriments.sugar_serving
                    } else {
                        food.sugarPerServing = "no sugar per serving listed"
                    }
                    console.log(food)
                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })
