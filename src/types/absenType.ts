export type absensDataType = {
    id: string,
    tanggal: string,
    status:string,
    absens_status: boolean
}

export type absensTodayDataType= {
    id: string,
    name: string,
    status:string
    tanggal:string
    absen_status: boolean
    user:{
        id: string,
        name: string
        email: string
    }
}