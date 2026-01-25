import { memo } from "react";
import { Box, TextField } from "@mui/material";
import { DateRange } from "@mui/x-date-pickers-pro";
import { Dayjs } from "dayjs";
import DykDatePicker from "../../../components/UI/datePickers/DykDatePicker";

interface Props {
  search: string;
  date: DateRange<Dayjs>;
  onSearchChange: (value: string) => void;
  onDateChange: (value: DateRange<Dayjs>) => void;
}

export const TasksFilters = memo(
  ({ search, date, onSearchChange, onDateChange }: Props): JSX.Element => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 1,
        }}
      >
        <DykDatePicker
          value={date}
          sx={{ width: 300, mr: 2 }}
          onChange={onDateChange}
        />

        <TextField
          value={search}
          placeholder="Поиск"
          size="small"
          sx={{ width: 300 }}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Box>
    );
  }
);
