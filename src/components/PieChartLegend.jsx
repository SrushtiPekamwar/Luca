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
                    <td>{item.label}</td>
                    <td>{item.value}</td>
                </tr>
            ))}
        </tbody>
    </table>)
}

export default PieChartLegend;