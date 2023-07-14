
import { format } from "date-fns/esm";
import { fr } from "date-fns/esm/locale";

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

export const dateInFrench = (date) => {
  var journée = format(date, "EEEE", { locale: fr });
  var moisComplet = format(date, "MMMM", { locale: fr });
  var moisPartiel = format(date, "MMM", { locale: fr });

  return {
    journée: journée,
    jour:date.getDate(),
    année:date.getFullYear(),
    moisComplet: moisComplet,
    moisPartiel: moisPartiel,
    heure: date.getHours(),
    minute:date.getMinutes()
  };
};
