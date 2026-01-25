import { Box } from "@mui/system";
import { CardContent } from "@mui/material";
import { TaskImage } from "../../previewTask/ui/TaskImage";
import DykTypography from "../../../components/UI/typography/DykTypography";
import DykButton from "../../../components/UI/buttons/DykButton";
import { TaskActions } from "./TaskActions";
import CardWrapper from "../../../components/wrappers/CardWrapper";

type Props = {
  name: string;
  description?: string;
  image?: string;
  questionsCount: number;
  showHome?: boolean;
  onStart: () => void;
  onHome: () => void;
};

export function TaskIntro({
  name,
  description = "",
  image,
  questionsCount,
  showHome = true,
  onStart,
  onHome,
}: Props) {
  return (
    <CardWrapper>
      <Box sx={{ height: 250 }}>
        <TaskImage image={image} />
      </Box>

      <CardContent>
        <DykTypography text={name} variant="body1" />
        <DykTypography text={description} variant="body2" />
        <DykTypography
          text={`Количество вопросов — ${questionsCount}`}
          variant="body2"
        />
      </CardContent>

      <TaskActions>
        <DykButton title="Начать" onClick={onStart} />
        {showHome && <DykButton title="На главную" onClick={onHome} />}
      </TaskActions>
    </CardWrapper>
  );
}
