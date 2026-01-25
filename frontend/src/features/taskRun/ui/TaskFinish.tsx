import { CardContent } from "@mui/material";
import { useTaskFinish } from "../hooks/useTaskFinish";
import { Answer } from "../../../entities/answer";
import DykTypography from "../../../components/UI/typography/DykTypography";
import DykButton from "../../../components/UI/buttons/DykButton";
import { TaskActions } from "./TaskActions";
import CardWrapper from "../../../components/wrappers/CardWrapper";

type Props = {
  answers: Answer[];
  showHome?: boolean;
  onRepeat: () => void;
  onHome: () => void;
};

export function TaskFinish({
  answers,
  showHome = true,
  onRepeat,
  onHome,
}: Props) {
  const { total, correct, message } = useTaskFinish(answers);

  return (
    <CardWrapper>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          py: 4,
        }}
      >
        <DykTypography
          text="Тест завершен!"
          variant="body1"
          sx={{ fontWeight: "bold" }}
        />
        <DykTypography text={message} variant="body2" />
        <DykTypography
          text={`Ваш результат: ${correct}/${total}`}
          variant="body2"
        />
      </CardContent>

      <TaskActions>
        <DykButton title="Повторить" onClick={onRepeat} />
        {showHome && <DykButton title="На главную" onClick={onHome} />}
      </TaskActions>
    </CardWrapper>
  );
}
