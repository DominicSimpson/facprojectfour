# facprojectfour: Fruit Shop Shopping Cart
###### For the fourth project required as part of my application to Founders & Coders, I completed a Fruit Shop Shopping Cart. This was a complicated project to undertake, in which I learnt about the Local Storage function in Google Chrome for the first time. The project involved having two HTML pages - Index and Cart - linked to each other, as well as to the JavaScript, which included a products array that linked to each fruit item, for which there was one object.
###### The project involved a number of fuctions. The below table summarises each one.
## Table of functions

| Function           | Description | Parameter      |
| ------------------ | ----------- | -------------- | 
| onLoadCartNumbers  | checks Local Storage and adds selected items to Cart display on the screen | None |
| cartNumbers        | Displays how many items have been added to the Cart  | production, action |
| setItems           | Matches each Cart item clicked with appropriate object in products array and updates Local Storage accordingly  | product |
| totalCost          | Increments totalCost numerically as cartCost is converted to a number type  | product, action |  
| displayCart        | Cart page runs on load and displays items  | None |
| manageQuantity     | Increases or decreases quantity of item via item button on screen  | None |
| deleteButtons      | Handles deleting an item on the Cart page  | None |

###### The displayCart function generated dynamically the items added to cart, along with the price. This led to a number of issues with how the price was displayed, which was solved using the toFixed method, with an argument of the number 2 specified. This ensured that the price did not include more than two numerical digits after the decimal. However, there still appears to be a problem, whereby if the last digit in the two digits after the decimal is 0, it'll only print out the first digit. You can see that here. 

