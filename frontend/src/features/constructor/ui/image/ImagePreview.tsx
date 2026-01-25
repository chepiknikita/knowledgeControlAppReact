type Props = {
  src: string;
};

export function ImagePreview({ src }: Props) {
  return (
    <img
      src={src}
      alt="uploaded"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 4,
      }}
    />
  );
}