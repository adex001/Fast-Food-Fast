import getMeal from './getMeal';

/**
 * Get Menu function retrieves all menu
 * @param {array} menu - The menu array
 */
const getMenu = menu => new Promise((resolve) => {
  menu.forEach((meal) => {
    getMeal(meal.mealId).then((mealdata) => {
      resolve(mealdata);
    });
  });
});
export default getMenu;
