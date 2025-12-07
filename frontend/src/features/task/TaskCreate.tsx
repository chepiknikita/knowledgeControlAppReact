import React, { useState } from "react";
import CardWrapper from "./components/CardWrapper";
import { Box, Button, CardContent } from "@mui/material";
import CreateTaskDescription from "./components/creation/CreateTaskDescription";
import DykTypography from "../../components/UI/typography/DykTypography";
import CreateTaskQuestions from "./components/creation/CreateTaskQuestions";
import { QuestionItem } from "./types/task";
import CreateTaskReady from "./components/creation/CreateTaskReady";
import CreateTaskStepper from "./components/creation/CreateTaskStepper";
import CreateTaskActions from "./components/creation/CreateTaskActions";
import PreviewTask from "./components/PreviewTest";
import { ApiFactory } from "../../api";
import { TaskCreating } from "../../api/interfaces/tasks";
import { useNavigate } from "react-router-dom";

const taskService = ApiFactory.createTaskService();

const steps = ["Описание", "Создание вопросов", "Проверка"];

const enum StepName {
  Description,
  Questions,
  Preview,
}

export default function TaskCreate() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState("");
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [hasBeenCreated, setHasBeenCreated] = useState<boolean>(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: { name: string; description: string }) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSaveQuestion = (question: QuestionItem) => {
    setQuestions([...questions, question]);
  };

  const onSave = async () => {
    const task: TaskCreating = {
      ...formData,
      userId: 1,
      image,
      questions,
    };
    await taskService.create(task);
    setHasBeenCreated(true);
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const disabledStep = (step: number) => {
    switch (step) {
      case 0:
        return formData.name && formData.description;
      case 1:
        return questions.length > 4;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const onHome = () => {
    navigate("/");
  };

  const resetAndCreateTask = () => {
    setHasBeenCreated(false);
    setFormData({ name: "", description: "" });
    setActiveStep(0);
    setImage("");
    setQuestions([]);
  };

  return (
    <CardWrapper>
      <CardContent
        sx={{ height: "500px", display: "flex", flexDirection: "column" }}
      >
        {hasBeenCreated ? (
          <Box>
            <DykTypography
              text="Тест успешно создан"
              variant="body1"
              align="center"
              sx={{ my: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={onHome}
                sx={{
                  textDecoration: "none",
                  textTransform: "none",
                  backgroundColor: "white",
                  mx: 1,
                  color: "black",
                }}
              >
                Перейти на главную
              </Button>
              <Button
                onClick={resetAndCreateTask}
                sx={{
                  textDecoration: "none",
                  textTransform: "none",
                  backgroundColor: "white",
                  mx: 1,
                  color: "black",
                }}
              >
                Создать еще
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <CreateTaskStepper steps={steps} activeStep={activeStep} />
            {activeStep === steps.length ? (
              <CreateTaskReady
                disabled={activeStep === 0}
                handleBack={handleBack}
                onSave={onSave}
              />
            ) : (
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flex: 1 }}>
                  {activeStep === StepName.Description && (
                    <CreateTaskDescription
                      name={formData.name}
                      description={formData.description}
                      inputName={handleChangeInput}
                      inputDescription={handleChangeInput}
                      image={image}
                      uploadImage={setImage}
                    />
                  )}
                  {activeStep === StepName.Questions && (
                    <Box>
                      <DykTypography
                        text="Cоздайте вопросы для теста"
                        align="center"
                        variant="body2"
                      />
                      <CreateTaskQuestions
                        questions={questions}
                        onSaveQuestion={onSaveQuestion}
                      />
                    </Box>
                  )}
                  {activeStep === StepName.Preview && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <DykTypography
                        text=" Ваш тест почти готов, можете посмотреть что получилось!"
                        align="center"
                        sx={{ mb: 2 }}
                        variant="body2"
                      />
                      {/* <PreviewTask key={item.id} task={item} /> */}
                    </Box>
                  )}
                </Box>
                <CreateTaskActions
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
