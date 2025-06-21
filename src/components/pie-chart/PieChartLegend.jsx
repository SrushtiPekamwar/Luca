function PieChartLegend({ values }) {
    return (<table className="table-legend">
        <thead>
            <tr>
                <th>Color</th>
                <th>Title</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {values.map((item, index) => (
                <tr key={index}>
                    <td style={{ padding: "8px" }}>
                        <div
                            style={{
                                width: "16px",
                                height: "16px",
                                backgroundColor: item.color,
                                borderRadius: "4px",
                            }}
                        />
                    </td>
                    <td style={{
                        margin: "0",
                        padding: ".4rem 1rem",
                        border: "none",
                    }}>{item.label}</td>
                    <td style={{
                        margin: "0",
                        padding: ".4rem 1rem",
                        border: "none",
                    }}>{item.value}</td>
                </tr>
            ))}
        </tbody>
    </table>)
}

export default PieChartLegend;