import {format} from "date-fns"

export default function formatDated(date: string | Date, formatStr = 'yyyy-MM-dd'){
    return format(new Date(date), formatStr);

}