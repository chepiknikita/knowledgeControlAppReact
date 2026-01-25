import { memo, useCallback } from "react";
import { Avatar, ButtonBase } from "@mui/material";

interface Props {
  src?: string;
  onChange: (file: File) => void;
}

export const AvatarUploader = memo(({ src, onChange }: Props) => {
 const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onChange(file);
    },
    [onChange]
  );

  return (
    <ButtonBase component="label" sx={{ borderRadius: "40px" }}>
      <Avatar src={src} sx={{ width: 256, height: 256, mb: 2 }} />
      <input type="file" hidden accept="image/*" onChange={handleFileChange} />
    </ButtonBase>
  );
});
