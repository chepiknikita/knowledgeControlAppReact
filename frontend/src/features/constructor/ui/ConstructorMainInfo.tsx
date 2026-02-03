import { TextField } from "@mui/material";
import React, { useCallback } from "react";
import UploadImageButton from "./image/UploadImageButton";
import { Box } from "@mui/system";

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
    (e: React.ChangeEvent<HTMLInputElement>) => onChangeName(e.target.value),
    [onChangeName],
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChangeDescription(e.target.value),
    [onChangeDescription],
  );

  return (
    <Box sx={{ px: 4 }}>
      <UploadImageButton
        image={image}
        onUploadFile={onUploadImage}
        onUploadBase64={onUploadImageBase64}
      />
      <TextField
        placeholder="Название"
        value={name}
        name="name"
        fullWidth
        size="small"
        sx={{ my: 1 }}
        onChange={handleNameChange}
      />
      <TextField
        placeholder="Описание"
        value={description}
        multiline
        name="description"
        fullWidth
        size="small"
        sx={{ my: 1 }}
        onChange={handleDescriptionChange}
      />
    </Box>
  );
}
