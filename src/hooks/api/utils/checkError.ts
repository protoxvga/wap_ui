import { sessionExpiredNotification } from "components/notifications/errors";

import { NextRouter } from "next/router";

export const checkError = (error: any, router: NextRouter) => {
    if (error.status === 401) {
        router.replace("/login")
        sessionExpiredNotification();
    } else if (error.status === 403) {
        router.replace("/403")
    } else if (error.status === 500) {
        router.replace("/500")
    } else if (error.status === "FETCH_ERROR") {
        router.replace("/502")
    }
}