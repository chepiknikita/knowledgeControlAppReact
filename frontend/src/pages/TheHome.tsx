import React, { useEffect, useState } from "react";
import { Box, Button, Pagination, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DykDatePicker from "../components/UI/datePickers/DykDatePicker";
import PreviewTask from "../features/task/components/PreviewTest";
import { DateRange } from "@mui/x-date-pickers-pro";
import { Dayjs } from "dayjs";
import { useTaskFilters } from "../features/task/hooks/useTaskFilters";
import { useDebounce } from "../shared/hooks/useDebounce";
import { usePaginatedTasks } from "../features/task/hooks/usePaginatedTasks";

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [date, setDate] = useState<DateRange<Dayjs>>([null, null]);

  const [page, setPage] = useState(1);
  const limit = 10;

  const debouncedSearch = useDebounce(search, 300);
  const filters = useTaskFilters(debouncedSearch, date);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const { tasks, pagination, loading } = usePaginatedTasks({
    scope: 'all',
    filters,
    page,
    limit,
  });

  return (
    <Box sx={{}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DykDatePicker
          value={date}
          sx={{ width: "300px", mr: 2 }}
          onChange={setDate}
        />
        <TextField
          placeholder="Поиск"
          value={search}
          name="search"
          size="small"
          type="text"
          sx={{ width: "300px" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <section>
        {loading ? (
          <Box textAlign="center">Загрузка...</Box>
        ) : !tasks.length ? (
          <Box
            sx={{
              margin: "16px auto",
              display: "flex",
              justifyContent: "center",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            <Box>
              Данных нет! Для создания теста перейдите в
              <Button
                onClick={() => navigate("/constructor")}
                sx={{
                  textDecoration: "none",
                  textTransform: "none",
                  backgroundColor: "white",
                  mx: 1,
                  color: "black",
                }}
              >
                Конструктор
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              my: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {tasks.map((task) => (
                <PreviewTask
                  key={task.id}
                  task={task}
                  showEdit={false}
                  handleOpen={() => navigate(`/task/${task.id}`)}
                />
              ))}
            </Box>
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                page={pagination.currentPage}
                count={pagination.totalPages}
                onChange={(_, value) => setPage(value)}
                variant="outlined"
                shape="rounded"
                sx={{ mt: "auto" }}
              />
            )}
          </Box>
        )}
      </section>
    </Box>
  );
}
