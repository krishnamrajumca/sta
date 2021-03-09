import dataset from '../data.json'

export default class ColorChange {

    constructor(timeSlot) {
        this.updateSlotData(timeSlot);
    }
    updateSlotData(timeSlot) {
        this.timeSlot = timeSlot;
        const msc1 = dataset["MSC1"];
        const msc2 = dataset["MSC2"];
        const gmsc = dataset["GMSC"];
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
    getMSC1Data() {
        let degradeFileds = [];
        console.log(this.msc1Data)
        this.msc1Data.map(row => {
            console.log(row);
            for (var field in row) {
                if (this.notIncludeFields.indexOf(field) == -1) {
                    const value = Math.round(row[field] * 100) / 100;
                    if (value < 95) {
                        degradeFileds.push({ protocal: row["Protocol"], field: field, value: value })
                    }
                }
            }
        })
        console.log(degradeFileds)
    }
}
