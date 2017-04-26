import React from 'react';

class GalleryModal extends React.Component {
    constructor(props) {
        super(props);
        this.preventClick= this.preventClick.bind(this);
    };

    render() {
        if (this.props.isOpen === false) {
            return null;
        }

        return (
            <div className='modal-overlay' onClick={this.props.onClick} name={this.props.name}>
                <div className='modal-body' onClick={this.preventClick}>
                    <div className='modal-body-head'>
                        <div className='description row'>
                            <div className="col-xs-6 col-xs-offset-3">
                                <div className='name'>LÖK</div>
                                <div className='provider'>Bosses Gård</div>
                            </div>
                            <div className="col-xs-1">
                                <a className='modal-close' href='#' onClick={this.props.onClick}>
                                    <span className='fa fa-times'></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <img src={this.props.src} />
                    <div className='modal-body-desc'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porta hendrerit dolor eu efficitur. Ut sed finibus urna. Vestibulum purus mi, congue sit amet eros quis, dignissim maximus est. Maecenas eu nisi vehicula, venenatis est sed, consectetur leo. Vivamus sed nunc pulvinar, pulvinar magna sit amet, laoreet leo. Quisque dictum tortor eget elit fermentum elementum.
                    </div>
                </div>
            </div>
        );
    };

    preventClick(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };
}

export default GalleryModal;
