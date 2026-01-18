import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { ITask, Task } from "../../../entities/task";
import { Question } from "../../../entities/question";
import { ApiFactory } from "../../../api";

export enum ConstructorStep {
  Description,
  Questions,
  Preview,
}

type TaskAction =
  | { type: "INIT"; payload: Partial<ITask> }
  | { type: "SET_FIELD"; field: keyof Task; value: any }
  | { type: "ADD_QUESTION"; question: Question };

function taskReducer(state: Task, action: TaskAction): Task {
  switch (action.type) {
    case "INIT":
      return new Task(action.payload);

    case "SET_FIELD":
      return new Task({ ...state, [action.field]: action.value });

    case "ADD_QUESTION":
      return new Task({
        ...state,
        questions: [...state.questions, action.question],
      });

    default:
      return state;
  }
}

export function useTaskConstructor(initialData?: Partial<ITask>) {
  const { user } = useAuth();

  const taskServiceRef = useRef(ApiFactory.createTaskService());
  const taskService = taskServiceRef.current;

  const [task, dispatch] = useReducer(taskReducer, Task.empty());

  const [step, setStep] = useState(ConstructorStep.Description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      dispatch({ type: "INIT", payload: initialData });
    } else {
      dispatch({ type: "SET_FIELD", field: "user", value: user });
      dispatch({
        type: "SET_FIELD",
        field: "createdAt",
        value: new Date().toISOString(),
      });
    }
  }, [initialData, user]);

  const canGoNext = useMemo(() => {
    if (task.id) return true;

    switch (step) {
      case ConstructorStep.Description:
        return Boolean(task.name && task.description);

      case ConstructorStep.Questions:
        return task.questions.length > 0;

      case ConstructorStep.Preview:
        return true;

      default:
        return false;
    }
  }, [step, task]);

  const nextStep = useCallback(() => setStep((s) => s + 1), []);
  const prevStep = useCallback(() => setStep((s) => s - 1), []);

  const setField = useCallback(
    (field: keyof Task, value: any) =>
      dispatch({ type: "SET_FIELD", field, value }),
    []
  );

  const addQuestion = useCallback(
    (question: Question) =>
      dispatch({ type: "ADD_QUESTION", question }),
    []
  );

  const saveTask = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await taskService.create(task.toFormData());
      setSuccess(true);
    } catch (e: any) {
      setError(e?.message ?? "Ошибка сохранения теста");
    } finally {
      setLoading(false);
    }
  }, [task, taskService]);

  return {
    task,
    step,
    loading,
    error,
    success,
    canGoNext,

    actions: {
      nextStep,
      prevStep,
      setField,
      addQuestion,
      saveTask,
    },
  };
}
