import React from "react";
import { useNavigate } from "react-router-dom";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import { ITask } from "../../entities/task";
import { ConstructorStep, useTaskConstructor } from "./hooks/useTaskConstructor";
import CardWrapper from "../../components/wrappers/CardWrapper";
import ConstructorResult from "./ui/ConstructorResult";
import ConstructorStepper from "./ui/ConstructorStepper";
import ConstructorFinish from "./ui/ConstructorFinish";
import ConstructorMainInfo from "./ui/ConstructorMainInfo";
import ConstructorQuestions from "./ui/ConstructorQuestions";
import ConstructorPreview from "./ui/ConstructorPreview";
import ConstructorActions from "./ui/ConstructorActions";

const steps = ["Описание", "Редактирование вопросов", "Проверка"];

interface Props {
  initialData?: Partial<ITask>;
}

export default function TaskConstructor({ initialData }: Props) {
  const navigate = useNavigate();

  const { task, step, loading, error, success, canGoNext, actions } =
    useTaskConstructor(initialData);

  if (success) {
    return (
      <CardWrapper>
        <CardContent
          sx={{ height: "500px", display: "flex", flexDirection: "column" }}
        >
          <ConstructorResult
            title="Тест успешно сформирован"
            onHome={() => navigate("/")}
          />
        </CardContent>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper>
      <CardContent
        sx={{ height: "500px", display: "flex", flexDirection: "column" }}
      >
        <ConstructorStepper
          title={task.id ? "Редактирование" : "Создание"}
          steps={steps}
          activeStep={step}
        />
        {step === steps.length ? (
          <ConstructorFinish
            disabled={step === 0}
            loading={loading}
            error={error}
            onSave={actions.saveTask}
            handleBack={actions.prevStep}
          />
        ) : (
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Box sx={{ flex: 1, overflowY: "scroll", height: "100%" }}>
              {step === ConstructorStep.Description && (
                <ConstructorMainInfo
                  name={task.name}
                  description={task.description}
                  image={task.imageBase64}
                  onChangeName={(v) => actions.setField("name", v)}
                  onChangeDescription={(v) =>
                    actions.setField("description", v)
                  }
                  onUploadImage={(v) => actions.setField("image", v)}
                  onUploadImageBase64={(v) =>
                    actions.setField("imageBase64", v)
                  }
                />
              )}

              {step === ConstructorStep.Questions && (
                <ConstructorQuestions
                  questions={task.questions}
                  onAddQuestion={actions.addQuestion}
                  onEditQuestion={actions.addQuestion}
                />
              )}

              {step === ConstructorStep.Preview && (
                <ConstructorPreview task={task} />
              )}
            </Box>

            <ConstructorActions
              textApplyBtn={step === steps.length - 1 ? "Завершить" : "Далее"}
              disabledPrev={step === 0}
              disabledNext={!canGoNext}
              onBack={actions.prevStep}
              onNext={actions.nextStep}
            />
          </Box>
        )}
      </CardContent>
    </CardWrapper>
  );
}
