const initialState = {
    networks: ["MSC1", "MSC2"],
    protocals: ["MAP", "CAMEL", "BSSAP", "RANAP", "ISUP", "SIP", "BICC", "H248"],
    kpis: ["BCHI", "SRI", "BSC", "RNC", "SMS", "LU", "OCS", "GMSC", "SIP"],
    input_crireria: ["MSISDN", "IMSI", "SUBSCRIPTION-ID", "IMEI"],
    timeDurations: ["30 SEC", "1 MIN", "2 MIN", "3 MIN", "4 MIN", "5 MIN"],
    username: ""
}

function metaReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USER":
            return { ...state, username: action.username }
        default:
            return { ...state }
    }
}




export default metaReducer