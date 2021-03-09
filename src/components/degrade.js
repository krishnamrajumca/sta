import dataset from '../data.json'

export default class ColorChange {

    constructor() {
        // super();
        if (!ColorChange._instance) {
            ColorChange._instance = this;
        }
        return ColorChange._instance;
    }
    static getInstance() {
        // if (!ColorChange._instance) {
        //     ColorChange._instance = ColorChange;
        // }
        // return ColorChange._instance;
        return this._instance;
    }
    updateSlotData(timeSlot) {
        this.timeSlot = timeSlot;

        const msc1 = dataset["MSC1"];
        const msc2 = dataset["MSC2"];
        const gmsc = dataset["GMSC"];
        // console.log(dataset, msc1, msc2, gmsc)
        this.notIncludeFields = ["Start Time", "End Time", "Interval", "Node Name", "Access_Type", "Protocol"]
        this.msc1Data = msc1.filter((d) => {
            return d["Interval"] === timeSlot
        })

        this.msc2Data = msc2.filter((d) => {
            return d["Interval"] === timeSlot
        })

        this.gmscData = gmsc.filter((d) => {
            return d["Interval"] === timeSlot
        })
    }
    getData(protocal, thresholds) {
        let degradeFileds = [];
        // console.log(this.msc1Data)
        let data = [];
        if (protocal == "MSC1") {
            data = this.msc1Data
        }
        else if (protocal == "MSC2") {
            data = this.msc1Data
        }
        else if (protocal == "GMSC") {
            data = this.msc1Data
        }
        let have_red = false;
        let have_orange = false;
        data.map(row => {
            // console.log(row);

            for (var field in row) {
                if (this.notIncludeFields.indexOf(field) == -1) {
                    if (field.indexOf("Rate") !== -1 || field.indexOf("rate") !== -1 || field.indexOf("%") !== -1) {

                        const value = Math.round(row[field] * 100) / 100;
                        const threshold = thresholds[field];
                        if (threshold) {
                            if (value >= threshold[0] && value <= thresholds[1]) {
                                degradeFileds.push({ protocal: row["Protocol"], field: field, value: value, color: 'orange' })
                                have_orange = true
                            }
                            else if (value < threshold[0]) {
                                degradeFileds.push({ protocal: row["Protocol"], field: field, value: value, color: 'red' })
                                have_red = true;
                            }
                        }

                    }

                }
            }
        })
        var obj = {
            degradeFileds
        }
        if (have_red) {
            obj["color"] = "red"
        }
        else if (have_orange) {
            obj["color"] = "orange"
        }
        else {
            obj["color"] = "white"
        }
        return obj
    }

}
