import { useRecoilValue } from "recoil";

import { NotifyState, useNotify } from "ui/notify/notify.recoil";

const config = {
  success: {
    icon: "✅",
  },
  error: {
    icon: "⛔",
  },
  loading: {
    icon: "⌛",
  },
};

export function NotifyContainer() {
  const notifications = useRecoilValue(NotifyState);
  const notify = useNotify();

  return (
    <ul style={{ position: "fixed", bottom: 10, right: 10, background: 'rgba(255,255,255, 0.7)' }}>
      {notifications.map((notification) => {
        const conf = config[notification.status];

        return (
          <li
            key={notification.id}
            style={{ cursor: "pointer" }}
            onClick={() => notify.remove(notification.id)}
          >
            {conf.icon} {notification.message}{" "}
          </li>
        );
      })}
    </ul>
  );
}
