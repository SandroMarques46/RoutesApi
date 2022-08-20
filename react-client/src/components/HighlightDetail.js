export default function HighlightDetail(props) {
    const highlight = props.highlight

    return (
        <div>
            <h3>{highlight.name}</h3>
            <li>{highlight.description}</li>
            <li>{highlight.rating} ✰</li>
            <li>Latitude - {highlight.latitude}</li>
            <li>Longitude - {highlight.longitude}</li>
        </div>
    )
}