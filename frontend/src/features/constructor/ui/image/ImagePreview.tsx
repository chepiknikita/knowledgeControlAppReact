import { useState } from "react";

type Props = {
  src: string;
};

export function ImagePreview({ src }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return null;
  }

  return (
    <img
      src={src}
      alt="uploaded"
      onError={() => setError(true)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 4,
      }}
    />
  );
}