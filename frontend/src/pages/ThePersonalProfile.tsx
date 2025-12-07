import { Avatar, Box, ButtonBase, Divider, Pagination, TextField } from "@mui/material";
import React, { useState } from "react";
import DykTypography from "../components/UI/typography/DykTypography";
import DykButton from "../components/UI/buttons/DykButton";
import PreviewTask from "../features/task/components/PreviewTest";

export default function PersonalProfile() {
  const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(
    undefined
  );

  const [search, setSearch] = useState("");
  const items = [
    {
      id: 5,
      img: "",
      name: "test",
      description: "asdsa asdasdasd asdsadas asdasd asdasd",
      rating: 5,
      author: "unknown",
    },
    {
      id: 1,
      img: "",
      name: "test1",
      description: "asdsa asdasdasd asdsadas asdasd asdasd",
      rating: 5,
      author: "unknown",
    },
    {
      id: 2,
      img: "",
      name: "test2",
      description: "asdsa asdasdasd asdsadas asdasd asdasd",
      rating: 5,
      author: "unknown",
    },
    {
      id: 3,
      img: "",
      name: "test3",
      description: "asdsa asdasdasd asdsadas asdasd asdasd",
      rating: 5,
      author: "unknown",
    },
    {
      id: 4,
      img: "",
      name: "test4",
      description: "asdsa asdasdasd asdsadas asdasd asdasd",
      rating: 5,
      author: "unknown",
    },
  ];
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <Box sx={{ flex: 1, display: "flex" }}>
      <Box sx={{ width: "256px", mr: 5 }}>
        <ButtonBase
          component="label"
          role={undefined}
          tabIndex={-1}
          aria-label="Avatar image"
          sx={{
            borderRadius: "40px",
            "&:has(:focus-visible)": {
              outline: "2px solid",
              outlineOffset: "2px",
            },
          }}
        >
          <Avatar
            alt="Upload new avatar"
            src={avatarSrc}
            sx={{ width: 256, height: 256, mb: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            style={{
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              whiteSpace: "nowrap",
              width: "1px",
            }}
            onChange={handleAvatarChange}
          />
        </ButtonBase>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <DykTypography text="Nickname" variant="h6" />
          <DykTypography text="Количество тестов: 0" variant="body2" />
          <DykButton title="Удалить аккаунт" sx={{ my: 1 }} />
          <DykButton title="Выход" sx={{ my: 1 }} />
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box>
        <DykTypography text="Тесты" align="center" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Поиск"
            value={search}
            name="search"
            onChange={onSearch}
            size="small"
            sx={{ my: 1, width: "250px" }}
            type="text"
          />
        </Box>
        <Box>
          {items.length ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              >
              {/* {items.map((task) => (
                <PreviewTask key={task.id} task={task} />
              ))} */}
            </Box>
            <Pagination count={5} variant="outlined" shape="rounded" />
              </Box>
          ) : (
            "Список тестов пуст!"
          )}
        </Box>
      </Box>
    </Box>
  );
}
