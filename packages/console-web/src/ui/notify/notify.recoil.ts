import { atom, useSetRecoilState } from "recoil";
import { useMemo } from "react";

import { nanoid } from "utils/nanoid";
import { Notification } from "ui/notify/notify.types";

export const NotifyState = atom<Notification[]>({
  key: "NotifyState",
  default: [],
});

export const useNotify = () => {
  const setNotifications = useSetRecoilState(NotifyState);

  const notify = useMemo(() => {
    const success = (message: string) => {
      setNotifications((state) => [
        { id: nanoid(), message, status: "success" },
        ...state,
      ]);
    };

    const loading = (message: string) => {
      const id = nanoid();

      setNotifications((state) => [
        { id, message, status: "loading" },
        ...state,
      ]);

      return id;
    };

    const error = (message: string) => {
      setNotifications((state) => [
        { id: nanoid(), message, status: "error" },
        ...state,
      ]);
    };

    const remove = (id: string) => {
      setNotifications((state) => state.filter((x) => x.id !== id));
    };

    return { success, loading, error, remove };
  }, []);

  return notify;
};
