import { useCallback, useState } from "react";

type ConfirmConfig<A extends string, P> = {
  messages: Record<A, string>;
  onConfirm: (action: A, payload: P | null) => void;
};

export function useConfirmAction<A extends string, P>({
  messages,
  onConfirm,
}: ConfirmConfig<A, P>) {
  const [action, setAction] = useState<A | null>(null);
  const [payload, setPayload] = useState<P | null>(null);

  const open = action !== null;

  const openDialog = useCallback((nextAction: A, nextPayload?: P) => {
    setAction(nextAction);
    setPayload(nextPayload ?? null);
  }, []);

  const closeDialog = useCallback(() => {
    setAction(null);
    setPayload(null);
  }, []);

  const handleConfirm = useCallback(() => {
    if (action) {
      onConfirm(action, payload);
    }
    closeDialog();
  }, [action, payload, onConfirm, closeDialog]);

  return {
    action,
    open,
    message: action ? messages[action] : "",
    openDialog,
    closeDialog,
    handleConfirm,
  };
}
