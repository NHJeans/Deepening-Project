export const selectPlantImg = (category: string) => {
  switch (true) {
    case category.endsWith("응원글"):
      return "/images/plants/pot.png";
    case category.endsWith("고백글"):
      return "/images/plants/rose.png";
    case category.endsWith("의견글"):
      return "/images/plants/aloe.png";
    case category.endsWith("위로글"):
      return "/images/plants/cactus.png";
    case category.endsWith("축하글"):
      return "/images/plants/sunflower.png";
    default:
      return "";
  }
};
