import React from "react";
import { Box } from "@mui/material";
import ButtonUploadFile from "../../../../components/uploadFile/ButtonUploadFile";
import { ImagePreview } from "./ImagePreview";
import { UploadPlaceholder } from "./UploadPlaceholder";

interface Props {
  image?: string;
  onUploadFile: (file: File) => void;
  onUploadBase64: (base64: string) => void;
}

export default function UploadImageButton({
  image,
  onUploadFile,
  onUploadBase64,
}: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ButtonUploadFile
        uploadFile={onUploadFile}
        uploadImageBase64={onUploadBase64}
      >
        <Box
          sx={{
            width: 500,
            height: 200,
            m: 1,
          }}
        >
          {image ? <ImagePreview src={image} /> : <UploadPlaceholder />}
        </Box>
      </ButtonUploadFile>
    </Box>
  );
}