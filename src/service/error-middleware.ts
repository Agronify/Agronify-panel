import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     html: 'Something went wrong! <br>' +
            //         'Message : ' + action.payload.data.error + ' [' + action.payload.status + ']'
            // })
            console.error('RTKQ Error:', action.payload)
        }
        return next(action)
    }