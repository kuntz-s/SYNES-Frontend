//transformer une date pour qu'elle prenne la forme YYYY-MM-DD

export const transformDate = (date) => {
 
  var result = "";
  var actual = { day: "", month: "", year: "" };
  actual.year = date.getFullYear();
  actual.day = date.getDate();
  actual.month = date.getMonth() + 1;
  result =
    actual.year.toString() +
    "-" +
    actual.month.toString().padStart(2, "0") +
    "-" +
    actual.day.toString().padStart(2, "0");
  return result;
};
