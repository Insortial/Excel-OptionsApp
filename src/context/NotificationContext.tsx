import React, { createContext, useContext, useState } from 'react';

interface NotificationType {
    notificationState: { show: boolean, success: boolean, message: string },
    setNotificationState: React.Dispatch<React.SetStateAction<{show: boolean, success: boolean, message: string}>>,
    showNotification: (message: string, success: boolean) => void
}

const NotificationContext = createContext<NotificationType | null>(null);

export function NotificationInterface() {
    const context = useContext(NotificationContext)

    if (context === null) {
        throw Error("Unusable outside of Admin Dashboard")
    }

    return context
}

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notificationState, setNotificationState] = useState<{show: boolean, success: boolean, message: string}>({show: false, success: false, message: "Example"})

    const showNotification = (message: string, success: boolean) => {
        setNotificationState({show: true, success, message})
        
        setTimeout(() => {
            setNotificationState({show: false, success: false, message: ""})
        }, 3000)
    }

    return (
        <NotificationContext.Provider value={{ notificationState, setNotificationState, showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;