import React, { useEffect, useState } from "react";
import CardWrapper from "./components/CardWrapper";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ApiFactory } from "../../api";
import { ITask, Task } from "../../entities/task";
import ConstructorResult from "./components/constructor/ConstructorResult";
import ConstructorStepper from "./components/constructor/ConstructorStepper";
import ConstructorFinish from "./components/constructor/ConstructorFinish";
import ConstructorActions from "./components/constructor/ConstructorActions";
import ConstructorPreview from "./components/constructor/ConstructorPreview";
import ConstructorQuestionsWrapper from "./components/constructor/ConstructorQuestionsWrapper";
import ConstructorMainInfo from "./components/constructor/ConstructorMainInfo";
import { Question } from "../../entities/question";

const steps = ["Описание", "Редактирование вопросов", "Проверка"];

const enum StepName {
  Description,
  Questions,
  Preview,
}

interface Props {
  initialData?: Partial<ITask>;
  loading: boolean;
}

export default function TaskConstructor({ initialData, loading = false }: Props) {
  const navigate = useNavigate();
  const taskService = ApiFactory.createTaskService();

  const [task, setTask] = useState(Task.empty());
  const [activeStep, setActiveStep] = React.useState(0);
  const [isReady, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setTask(new Task(initialData));
    }
    handleChange('userId', 1);
  }, [initialData]);

  const handleChange = (field: keyof Task, value: any) => {
    console.log('3333',task )
    setTask((prev) => {
      return new Task({ ...prev, [field]: value });
    });
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeQuestions = (value: Question) => {
    setTask((prev) => {
      return new Task({
        ...prev,
        questions: [...prev.questions, value], 
      });
    });
  };

  const onHome = () => {
    navigate("/");
  };

  const onSave = async () => {
    await taskService.create(task.toFormData());
    setReady(true);
  };

  const disabledStep = (step: number) => {
    if (task.id) return true;

    switch (step) {
      case 0:
        return task.name && task.description;
      case 1:
        return task.questions.length > 4;
      case 2:
        return true;
      default:
        return false;
    }
  };

  return (
    <CardWrapper>
      <CardContent
        sx={{ height: "500px", display: "flex", flexDirection: "column" }}
      >
        {isReady ? (
          <ConstructorResult
            title="Тест успешно сформирован"
            onHome={onHome}
          />
        ) : (
          <>
            <ConstructorStepper
              title={task.id ? "Редактирование" : "Создание"} 
              steps={steps}
              activeStep={activeStep}
            />
            {activeStep === steps.length ? (
              <ConstructorFinish
                disabled={activeStep === 0}
                onSave={onSave}
                handleBack={handleBack}
              />
            ) : (
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flex: 1 }}>
                  {activeStep === StepName.Description && (
                    <ConstructorMainInfo
                      name={task.name}
                      description={task.description}
                      image={task.imageBase64}
                      inputName={(value) => handleChange('name', value)}
                      inputDescription={(value) => handleChange('description', value)}
                      uploadImage={(value) => handleChange('image', value)}
                      uploadImageBase64={(value) => handleChange('imageBase64', value)}
                    />
                  )}
                  {activeStep === StepName.Questions && (
                    <ConstructorQuestionsWrapper
                      task={task}
                      onSave={(value) => handleChangeQuestions(value)}
                    />
                  )}
                  {activeStep === StepName.Preview && (
                    <ConstructorPreview task={task} />
                  )}
                </Box>
                <ConstructorActions
                  textApplyBtn={
                    activeStep === steps.length - 1 ? "Завершить" : "Далее"
                  }
                  disabledPrev={activeStep === 0}
                  disabledNext={!disabledStep(activeStep)}
                  handleBack={handleBack}
                  handleNext={handleNext}
                />
              </Box>
            )}
          </>
        )}
      </CardContent>
    </CardWrapper>
  );
}
