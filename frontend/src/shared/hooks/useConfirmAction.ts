import { useCallback, useState } from "react";

type ConfirmConfig<A extends string> = {
  messages: Record<A, string>;
  onConfirm: (action: A) => void;
};

export function useConfirmAction<A extends string>({
  messages,
  onConfirm,
}: ConfirmConfig<A>) {
  const [action, setAction] = useState<A | null>(null);

  const open = action !== null;

  const openDialog = useCallback((nextAction: A) => {
    setAction(nextAction);
  }, []);

  const closeDialog = useCallback(() => {
    setAction(null);
  }, []);

  const handleConfirm = useCallback(() => {
    if (action) {
      onConfirm(action);
    }
    closeDialog();
  }, [action, onConfirm, closeDialog]);

  return {
    action,
    open,
    message: action ? messages[action] : "",
    openDialog,
    closeDialog,
    handleConfirm,
  };
}
