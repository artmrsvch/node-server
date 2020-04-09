import React from "react";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";


const SettingsFormGroup = ({ handleChange, values, label }) => (
  <>
    <Typography variant="h5" component="h3" gutterBottom>
      {label}
    </Typography>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={values.C}
            value="create"
            onChange={handleChange("C")}
          />
        }
        label="Создание"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.R}
            value="read"
            onChange={handleChange("R")}
          />
        }
        label="Чтение"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.U}
            value="update"
            onChange={handleChange("U")}
          />
        }
        label="Редактирование"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={values.D}
            value="delete"
            onChange={handleChange("D")}
          />
        }
        label="Удаление"
      />
    </FormGroup>
  </>
);

export default SettingsFormGroup