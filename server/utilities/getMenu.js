import getMeal from './getMeal';

const getMenu = menu => new Promise((resolve) => {
  menu.forEach((meal) => {
    getMeal(meal.mealId).then((mealdata) => {
      resolve(mealdata);
    });
  });
});
export default getMenu;
