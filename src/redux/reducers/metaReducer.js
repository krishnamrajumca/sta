const initialState = {
    networks: ["MSC1", "MSC2", "GMSC"],
    protocals: ["MAP", "CAMEL", "BSSAP", "RANAP", "ISUP", "SIP", "BICC", "H248"],
    kpis: ["BCHI", "SRI", "BSC", "RNC", "SMS", "LU", "OCS", "GMSC", "SIP"],
    kpisList: [
        { id: "BCHI", key: "BICC_Succ_Rate" },
        { id: "SRI", key: "SRI_Succ_Rate" },
        { id: "BSC", key: "BSC" },
        { id: "RNC", key: "RNC" },
        { id: "SMS", key: "SMS-Mo_Succ-Rate" },
        { id: "LU", key: "LU_Succ_Rate" },
        { id: "OCS", key: "OCS" },
        { id: "GMSC", key: "GMSC" },
        { id: "SIP", key: "SIP_Succ_Rate" }
    ],
    input_crireria: ["MSISDN", "IMSI", "SUBSCRIPTION-ID", "IMEI"],
    timeDurations: ["30 SEC", "1 MIN", "2 MIN", "3 MIN", "4 MIN", "5 MIN"],
    username: "",
    msc1: {
        first: ["AUC-Succ_Rate", "LU_Succ_Rate", "SRI_Succ_Rate", "Camel_Succ_Rate"],
        second: ["Assign-Succ-rate", "Rab-Succ_Rate"],
        third: ["Ho-Success-rate", "Ho-Success-rate"],
        fourth: ["Paging Succ_rate"],
        five: ["Paging Succ_rate"],
        six: ["ISUP_Succ_Rate", "ISUP_Succ_Rate"],
        seven: ["SIP_Succ_Rate", "SIP_Succ_Rate"],
        eight: ["BICC_Succ_Rate", "BICC_Succ_Rate"],

    }
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