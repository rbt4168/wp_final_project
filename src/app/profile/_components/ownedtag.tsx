import { main_theme } from "@/lib/themes";
import { Autocomplete, Box, Chip, CssBaseline, Divider, TextField, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";

export default function OwnedTags(props: any) {
  const { actionUser } = props;
  const fixedOptions: string[] = [];
  const [value, setValue] = useState(actionUser.owned_private_tag);

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        擁有的標籤 Owned Private
      </Typography>
        
      <Divider />
        
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Autocomplete
          multiple
          value={value}
          onChange={(event, newValue) => {
            setValue([
              ...fixedOptions,
              ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
            ]);
            console.log(value);
          }}
          options={[]}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                disabled={fixedOptions.indexOf(option) !== -1}
                variant="outlined" color="primary" sx={{bgcolor: "#FBF8CC"}}
              />
            ))
          }
          readOnly
          freeSolo
          sx={{ width: "80%" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="可愛的標籤們~" />
          )}
        />
      </Box>
    </ThemeProvider>
  );
}