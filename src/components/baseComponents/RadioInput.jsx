import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { muiColorsTheme as colors } from "./ColorsTheme";


/**
 *
 * @param {
*      title : *desc => string values. *content = eg.("Email")  default: true
*      color: *desc => hex values. *content = eg.("#fff") default:primary
*       value: desc => value of input. *content = eg.("value")
*      disabled : *desc => boolean value. *content = enum({true,false})   default :false
*      required : *desc => boolean value. *content = enum({true,false})   default :false
*      data : *desc => array of {name , values} object *content = eg.([{name:"name", value:"value"}])
*      labelStyle : *desc =>  additional styles *content = eg.(margin:"2px")
*      selectStyle : *desc =>  additional styles *content = eg.(margin:"2px")
*      handleChange: function
*  }
* @returns RadioInput
*/


const RadioInput = ({
  title,
  value,
  data,
  name,
  color,
  horizontal,
  handleChange,
  labelStyle,
  radioStyle 
}) => {
  return (
    <FormControl >
      <FormLabel
        sx={{
            "&, &.Mui-focused": {
              color: color ? color : colors.primary,
            },
            ...labelStyle
          }}
      >
        {title}
      </FormLabel>
      <RadioGroup
        row={horizontal}
        value={value}
        onChange={handleChange}
        name={name}
        sx={{
            ' .css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked': {
              color: color ?color:colors.primary,
            },
            ...radioStyle
          }}
      >
        {data.map((elt, id) => {
         return(
            <FormControlLabel
            value={elt.value}
            control={<Radio />}
            label={elt.name}
            key={id}
          />
         )
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
