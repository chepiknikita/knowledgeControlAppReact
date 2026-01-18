import React from "react";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRange, DesktopDateRangePicker } from "@mui/x-date-pickers-pro";
import { Box, SxProps } from "@mui/material";
import "dayjs/locale/ru";
import { Theme } from "@emotion/react";

interface Props {
  value: DateRange<Dayjs>;
  onChange: (e: DateRange<Dayjs>) => void;
  sx?: SxProps<Theme>;
}

export default function DykDatePicker({ value, onChange, sx }: Props) {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DesktopDateRangePicker
          value={value}
          onChange={onChange}
          format="DD.MM.YYYY"
          slotProps={{ textField: { size: "small" } }}
          sx={sx}
        />
      </LocalizationProvider>
    </Box>
  );
}
