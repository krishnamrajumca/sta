import { SplitButton } from 'primereact/splitbutton';
const DownloadBtn = ({ onClick }) => {

    const items = [
        {
            label: 'CSV',
            command: (e) => {
                onClick('csv')
            }
        },
        {
            label: 'Excel',
            disabled: true,
            command: (e) => {
                onClick('excel')
            }
        }
    ]



    return (
        <SplitButton label="Download" model={items}></SplitButton>
    )
}

export default DownloadBtn