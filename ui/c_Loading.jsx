/**
 * Created by sqsun on 2015/9/22.
 */
define(['react', 'react.backbone', 'jsx!cOverlay'], function(React, rbackbone, Overlay) {
    var LoadingComponent = React.createBackboneClass({
        render: function() {
            return (
            <Overlay className="cui-view cui-mask cui-opacitymask">
                <div className="view cui-layer">
                    <div className="cp-h5-main cp-h5-lizard">
                        <div className="loading-box2">
                            <div className="loading-layer2">
                                <div className="loading-layer2-before"></div>
                                <p>{this.props.text}</p>
                                <div>
                                    <div className="loading-cycle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Overlay>
            )
        }
    });
    return LoadingComponent;
})