import { TextField, Typography } from "@mui/material";
import React, { useCallback } from "react";
import UploadImageButton from "./image/UploadImageButton";
import { Box } from "@mui/system";

const NAME_MAX = 100;
const DESC_MAX = 300;

interface Props {
  name: string;
  description: string;
  image: string;
  onChangeName: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onUploadImage: (file: File) => void;
  onUploadImageBase64: (base64: string) => void;
}

export default function ConstructorMainInfo({
  name,
  description,
  image,
  onChangeName,
  onChangeDescription,
  onUploadImage,
  onUploadImageBase64,
}: Props) {
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= NAME_MAX) onChangeName(e.target.value);
    },
    [onChangeName],
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length <= DESC_MAX) onChangeDescription(e.target.value);
    },
    [onChangeDescription],
  );

  return (
    <Box sx={{ px: 2, pb: 1 }}>
      {/* Image upload */}
      <Box sx={{ mb: 2.5 }}>
        <Typography
          variant="caption"
          sx={{ color: "#71717A", fontWeight: 600, mb: 0.75, display: "block", letterSpacing: "0.02em" }}
        >
          ОБЛОЖКА
        </Typography>
        <UploadImageButton
          image={image}
          onUploadFile={onUploadImage}
          onUploadBase64={onUploadImageBase64}
        />
      </Box>

      {/* Name field */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Название теста"
          placeholder="Например: История России XIX века"
          value={name}
          name="name"
          fullWidth
          size="small"
          onChange={handleNameChange}
          slotProps={{ htmlInput: { maxLength: NAME_MAX } }}
        />
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "right",
            mt: 0.5,
            color: name.length >= NAME_MAX * 0.9 ? "#DC2626" : "#A1A1AA",
            transition: "color 0.2s",
          }}
        >
          {name.length}/{NAME_MAX}
        </Typography>
      </Box>

      {/* Description field */}
      <Box>
        <TextField
          label="Описание"
          placeholder="Кратко опишите, о чём этот тест..."
          value={description}
          multiline
          rows={3}
          name="description"
          fullWidth
          size="small"
          onChange={handleDescriptionChange}
          slotProps={{ htmlInput: { maxLength: DESC_MAX } }}
        />
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "right",
            mt: 0.5,
            color: description.length >= DESC_MAX * 0.9 ? "#DC2626" : "#A1A1AA",
            transition: "color 0.2s",
          }}
        >
          {description.length}/{DESC_MAX}
        </Typography>
      </Box>
    </Box>
  );
}
