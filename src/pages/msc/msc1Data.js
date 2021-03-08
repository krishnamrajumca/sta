import dataset from '../../data.json'
const mscData = dataset["MSC1"];

export default class MSC1Data {

    constructor(timeSlot, slots) {
        this.updateSlotData(timeSlot, slots);
    }
    updateSlotData(timeSlot, slots) {
        this.timeSlot = timeSlot;
        this.slots = slots;
        // var preSlot = moment(timeSlot,"HH:mm").add(5,'minutes').format("HH:mm")
        this.slotData = mscData.filter((d) => {
            return d["Interval"] === timeSlot
        });
        console.log("constructor", this.slots, this.slotData)
    }
    SuccRateF(key, currentSlotData) {
        const AUCSuccRate = currentSlotData.filter(sd => sd[key])

        if (AUCSuccRate.length > 0) {
            return Math.round(parseFloat(AUCSuccRate[0][key]) * 100) / 100
        }
        else {
            return 0
        }
    }
    LUSuccRateF() {

    }
    getData() {
        return {
            firstGraph: this.getFirstGraph(),
            secondGraph: this.getSecondGraph(),
            thirdGraph: this.getThirdGraph(),
            fourthGraph: this.getFourthGraph(),
            fifthGraph: this.getFiveGraph(),
            sixthGraph: this.getSixthGraph(),
            seventhGraph: this.getSeventhGraph(),
            eightGraph: this.getEightGraph()
        }
    }
    getFirstGraph() {
        var obj = {
            "Acc_Succ_Rate": { value: this.SuccRateF("AUC-Succ_Rate", this.slotData), name: "Auc Success Rate" },
            "LU_Succ_Rate": { value: this.SuccRateF("LU_Succ_Rate", this.slotData), name: "LU Success Rate" },
            "SRI_Succ_Rate": { value: this.SuccRateF("SRI_Succ_Rate", this.slotData), name: "SRI Success Rate" },
            "Camel_Succ_Rate": { value: this.SuccRateF("Camel_Succ_Rate", this.slotData), name: "Camel Success Rate" },
            slots: this.slots
        };
        let accArr = [], luArr = [], sriArr = [], camelArr = [];
        var d = this.slots.map(s => {
            let currentSlot = mscData.filter((d) => {
                return d["Interval"] === s
            });

            accArr.push(this.SuccRateF("AUC-Succ_Rate", currentSlot));
            luArr.push(this.SuccRateF("LU_Succ_Rate", currentSlot));
            sriArr.push(this.SuccRateF("SRI_Succ_Rate", currentSlot));
            camelArr.push(this.SuccRateF("Camel_Succ_Rate", currentSlot))

        })
        obj["graphData"] = [
            { name: "Acc Success Rate", data: accArr },
            { name: "LU Success Rate", data: luArr },
            { name: "SRI Success Rate", data: sriArr },
            { name: "Camel Success Rate", data: camelArr },
        ]
        return obj

    }
    getSecondGraph() {
        var obj = {
            "Assign_Succ_rate": { value: this.SuccRateF("Assign-Succ-rate", this.slotData), name: "Assign Success Rate" },
            "Rab_Succ_Rate": { value: this.SuccRateF("Rab-Succ_Rate", this.slotData), name: "Rab Success Rate" },
        }
        let accArr = [], luArr = [];
        var d = this.slots.map(s => {
            let currentSlot = mscData.filter((d) => {
                return d["Interval"] === s
            });

            accArr.push(this.SuccRateF("Assign-Succ-rate", currentSlot));
            luArr.push(this.SuccRateF("Rab-Succ_Rate", currentSlot));

        })
        obj["graphData"] = [
            { name: "Assign Success Rate", data: accArr },
            { name: "Rab Success Rate", data: luArr },
        ]
        return obj
    }
    getThirdGraph() {

        var obj = {
            "Assign_Succ_rate": { value: this.SuccRateF("Ho-Success-rate", this.slotData), name: "Ho Success Rate 2G" },
            "Rab_Succ_Rate": { value: this.SuccRateF("Ho-Success-rate", this.slotData), name: "Ho Success Rate 3G" },
        }
        let accArr = [], luArr = [];
        var d = this.slots.map(s => {
            let currentSlot = mscData.filter((d) => {
                return d["Interval"] === s
            });

            accArr.push(this.SuccRateF("Ho-Success-rate", currentSlot));
            luArr.push(this.SuccRateF("Ho-Success-rate", currentSlot));

        })
        obj["graphData"] = [
            { name: "Ho Success Rate 2G", data: accArr },
            { name: "Ho Success Rate 3G", data: luArr },
        ]
        return obj
    }
    getFourthGraph() {
        var obj = {
            "Paging_SUCC_Rate": { value: this.SuccRateF("Paging Succ_rate", this.slotData), name: "Paging Success Rate 2G" },
        }

        obj["graphData"] = {
            data: [this.SuccRateF("Paging_req", this.slotData), this.SuccRateF("Paging_res", this.slotData)],
            labels: ["Paging Requests", "Paging Response"]
        }
        return obj;
    }
    getFiveGraph() {
        var obj = {
            "Paging_SUCC_Rate": { value: this.SuccRateF("Paging Succ_rate", this.slotData), name: "Paging Success Rate 2G" },
        }


        obj["graphData"] = {
            data: [this.SuccRateF("Paging_req", this.slotData), this.SuccRateF("Paging_res", this.slotData)],
            labels: ["Paging Requests", "Paging Response"]
        }
        return obj;
    }
    getSixthGraph() {
        var ISUP_Succ_Rate = this.SuccRateF("ISUP_Succ_Rate", this.slotData);
        var req = this.SuccRateF("ISUP_Call_Req", this.slotData);
        var ISUP_Succ_Rate_CCR = 0;
        var ISUP_Call_Failed = this.SuccRateF("ISUP_Call-Failed", this.slotData)
        if (req !== 0) {
            ISUP_Succ_Rate_CCR = ((this.SuccRateF("ISUP-Call_ANS", this.slotData) + ISUP_Call_Failed) / req) * 100;
        }

        let accArr = [], luArr = [];
        var d = this.slots.map(s => {
            let currentSlot = mscData.filter((d) => {
                return d["Interval"] === s
            });
            var ISUP_Succ_Rate = this.SuccRateF("ISUP_Succ_Rate", currentSlot);

            var req = this.SuccRateF("ISUP_Call_Req", currentSlot);
            var ISUP_Succ_Rate_CCR = 0;
            if (req !== 0) {
                ISUP_Succ_Rate_CCR = ((this.SuccRateF("ISUP-Call_ANS", currentSlot) + this.SuccRateF("ISUP_Call-Failed", currentSlot)) / req) * 100;
            }
            accArr.push(ISUP_Succ_Rate);
            luArr.push(ISUP_Succ_Rate_CCR);
        })

        var obj = {
            ISUP_Succ_Rate: { name: "ISUP Success Rate", value: ISUP_Succ_Rate },
            ISUP_Succ_Rate_CCR: { name: "ISUP Success Rate CCR", value: ISUP_Succ_Rate_CCR },

            pieData: {
                data: [ISUP_Succ_Rate_CCR, ISUP_Call_Failed],
                labels: ["ISUP_Succ_Rate_CCR", "ISUP_Call_Failed"],
            },
            graphData: [
                { name: "ISUP Success Rate", data: accArr },
                { name: "ISUP Success Rate CCR", data: luArr }
            ]
        }

        return obj
    }
    getSeventhGraph() {
        var ISUP_Succ_Rate = this.SuccRateF("SIP_Succ_Rate", this.slotData);
        var req = this.SuccRateF("SIP_Call_Req", this.slotData);
        var ISUP_Succ_Rate_CCR = 0;
        var ISUP_Call_Failed = this.SuccRateF("SIP_Call-Failed", this.slotData)
        if (req !== 0) {
            ISUP_Succ_Rate_CCR = ((this.SuccRateF("SIP-Call_ANS", this.slotData) + ISUP_Call_Failed) / req) * 100;
        }

        let accArr = [], luArr = [];
        var d = this.slots.map(s => {
            let currentSlot = mscData.filter((d) => {
                return d["Interval"] === s
            });
            var ISUP_Succ_Rate = this.SuccRateF("SIP_Succ_Rate", currentSlot);

            var req = this.SuccRateF("SIP_Call_Req", currentSlot);
            var ISUP_Succ_Rate_CCR = 0;
            if (req !== 0) {
                ISUP_Succ_Rate_CCR = ((this.SuccRateF("SIP-Call_ANS", currentSlot) + this.SuccRateF("SIP_Call-Failed", currentSlot)) / req) * 100;
            }
            accArr.push(ISUP_Succ_Rate);
            luArr.push(ISUP_Succ_Rate_CCR);
        })

        var obj = {
            SIP_Succ_Rate: { name: "SIP Success Rate", value: ISUP_Succ_Rate },
            SIP_Succ_Rate_CCR: { name: "SIP Success Rate CCR", value: ISUP_Succ_Rate_CCR },

            pieData: {
                data: [ISUP_Succ_Rate_CCR, ISUP_Call_Failed],
                labels: ["SIP_Succ_Rate_CCR", "SIP_Call_Failed"],
            },
            graphData: [
                { name: "SIP Success Rate", data: accArr },
                { name: "SIP Success Rate CCR", data: luArr }
            ]
        }

        return obj
    }
    getEightGraph() {
        var ISUP_Succ_Rate = this.SuccRateF("BICC_Succ_Rate", this.slotData);
        var req = this.SuccRateF("BICC_Call_Req", this.slotData);
        var ISUP_Succ_Rate_CCR = 0;
        var ISUP_Call_Failed = this.SuccRateF("BICC_Call-Failed", this.slotData)
        if (req !== 0) {
            ISUP_Succ_Rate_CCR = ((this.SuccRateF("BICC-Call_ANS", this.slotData) + ISUP_Call_Failed) / req) * 100;
        }

        let accArr = [], luArr = [];
        var d = this.slots.map(s => {
            let currentSlot = mscData.filter((d) => {
                return d["Interval"] === s
            });
            var ISUP_Succ_Rate = this.SuccRateF("BICC_Succ_Rate", currentSlot);

            var req = this.SuccRateF("BICC_Call_Req", currentSlot);
            var ISUP_Succ_Rate_CCR = 0;
            if (req !== 0) {
                ISUP_Succ_Rate_CCR = ((this.SuccRateF("BICC-Call_ANS", currentSlot) + this.SuccRateF("BICC_Call-Failed", currentSlot)) / req) * 100;
            }
            accArr.push(ISUP_Succ_Rate);
            luArr.push(ISUP_Succ_Rate_CCR);
        })

        var obj = {
            BICC_Succ_Rate: { name: "BICC Success Rate", value: ISUP_Succ_Rate },
            BICC_Succ_Rate_CCR: { name: "BICC Success Rate CCR", value: ISUP_Succ_Rate_CCR },

            pieData: {
                data: [ISUP_Succ_Rate_CCR, ISUP_Call_Failed],
                labels: ["BICC_Succ_Rate_CCR", "BICC_Call_Failed"],
            },
            graphData: [
                { name: "BICC Success Rate", data: accArr },
                { name: "BICC Success Rate CCR", data: luArr }
            ]
        }

        return obj
    }
}
