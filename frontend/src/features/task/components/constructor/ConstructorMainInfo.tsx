import { TextField } from "@mui/material";
import React from "react";
import ButtonUploadImage from "../ButtonUploadImage";

interface Props {
  name: string;
  description: string;
  image: string;
  inputName: (str: string) => void;
  inputDescription: (str: string) => void;
  uploadImage: (str: File) => void;
  uploadImageBase64: (str: string) => void;
}

export default function ConstructorMainInfo({
  name,
  description,
  image,
  inputName,
  inputDescription,
  uploadImage,
  uploadImageBase64,
}: Props) {
  const changeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputName(e.target.value);
  };

  const changeInputDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDescription(e.target.value);
  };
  return (
    <>
      <ButtonUploadImage image={image} uploadImage={uploadImage} uploadImageBase64={uploadImageBase64} />
      <TextField
        placeholder="Название"
        value={name}
        name="name"
        onChange={changeInputName}
        fullWidth
        size="small"
        sx={{ my: 1 }}
      />
      <TextField
        placeholder="Описание"
        value={description}
        multiline
        name="description"
        fullWidth
        onChange={changeInputDescription}
        size="small"
        sx={{ my: 1 }}
      />
    </>
  );
}
