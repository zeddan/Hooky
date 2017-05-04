import React from 'react';
import Gallery from './Gallery.jsx';
import "../../../css/inspiration.scss";


class Inspiration extends React.Component {
    render() {
        return (
            <section className="gallery-container">
                <Gallery />
            </section>
        );
    };
}

export default Inspiration;
