import dataset from '../data.json'

export default class ColorChange {

    constructor() {
        // this.updateSlotData(timeSlot);
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
    getData(protocal) {
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
        data.map(row => {
            // console.log(row);
            for (var field in row) {
                if (this.notIncludeFields.indexOf(field) == -1) {
                    if (field.indexOf("Rate") !== -1) {
                        const value = Math.round(row[field] * 100) / 100;
                        if (value < 95) {
                            degradeFileds.push({ protocal: row["Protocol"], field: field, value: value })
                        }
                    }

                }
            }
        })
        return degradeFileds
    }

}
